#!/usr/bin/env python3
"""
Example script showing how to update resume content via API
Note: The actual resume content is already loaded from MyResumeLatestV11.txt into config.py
This script shows how to make updates via the API if needed.
"""

import requests
import json

# Example resume content for Nafis Ahmed Khan
EXAMPLE_RESUME = """
NAFIS AHMED KHAN
Software Engineer | Full-Stack Developer | AI Enthusiast

📧 Email: nafis@example.com
🔗 LinkedIn: linkedin.com/in/nafisahmedkhan
🐙 GitHub: github.com/nafisahmedkhan
📍 Location: Your City, Country

PROFESSIONAL SUMMARY
====================
Experienced Software Engineer with 5+ years in full-stack development, specializing in Python, JavaScript, and cloud technologies. Passionate about AI/ML applications and building scalable web solutions. Strong background in API development, database design, and modern DevOps practices.

TECHNICAL SKILLS
================
• Programming Languages: Python, JavaScript, TypeScript, Java, Go
• Web Frameworks: FastAPI, Django, React, Node.js, Express.js
• Databases: PostgreSQL, MongoDB, Redis, MySQL
• Cloud Platforms: AWS, Google Cloud, Azure, Railway, Vercel
• AI/ML: TensorFlow, PyTorch, Scikit-learn, OpenAI API, Llama models
• DevOps: Docker, Kubernetes, CI/CD, Git, GitHub Actions
• Other: REST APIs, GraphQL, WebSockets, Microservices, Agile

PROFESSIONAL EXPERIENCE
=======================

Senior Software Engineer | TechCorp Inc. | 2021 - Present
• Developed and maintained microservices handling 1M+ daily requests
• Led migration of monolithic application to cloud-native architecture
• Implemented AI-powered features increasing user engagement by 35%
• Mentored junior developers and conducted code reviews

Full-Stack Developer | StartupXYZ | 2019 - 2021  
• Built responsive web applications using React and Python/Django
• Designed and implemented RESTful APIs serving mobile and web clients
• Optimized database queries reducing response times by 60%
• Collaborated with product team to deliver features on tight deadlines

Software Developer Intern | BigTech Solutions | 2018 - 2019
• Contributed to open-source projects with 10K+ GitHub stars
• Developed automated testing frameworks improving code coverage to 95%
• Participated in hackathons, winning 2nd place in AI category

PROJECTS
========

🤖 AI Personal Assistant (2024)
• Built FastAPI-based AI agent using Llama models and Groq API
• Implemented resume-based knowledge system with scope validation
• Deployed on multiple free platforms with beautiful web interface
• Tech: Python, FastAPI, Groq API, HTML/CSS/JS

📊 Data Analytics Dashboard (2023)
• Created real-time analytics platform processing 100K+ events/day
• Built interactive visualizations with React and D3.js
• Implemented real-time updates using WebSockets
• Tech: Python, React, PostgreSQL, Redis, WebSockets

🛒 E-commerce Platform (2022)
• Developed full-stack e-commerce solution with payment integration
• Implemented inventory management and order tracking systems
• Built admin dashboard with sales analytics and reporting
• Tech: Django, React, PostgreSQL, Stripe API, AWS

EDUCATION
=========
Bachelor of Science in Computer Science | University Name | 2018
• Relevant Coursework: Data Structures, Algorithms, Database Systems, Machine Learning
• Graduated Magna Cum Laude (GPA: 3.8/4.0)

CERTIFICATIONS
==============
• AWS Certified Solutions Architect - Associate (2023)
• Google Cloud Professional Developer (2022)
• MongoDB Certified Developer (2021)

ACHIEVEMENTS
============
• Published 3 technical articles on Medium with 10K+ reads
• Speaker at 2 tech conferences on AI and web development
• Contributed to 15+ open-source projects
• Mentored 20+ junior developers through coding bootcamps

LANGUAGES
=========
• English (Native)
• Spanish (Conversational)
• Arabic (Basic)

INTERESTS
=========
• Open Source Contributions
• AI/ML Research and Applications
• Tech Blogging and Community Building
• Photography and Travel
"""

def update_resume_content(base_url="http://localhost:8000"):
    """Update the resume content via API"""
    
    url = f"{base_url}/update-resume"
    
    payload = {
        "resume_content": EXAMPLE_RESUME.strip()
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        
        result = response.json()
        print("✅ Resume updated successfully!")
        print(f"📝 Preview: {result.get('preview', '')}")
        
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the API. Make sure the server is running on", base_url)
    except requests.exceptions.HTTPError as e:
        print(f"❌ HTTP Error: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_chat(base_url="http://localhost:8000"):
    """Test the chat functionality"""
    
    url = f"{base_url}/chat"
    
    test_questions = [
        "What are Nafis's technical skills?",
        "Tell me about his work experience",
        "What projects has he worked on?",
        "What's his educational background?",
        "What is the weather today?",  # This should be declined
    ]
    
    for question in test_questions:
        print(f"\n❓ Question: {question}")
        
        try:
            response = requests.post(url, json={"message": question})
            response.raise_for_status()
            
            result = response.json()
            print(f"🤖 Response: {result['response'][:200]}...")
            
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("🚀 Nafis Ahmed Khan AI Agent - Resume Update Example")
    print("=" * 60)
    
    # Update resume content
    print("\n1. Updating resume content...")
    update_resume_content()
    
    # Test chat functionality
    print("\n2. Testing chat functionality...")
    test_chat()
    
    print("\n✨ Done! Your AI agent now has the example resume content.")
    print("💡 Tip: Edit this script to use your actual resume content.")
