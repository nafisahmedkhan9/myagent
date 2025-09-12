from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from groq import Groq
import config
import logging

# Import for iframe security headers
from fastapi import Response

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Nafis Ahmed Khan AI Agent",
    description="An AI agent that answers questions about Nafis Ahmed Khan based on his resume",
    version="1.0.0"
)

# Add CORS middleware for web frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware to add iframe security headers
@app.middleware("http")
async def add_iframe_headers(request, call_next):
    response = await call_next(request)
    
    # Allow iframe embedding from any origin
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Content-Security-Policy"] = "frame-ancestors 'self' *"
    
    # Additional headers for iframe compatibility
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    
    # Ensure proper CORS for iframe requests
    if request.method == "OPTIONS":
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "*"
    
    return response

# Initialize Groq client
if not config.GROQ_API_KEY:
    logger.error("GROQ_API_KEY not found in environment variables")
    groq_client = None
else:
    groq_client = Groq(api_key=config.GROQ_API_KEY)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

class ChatRequest(BaseModel):
    message: str
    
class ChatResponse(BaseModel):
    response: str
    
class ResumeUpdateRequest(BaseModel):
    resume_content: str

@app.get("/")
async def root():
    return FileResponse('static/index.html')

@app.get("/iframe")
async def iframe_version():
    """Iframe-optimized version of the chat interface"""
    return FileResponse('static/index.html')

@app.get("/demo")
async def widget_demo():
    """Demo page showing clean iframe integration"""
    return FileResponse('static/iframe-demo.html')

@app.get("/api")
async def api_info():
    return {
        "message": "Welcome to Nafis Ahmed Khan's AI Agent API",
        "description": "Ask me anything about Nafis's professional background, skills, and experience!",
        "endpoints": {
            "/chat": "POST - Send a message to chat with the AI agent",
            "/update-resume": "POST - Update the resume content",
            "/health": "GET - Check API health"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "groq_configured": groq_client is not None
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not groq_client:
        raise HTTPException(
            status_code=500, 
            detail="API not properly configured. Please set GROQ_API_KEY environment variable."
        )
    
    try:
        # Prepare the system prompt with resume content
        system_prompt = config.SYSTEM_PROMPT.format(resume_content=config.RESUME_CONTENT)
        
        # Make API call to Groq
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": request.message
                }
            ],
            model=config.MODEL_NAME,
            temperature=0.7,
            max_tokens=1000,
        )
        
        response_text = chat_completion.choices[0].message.content
        
        return ChatResponse(response=response_text)
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.post("/update-resume")
async def update_resume(request: ResumeUpdateRequest):
    """Update the resume content for the AI agent"""
    try:
        # Update the resume content in config
        config.RESUME_CONTENT = request.resume_content
        
        return {
            "message": "Resume content updated successfully",
            "preview": request.resume_content[:200] + "..." if len(request.resume_content) > 200 else request.resume_content
        }
    except Exception as e:
        logger.error(f"Error updating resume: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error updating resume: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
