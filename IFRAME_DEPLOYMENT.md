# 🚀 Iframe Deployment Guide for Nafis AI Agent

Complete guide to deploy your AI agent for iframe embedding in React applications.

## 📋 Quick Checklist

- ✅ FastAPI app configured with iframe headers
- ✅ React component ready (`NafisAIWidget.jsx`)
- ✅ Test file created (`iframe-test.html`)
- ⏳ Deploy to production
- ⏳ Update React app with production URL

## 🌐 Deployment Options

### Option 1: Railway (Recommended)
**Free tier: 500 hours/month**

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
railway init

# 4. Set environment variable
railway env set GROQ_API_KEY=your_groq_api_key_here

# 5. Deploy
railway up
```

**Your agent will be available at:** `https://your-app-name.railway.app`

### Option 2: Render
**Free tier: 750 hours/month**

1. **Connect GitHub:**
   - Push your code to GitHub
   - Connect repo to Render
   
2. **Environment Variables:**
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `python main.py`

### Option 3: Fly.io
**Free tier: 3 shared VMs**

```bash
# 1. Install flyctl
curl -L https://fly.io/install.sh | sh

# 2. Login
fly auth login

# 3. Launch app
fly launch

# 4. Set secrets
fly secrets set GROQ_API_KEY=your_groq_api_key_here

# 5. Deploy
fly deploy
```

## ⚛️ React Integration Steps

### 1. Copy React Component
```bash
# Copy to your React project
cp react-examples/NafisAIWidget.jsx /path/to/your/react/src/components/
```

### 2. Install in Your App
```jsx
// App.js or any component
import NafisAIWidget from './components/NafisAIWidget';

function App() {
  return (
    <div className="App">
      <h1>My Portfolio</h1>
      
      {/* Floating widget */}
      <NafisAIWidget 
        agentUrl="https://your-app-name.railway.app/iframe"
        position="bottom-right"
      />
      
      {/* Or inline in a section */}
      <section id="about-me">
        <h2>Ask Me Anything</h2>
        <NafisAIWidget 
          agentUrl="https://your-app-name.railway.app/iframe"
          position="inline"
          showToggle={false}
          width="100%"
          height="500px"
        />
      </section>
    </div>
  );
}
```

## 🔧 Configuration Options

### Widget Positions
```jsx
// Floating bottom-right (default)
<NafisAIWidget position="bottom-right" />

// Floating bottom-left
<NafisAIWidget position="bottom-left" />

// Modal/center screen
<NafisAIWidget position="fixed" />

// Inline with content
<NafisAIWidget position="inline" showToggle={false} />
```

### Responsive Sizing
```jsx
// Mobile-friendly
<NafisAIWidget 
  width={window.innerWidth <= 768 ? "300px" : "400px"}
  height={window.innerWidth <= 768 ? "450px" : "600px"}
/>

// Full responsive
<NafisAIWidget 
  width="100%"
  height="500px"
  position="inline"
/>
```

## 🎨 Styling Examples

### Custom Theme
```jsx
<NafisAIWidget 
  agentUrl="https://your-agent.com/iframe"
  customStyles={{
    borderRadius: '20px',
    border: '2px solid #667eea',
    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.2)'
  }}
/>
```

### Portfolio Integration
```jsx
// In your portfolio's "About" section
<section className="about-section">
  <div className="about-content">
    <h2>About Me</h2>
    <p>Software Engineer with expertise in AI solutions...</p>
  </div>
  
  <div className="interactive-resume">
    <h3>Interactive Resume</h3>
    <p>Ask my AI assistant about my experience!</p>
    
    <NafisAIWidget 
      agentUrl="https://nafis-ai.railway.app/iframe"
      position="inline"
      showToggle={false}
      width="100%"
      height="500px"
      title="Ask About My Experience"
    />
  </div>
</section>
```

## 🔐 Production Security

