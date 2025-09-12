# 🤖 Nafis AI Widget - React Integration Guide

This guide shows you how to embed Nafis's AI agent as an iframe widget in your React application.

## 📁 Files Included

- `NafisAIWidget.jsx` - Main React component
- `ExampleUsage.jsx` - Usage examples
- `iframe-styles.css` - Optional custom styles

## 🚀 Quick Setup

### 1. Copy the Component
```bash
# Copy NafisAIWidget.jsx to your React project
cp NafisAIWidget.jsx /path/to/your/react/src/components/
```

### 2. Basic Usage
```jsx
import NafisAIWidget from './components/NafisAIWidget';

function App() {
  return (
    <div className="App">
      <h1>My Portfolio</h1>
      
      {/* Add Nafis AI Widget */}
      <NafisAIWidget 
        agentUrl="https://your-deployed-agent.com/iframe"
      />
    </div>
  );
}
```

## 🎨 Widget Modes

### 1. **Floating Chat Widget** (Default)
Perfect for portfolio sites and landing pages.
```jsx
<NafisAIWidget 
  agentUrl="https://your-agent.com/iframe"
  position="bottom-right"
  showToggle={true}
/>
```

### 2. **Inline Embed**
Great for dedicated "About Me" or "Ask Me" sections.
```jsx
<NafisAIWidget 
  agentUrl="https://your-agent.com/iframe"
  position="inline"
  showToggle={false}
  width="100%"
  height="600px"
/>
```

### 3. **Modal Style**
Full-screen experience for detailed conversations.
```jsx
<NafisAIWidget 
  agentUrl="https://your-agent.com/iframe"
  position="fixed"
  width="800px"
  height="700px"
/>
```

## ⚙️ Props Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `agentUrl` | string | `"http://localhost:8000/iframe"` | URL of your deployed AI agent |
| `width` | string | `"100%"` | Widget width |
| `height` | string | `"600px"` | Widget height |
| `showToggle` | boolean | `true` | Show/hide toggle button |
| `position` | string | `"bottom-right"` | Widget position |
| `title` | string | `"Chat with Nafis's AI Assistant"` | Widget header title |

### Position Options:
- `"bottom-right"` - Fixed bottom-right corner
- `"bottom-left"` - Fixed bottom-left corner  
- `"fixed"` - Center of screen (modal style)
- `"inline"` - Inline with page content

## 🌐 Deployment Steps

### Step 1: Deploy Your AI Agent
Choose one of these free platforms:

#### Option A: Railway
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login and deploy
railway login
railway init
railway up
```

#### Option B: Render
```bash
# 1. Connect your GitHub repo to Render
# 2. Set environment variables in Render dashboard:
#    GROQ_API_KEY=your_groq_api_key
# 3. Deploy automatically
```

#### Option C: Fly.io
```bash
# 1. Install flyctl
# 2. Launch app
fly launch
fly deploy
```

### Step 2: Update React Component
```jsx
// Replace localhost with your deployed URL
<NafisAIWidget 
  agentUrl="https://your-app-name.railway.app/iframe"
/>
```

## 🔧 Advanced Customization

### Custom Styling
```jsx
const customStyles = {
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  border: '2px solid #4f46e5',
};

<NafisAIWidget 
  agentUrl="https://your-agent.com/iframe"
  customStyles={customStyles}
/>
```

### Integration with React Router
```jsx
import { useLocation } from 'react-router-dom';

function MyApp() {
  const location = useLocation();
  
  // Only show on specific pages
  const showWidget = ['/about', '/contact', '/'].includes(location.pathname);
  
  return (
    <div>
      {/* Your app content */}
      
      {showWidget && (
        <NafisAIWidget agentUrl="https://your-agent.com/iframe" />
      )}
    </div>
  );
}
```

### State Management Integration
```jsx
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';

function ThemedAIWidget() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <NafisAIWidget 
      agentUrl="https://your-agent.com/iframe"
      theme={theme}
    />
  );
}
```

## 📱 Mobile Responsiveness

The widget automatically adapts to mobile devices:
- On mobile: Reduces size, adjusts position
- Touch-friendly toggle button
- Responsive iframe dimensions

## 🔐 Security Best Practices

### Production Configuration
Update your FastAPI app for production:

```python
# In main.py - restrict iframe origins for production
@app.middleware("http")
async def add_iframe_headers(request, call_next):
    response = await call_next(request)
    
    # Production: specify your domain
    response.headers["X-Frame-Options"] = "ALLOW-FROM https://yourdomain.com"
    response.headers["Content-Security-Policy"] = "frame-ancestors https://yourdomain.com"
    
    return response
```

### Environment Variables
```bash
# .env file
GROQ_API_KEY=your_actual_groq_api_key
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 🎯 Use Cases

### 1. **Portfolio Website**
Add an interactive "Ask me anything" feature:
```jsx
<section id="about">
  <h2>About Me</h2>
  <p>Want to know more? Ask my AI assistant!</p>
  
  <NafisAIWidget 
    agentUrl="https://nafis-ai.railway.app/iframe"
    position="inline"
    height="500px"
    title="Ask About My Experience"
  />
</section>
```

### 2. **Job Application Helper**
For recruiters to learn about you:
```jsx
<div className="recruiter-section">
  <h3>For Recruiters</h3>
  <p>Chat with my AI to learn about my skills and experience!</p>
  
  <NafisAIWidget 
    agentUrl="https://nafis-ai.railway.app/iframe"
    title="Chat About Nafis's Qualifications"
  />
</div>
```

### 3. **Client Showcase**
Show your AI expertise to potential clients:
```jsx
<div className="ai-demo">
  <h3>AI Solutions Demo</h3>
  <p>See how I build intelligent agents:</p>
  
  <NafisAIWidget 
    agentUrl="https://nafis-ai.railway.app/iframe"
    position="inline"
    width="100%"
    height="600px"
    title="AI Agent Built by Nafis"
  />
</div>
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Iframe not loading**
   - Check CORS configuration
   - Verify agent URL is accessible
   - Check browser console for errors

2. **Widget not responsive**
   - Add viewport meta tag to your HTML
   - Check CSS conflicts

3. **API errors**
   - Verify Groq API key is set
   - Check agent health endpoint: `/health`

### Debug Mode:
```jsx
<NafisAIWidget 
  agentUrl="https://your-agent.com/iframe"
  debug={true}  // Enables console logging
/>
```

## 🎉 Ready to Use!

Your AI agent is now ready to be embedded in any React application! This creates a powerful, interactive way for visitors to learn about your professional background.

**Perfect for:**
- 📄 Portfolio websites
- 💼 Job applications  
- 🤝 Client demonstrations
- 🎯 Networking events
- 📱 Personal branding

Deploy your agent and start showcasing your AI skills! 🚀
