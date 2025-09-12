# Free Hosting Deployment Guide

This guide covers how to deploy your AI agent to various free hosting platforms.

## Option 1: Railway (Recommended) 🚀

**Why Railway**: Easy deployment, good free tier, automatic HTTPS

### Steps:

1. **Prepare your code**
   ```bash
   # Create Procfile for Railway
   echo "web: python main.py" > Procfile
   
   # Create railway.json for configuration
   cat > railway.json << EOF
   {
     "deploy": {
       "startCommand": "python main.py"
     }
   }
   EOF
   ```

2. **Deploy to Railway**
   - Visit [Railway](https://railway.app/)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Connect your repository
   - Add environment variable: `GROQ_API_KEY=your_key_here`
   - Railway will auto-deploy!

3. **Access your app**
   - Railway provides a URL like `https://your-app.railway.app`

## Option 2: Render 🌐

**Why Render**: Simple deployment, good free tier, automatic SSL

### Steps:

1. **Prepare deployment files**
   ```bash
   # Create build script
   cat > build.sh << EOF
   #!/usr/bin/env bash
   pip install -r requirements.txt
   EOF
   chmod +x build.sh
   ```

2. **Deploy to Render**
   - Visit [Render](https://render.com/)
   - Sign up with GitHub
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Build Command: `./build.sh`
     - Start Command: `python main.py`
     - Environment Variables: `GROQ_API_KEY=your_key_here`

3. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)

## Option 3: Fly.io ✈️

**Why Fly.io**: Global edge deployment, generous free tier

### Steps:

1. **Install Fly CLI**
   ```bash
   # Linux
   curl -L https://fly.io/install.sh | sh
   
   # macOS
   brew install flyctl
   ```

2. **Login and Initialize**
   ```bash
   fly auth login
   fly launch
   ```

3. **Configure fly.toml**
   ```toml
   app = "nafis-ai-agent"
   primary_region = "sjc"

   [build]

   [env]
     PORT = "8000"

   [http_service]
     internal_port = 8000
     force_https = true
     auto_stop_machines = true
     auto_start_machines = true

   [[vm]]
     cpu_kind = "shared"
     cpus = 1
     memory_mb = 256
   ```

4. **Set Environment Variables**
   ```bash
   fly secrets set GROQ_API_KEY=your_key_here
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

## Option 4: Vercel (For Static + Serverless) ⚡

**Note**: Requires adapting to serverless functions

### Steps:

1. **Create vercel.json**
   ```json
   {
     "builds": [
       {
         "src": "main.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "main.py"
       }
     ]
   }
   ```

2. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## Option 5: Replit (Easiest for Beginners) 🔧

### Steps:

1. **Upload to Replit**
   - Visit [Replit](https://replit.com/)
   - Create new Repl → Import from GitHub
   - Paste your repository URL

2. **Configure Environment**
   - In Replit, go to "Secrets" tab
   - Add `GROQ_API_KEY` with your API key

3. **Run**
   - Click "Run" button
   - Replit provides a public URL

## Environment Variables Setup

For all platforms, you need to set:

```
GROQ_API_KEY=your_groq_api_key_here
```

## Getting Groq API Key (Free)

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for free account
3. Go to API Keys section
4. Create new API key
5. Copy the key (starts with `gsk_...`)

## Post-Deployment Checklist

- ✅ App loads without errors
- ✅ Health check endpoint works: `/health`
- ✅ Chat functionality works
- ✅ Resume content is loaded properly
- ✅ HTTPS is working (most platforms provide this automatically)

## Troubleshooting Common Issues

### 1. App Won't Start
- Check logs for missing dependencies
- Verify Python version compatibility
- Ensure all required files are uploaded

### 2. API Key Issues
- Double-check environment variable name: `GROQ_API_KEY`
- Verify API key is valid on Groq console
- Check for leading/trailing spaces

### 3. Static Files Not Loading
- Ensure `static/` folder is uploaded
- Check file paths in deployment

### 4. CORS Issues
- Most hosting platforms handle this automatically
- If issues persist, check CORS settings in `main.py`

## Cost Comparison

| Platform | Free Tier | Limits | Recommendation |
|----------|-----------|--------|----------------|
| Railway | 512MB RAM | $5 credit/month | ⭐ Best overall |
| Render | 512MB RAM | 750 hours/month | ⭐ Good alternative |
| Fly.io | 256MB RAM | 3 apps | Good for minimal apps |
| Replit | Variable | Public by default | Best for beginners |
| Vercel | Serverless | Function execution limits | Good for low traffic |

## Production Tips

1. **Monitor Usage**: Check your free tier limits
2. **Optimize Performance**: Use caching for resume content
3. **Error Handling**: Implement proper logging
4. **Security**: Never commit API keys to version control
5. **Scaling**: Consider paid tiers if traffic grows

## Need Help?

- Check platform-specific documentation
- Join platform Discord/community channels
- Review deployment logs for specific errors

Happy deploying! 🎉