### Update FastAPI for Production
```python
# In main.py - restrict iframe origins for production
@app.middleware("http")
async def add_iframe_headers(request, call_next):
    response = await call_next(request)
    
    # Production: specify your exact domains
    allowed_origins = [
        "https://yourdomain.com",
        "https://www.yourdomain.com",
        "https://your-portfolio.vercel.app"
    ]
    
    origin = request.headers.get("origin")
    if origin in allowed_origins:
        response.headers["X-Frame-Options"] = f"ALLOW-FROM {origin}"
        response.headers["Content-Security-Policy"] = f"frame-ancestors {origin}"
    else:
        response.headers["X-Frame-Options"] = "DENY"
    
    return response
```

### Environment Variables
```bash
# .env file
GROQ_API_KEY=your_actual_groq_api_key
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
ENVIRONMENT=production
```

## 📱 Testing Your Integration

### 1. Local Testing
```bash
# Start your AI agent
python3 main.py

# Open test file
open iframe-test.html
# Or visit: http://localhost:8000 directly in iframe
```

### 2. Production Testing
```jsx
// Test component with production URL
<NafisAIWidget 
  agentUrl="https://your-deployed-agent.com/iframe"
  debug={true}  // Enable console logging
/>
```

### 3. Mobile Testing
Test on different devices and screen sizes:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Desktop (Chrome, Firefox, Safari)

## 🚨 Troubleshooting

### Common Issues:

1. **"X-Frame-Options denies embedding"**
   ```python
   # Fix: Update iframe headers in main.py
   response.headers["X-Frame-Options"] = "ALLOWALL"  # For development
   ```

2. **CORS errors**
   ```python
   # Fix: Check CORS middleware allows your domain
   allow_origins=["*"]  # Development
   allow_origins=["https://yourdomain.com"]  # Production
   ```

3. **Iframe not loading**
   - Check if agent URL is accessible
   - Verify HTTPS (required for production)
   - Check browser console for errors

4. **API errors**
   - Verify Groq API key is set correctly
   - Check `/health` endpoint: `https://your-agent.com/health`

### Debug Mode
```jsx
<NafisAIWidget 
  agentUrl="https://your-agent.com/iframe"
  onLoad={() => console.log('Widget loaded')}
  onError={(error) => console.error('Widget error:', error)}
/>
```

## 🎯 Use Cases

### 1. Portfolio Website
```jsx
// Hero section with floating widget
<section className="hero">
  <h1>Nafis Ahmed Khan</h1>
  <p>Software Engineer & AI Specialist</p>
  
  <NafisAIWidget 
    agentUrl="https://nafis-ai.railway.app/iframe"
    position="bottom-right"
    title="Ask About My Skills"
  />
</section>
```

### 2. Job Application
```jsx
// Interactive resume section
<section className="interactive-resume">
  <h2>Interactive Resume</h2>
  <p>Ask specific questions about my qualifications:</p>
  
  <NafisAIWidget 
    agentUrl="https://nafis-ai.railway.app/iframe"
    position="inline"
    showToggle={false}
    height="600px"
    title="Ask About My Qualifications"
  />
</section>
```

### 3. Client Demo
```jsx
// AI capabilities demonstration
<section className="ai-demo">
  <h2>AI Solutions I Build</h2>
  <p>Experience the type of conversational AI I create:</p>
  
  <NafisAIWidget 
    agentUrl="https://nafis-ai.railway.app/iframe"
    position="inline"
    showToggle={false}
    title="AI Agent Demo"
  />
</section>
```

## ✅ Final Checklist

Before going live:

- [ ] AI agent deployed and accessible
- [ ] GROQ_API_KEY set in production
- [ ] iframe headers configured for your domain
- [ ] React component tested in your app
- [ ] Mobile responsiveness verified
- [ ] HTTPS enabled (required for production iframes)
- [ ] Error handling implemented
- [ ] Loading states working

## 🎉 You're Ready!

Your AI agent is now ready to be embedded as an iframe in any React application! This creates a powerful, interactive way for visitors to learn about your professional background.

**Perfect for:**
- Portfolio websites
- Job applications
- Client demonstrations
- Networking presentations
- Personal branding

Deploy and start showcasing your AI expertise! 🚀
