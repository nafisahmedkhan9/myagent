# 🤖 AI Agent Setup Instructions

## Quick Start Guide

### 1. **Resume Content Already Loaded!**

✅ Your actual resume content has been loaded into the AI agent from `MyResumeLatestV11.txt`

The AI agent now knows about:
- Your work experience at Gupshup Technologies, Artdex, and Cognoscis
- Your skills in AI, chatbots, full-stack development
- Your impressive project portfolio including Smart Receipt Processor
- Your enterprise clients like National Consumer Helpline, Kotak, Swiggy, etc.

### 2. **Get Your Free Groq API Key**

1. Visit: https://console.groq.com/
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `gsk_...`)

### 3. **Configure the Agent**

Create/update the `.env` file:
```bash
echo "GROQ_API_KEY=your_actual_api_key_here" > .env
```

### 4. **Install Dependencies**

```bash
pip install -r requirements.txt
```

### 5. **Start the AI Agent**

```bash
python3 main.py
```

### 6. **Test Your Agent**

Visit: http://localhost:8000

Try asking:
- "What are Nafis's technical skills?"
- "Tell me about his work experience at Gupshup?"
- "What's the Smart Receipt Processor project?"
- "Which major clients has he worked with?"
- "What's his educational background?"

## Resume Updates

### Method 1: Edit Text File (Recommended)
1. Update `MyResumeLatestV11.txt` with new content
2. Update the `RESUME_CONTENT` in `config.py` 
3. Restart the AI agent

### Method 2: Update via API
If the agent is running, you can update the resume via API:

```bash
curl -X POST "http://localhost:8000/update-resume" \
  -H "Content-Type: application/json" \
  -d '{"resume_content": "YOUR_UPDATED_RESUME_CONTENT"}'
```

### Method 3: Direct File Edit
Edit `config.py` and replace the `RESUME_CONTENT` variable with your updated resume.

## Deployment Options (Free)

### 🥇 Railway (Recommended)
```bash
# 1. Push code to GitHub
git add .
git commit -m "AI Agent ready"
git push origin main

# 2. Deploy on Railway
# - Visit: https://railway.app/
# - Connect GitHub repo
# - Add environment variable: GROQ_API_KEY
# - Deploy automatically
```

### 🥈 Render
```bash
# 1. Visit: https://render.com/
# 2. Create new Web Service
# 3. Connect GitHub repo
# 4. Build Command: pip install -r requirements.txt
# 5. Start Command: python main.py
# 6. Add environment variable: GROQ_API_KEY
```

### 🥉 Fly.io
```bash
# 1. Install Fly CLI
# 2. Run: fly launch
# 3. Set secrets: fly secrets set GROQ_API_KEY=your_key
# 4. Deploy: fly deploy
```

## Troubleshooting

### Common Issues:

1. **"Command 'python' not found"**
   - Use `python3` instead of `python`

2. **"GROQ_API_KEY not found"**
   - Make sure `.env` file exists with your API key
   - Restart the application after updating .env

3. **"Could not connect to AI agent"**
   - Make sure the agent is running: `python3 main.py`
   - Check if port 8000 is available

4. **Website scraping failed**
   - Your website uses JavaScript, so copy content manually
   - Use browser developer tools to extract text

5. **Empty responses from AI**
   - Check if your API key is valid
   - Ensure resume content is properly loaded

### Getting Help:

1. Check the logs when running `python3 main.py`
2. Visit `/health` endpoint to check API status
3. Use the `/api` endpoint to see available endpoints

## Features

✅ **Resume-based AI Agent**: Only answers questions about you  
✅ **Beautiful Web Interface**: Modern, responsive design  
✅ **Scope Validation**: Politely declines off-topic questions  
✅ **Free Cloud AI**: Uses Groq's free Llama model  
✅ **Easy Deployment**: Multiple free hosting options  
✅ **API Endpoints**: Update resume content dynamically  

## Example Interactions

**Good Questions:**
- "What programming languages does Nafis know?"
- "Tell me about his work experience"
- "What projects has he built?"
- "What is his educational background?"

**Off-topic Questions (Will be declined):**
- "What's the weather today?"
- "How do I cook pasta?"
- "Tell me about cats"

The AI will respond: *"I'm sorry, I only have information about Nafis Ahmed Khan's professional background. Please ask questions related to his experience, skills, or qualifications."*

## Customization

- **Change AI Model**: Edit `MODEL_NAME` in `config.py`
- **Modify Responses**: Update `SYSTEM_PROMPT` in `config.py` 
- **UI Changes**: Edit `static/index.html`
- **Add Features**: Extend `main.py`

Your AI agent is now ready! 🎉
