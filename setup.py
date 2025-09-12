#!/usr/bin/env python3
"""
Setup script for Nafis Ahmed Khan AI Agent
"""

import os
import sys

def create_env_file():
    """Create a .env file if it doesn't exist"""
    if not os.path.exists('.env'):
        env_content = """# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Instructions:
# 1. Get your free API key from: https://console.groq.com/
# 2. Replace 'your_groq_api_key_here' with your actual API key
# 3. Save this file
"""
        with open('.env', 'w') as f:
            f.write(env_content)
        print("✅ Created .env file - Please add your Groq API key!")
    else:
        print("✅ .env file already exists")

def check_dependencies():
    """Check if required packages are installed"""
    required_packages = [
        'fastapi', 'uvicorn', 'groq', 'python-dotenv', 'pydantic'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print(f"❌ Missing packages: {', '.join(missing_packages)}")
        print("📦 Install with: pip install -r requirements.txt")
        return False
    else:
        print("✅ All dependencies installed")
        return True

def validate_structure():
    """Validate project structure"""
    required_files = [
        'main.py', 'config.py', 'requirements.txt', 
        'static/index.html', 'README.md'
    ]
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
    
    if missing_files:
        print(f"❌ Missing files: {', '.join(missing_files)}")
        return False
    else:
        print("✅ All required files present")
        return True

def main():
    print("🚀 Setting up Nafis Ahmed Khan AI Agent...")
    print("=" * 50)
    
    # Check project structure
    if not validate_structure():
        print("❌ Setup failed: Missing required files")
        sys.exit(1)
    
    # Create .env file
    create_env_file()
    
    # Check dependencies
    if not check_dependencies():
        print("❌ Setup failed: Install dependencies first")
        sys.exit(1)
    
    print("\n🎉 Setup complete!")
    print("\n✅ Resume content already loaded from MyResumeLatestV11.txt")
    print("\nNext steps:")
    print("1. Add your Groq API key to .env file")
    print("2. Run: python3 main.py")
    print("3. Visit: http://localhost:8000")
    print("\n💡 Your AI agent is ready to answer questions about Nafis Ahmed Khan!")

if __name__ == "__main__":
    main()
