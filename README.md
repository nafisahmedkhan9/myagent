# Nafis Ahmed Khan - AI Agent

An AI-powered assistant that answers questions about Nafis Ahmed Khan based on his resume. Built with FastAPI and uses Groq's cloud-based Llama model.

## Features

- 🤖 AI agent powered by Llama 3 model via Groq
- 📄 Resume-based knowledge system
- 🚀 FastAPI backend with modern web interface
- 🔒 Scope validation (only answers questions about Nafis)
- 🌐 Beautiful responsive web UI
- 🆓 Uses free cloud-based AI (no local setup required)

## Quick Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Get Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Generate an API key
4. Create a `.env` file in the project root:

```bash
echo "GROQ_API_KEY=your_actual_api_key_here" > .env
```

### 3. Resume Content Ready!

✅ **Your actual resume content is already loaded!** The AI agent has been configured with Nafis Ahmed Khan's real resume from `MyResumeLatestV11.txt`.

### 4. Run the Application

```bash
python3 main.py
```

Visit `http://localhost:8000` to use the web interface or `http://localhost:8000/api` for API documentation.

## API Endpoints

- `GET /` - Web interface
- `POST /chat` - Send messages to the AI agent
- `POST /update-resume` - Update resume content
- `GET /health` - Health check

## Free Hosting Options

### Option 1: Railway (Recommended)
- Free tier: 512MB RAM, 1GB disk
- Steps in deployment guide below

### Option 2: Render
- Free tier: 512MB RAM, automatic deploys
- Steps in deployment guide below

### Option 3: Fly.io
- Free tier: 256MB RAM
- Good for lightweight apps

### Option 4: Heroku (Alternative)
- Free tier discontinued, but still available for testing

## Deployment Steps

See the deployment guides in the `deployment/` folder for detailed instructions for each platform.

## Usage Examples

### Chat with the AI Agent

```python
import requests

response = requests.post("http://localhost:8000/chat", 
    json={"message": "What are Nafis's technical skills?"})
print(response.json()["response"])
```

### Update Resume Content

```python
import requests

new_resume = """
Nafis Ahmed Khan
Software Engineer with 5 years of experience...
"""

response = requests.post("http://localhost:8000/update-resume", 
    json={"resume_content": new_resume})
print(response.json()["message"])
```

## Customization

- **Change AI Model**: Modify `MODEL_NAME` in `config.py`
- **Adjust Responses**: Update `SYSTEM_PROMPT` in `config.py`
- **Styling**: Modify `static/index.html` CSS
- **Add Features**: Extend the FastAPI app in `main.py`

## Troubleshooting

1. **API Key Issues**: Ensure `GROQ_API_KEY` is set correctly
2. **CORS Errors**: Check if running on different ports
3. **Model Errors**: Verify Groq API key has sufficient credits

## License

MIT License - feel free to customize for your own use!
