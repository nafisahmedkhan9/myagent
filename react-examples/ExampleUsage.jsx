import React, { useState } from 'react';
import NafisAIWidget from './NafisAIWidget';

/**
 * Example implementations of Nafis AI Widget
 * Copy these patterns into your React application
 */

// Example 1: Portfolio Landing Page
export const PortfolioExample = () => {
  return (
    <div className="portfolio-page">
      <header>
        <h1>Nafis Ahmed Khan</h1>
        <p>Software Engineer & AI Specialist</p>
      </header>

      <main>
        <section id="about">
          <h2>About Me</h2>
          <p>
            I'm a software engineer with expertise in AI solutions, 
            full-stack development, and enterprise integrations.
          </p>
        </section>

        <section id="projects">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            {/* Your project cards here */}
          </div>
        </section>

        <section id="ask-me">
          <h2>Ask Me Anything</h2>
          <p>Want to know more about my experience? Chat with my AI assistant!</p>
          
          {/* Inline AI Widget for dedicated section */}
          <NafisAIWidget 
            agentUrl="https://your-deployed-agent.com/iframe"
            position="inline"
            showToggle={false}
            width="100%"
            height="500px"
            title="Ask About My Experience & Skills"
          />
        </section>
      </main>

      {/* Floating widget for general questions */}
      <NafisAIWidget 
        agentUrl="https://your-deployed-agent.com/iframe"
        position="bottom-right"
        width="400px"
        height="600px"
        title="Quick Questions"
      />
    </div>
  );
};

// Example 2: Job Application Page
export const JobApplicationExample = () => {
  return (
    <div className="job-application">
      <div className="application-header">
        <h1>Application for Senior Software Engineer</h1>
        <p>Nafis Ahmed Khan - Interactive Resume</p>
      </div>

      <div className="application-content">
        <div className="traditional-resume">
          <h2>Resume Summary</h2>
          <p>Download PDF or view traditional format...</p>
        </div>

        <div className="interactive-section">
          <h2>Interactive Q&A</h2>
          <p>
            Ask my AI assistant specific questions about my qualifications, 
            experience, or any requirements for this role.
          </p>
          
          <NafisAIWidget 
            agentUrl="https://your-deployed-agent.com/iframe"
            position="inline"
            showToggle={false}
            width="100%"
            height="600px"
            title="Ask About My Qualifications"
          />
        </div>
      </div>
    </div>
  );
};

// Example 3: Client Demo Page
export const ClientDemoExample = () => {
  const [demoMode, setDemoMode] = useState('chat');

  return (
    <div className="client-demo">
      <h1>AI Solutions Demo</h1>
      <p>Experience the type of conversational AI I can build for your business</p>

      <div className="demo-controls">
        <button 
          onClick={() => setDemoMode('chat')}
          className={demoMode === 'chat' ? 'active' : ''}
        >
          Chat Demo
        </button>
        <button 
          onClick={() => setDemoMode('api')}
          className={demoMode === 'api' ? 'active' : ''}
        >
          API Demo
        </button>
      </div>

      {demoMode === 'chat' && (
        <div className="chat-demo">
          <h3>Conversational AI Agent</h3>
          <p>This agent represents me and can answer questions about my background:</p>
          
          <NafisAIWidget 
            agentUrl="https://your-deployed-agent.com/iframe"
            position="inline"
            showToggle={false}
            width="100%"
            height="500px"
            title="AI Agent Demo - Nafis Ahmed Khan"
          />
        </div>
      )}

      {demoMode === 'api' && (
        <div className="api-demo">
          <h3>API Integration Example</h3>
          <p>This same AI can be integrated into your systems via REST API</p>
          {/* API documentation or integration examples */}
        </div>
      )}
    </div>
  );
};

// Example 4: Mobile-Optimized Implementation
export const MobileOptimizedExample = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mobile-optimized">
      <h1>Mobile-Friendly Portfolio</h1>
      
      {isMobile ? (
        // Mobile: Bottom widget with smaller dimensions
        <NafisAIWidget 
          agentUrl="https://your-deployed-agent.com/iframe"
          position="bottom-right"
          width="320px"
          height="500px"
          title="Chat with Nafis"
        />
      ) : (
        // Desktop: Larger widget with more features
        <NafisAIWidget 
          agentUrl="https://your-deployed-agent.com/iframe"
          position="bottom-right"
          width="420px"
          height="650px"
          title="Ask Me About My Experience"
        />
      )}
    </div>
  );
};

// Example 5: Multi-Page React App with Conditional Widget
export const MultiPageExample = () => {
  // This would typically use React Router
  const [currentPage, setCurrentPage] = useState('home');
  
  // Define which pages should show the widget
  const pagesWithWidget = ['home', 'about', 'contact', 'portfolio'];
  
  return (
    <div className="multi-page-app">
      <nav>
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('about')}>About</button>
        <button onClick={() => setCurrentPage('portfolio')}>Portfolio</button>
        <button onClick={() => setCurrentPage('contact')}>Contact</button>
        <button onClick={() => setCurrentPage('blog')}>Blog</button>
      </nav>

      <main>
        {currentPage === 'home' && <div>Home Page Content</div>}
        {currentPage === 'about' && <div>About Page Content</div>}
        {currentPage === 'portfolio' && <div>Portfolio Page Content</div>}
        {currentPage === 'contact' && <div>Contact Page Content</div>}
        {currentPage === 'blog' && <div>Blog Page Content</div>}
      </main>

      {/* Conditionally show widget only on certain pages */}
      {pagesWithWidget.includes(currentPage) && (
        <NafisAIWidget 
          agentUrl="https://your-deployed-agent.com/iframe"
          position="bottom-right"
          title={`Ask About ${currentPage === 'home' ? 'Nafis' : currentPage}`}
        />
      )}
    </div>
  );
};

// Example 6: Advanced Integration with Custom Hooks
export const AdvancedExample = () => {
  // Custom hook for widget configuration
  const useWidgetConfig = () => {
    const [config, setConfig] = useState({
      isOpen: false,
      theme: 'default',
      position: 'bottom-right'
    });

    const toggleWidget = () => setConfig(prev => ({ ...prev, isOpen: !prev.isOpen }));
    const setTheme = (theme) => setConfig(prev => ({ ...prev, theme }));
    const setPosition = (position) => setConfig(prev => ({ ...prev, position }));

    return { config, toggleWidget, setTheme, setPosition };
  };

  const { config, toggleWidget, setTheme, setPosition } = useWidgetConfig();

  return (
    <div className="advanced-example">
      <h1>Advanced Widget Integration</h1>
      
      <div className="widget-controls">
        <h3>Widget Settings</h3>
        <button onClick={() => setPosition('bottom-right')}>Bottom Right</button>
        <button onClick={() => setPosition('bottom-left')}>Bottom Left</button>
        <button onClick={() => setPosition('fixed')}>Modal</button>
        <button onClick={() => setPosition('inline')}>Inline</button>
      </div>

      {config.position === 'inline' && (
        <div className="inline-widget-container">
          <h3>Chat with Nafis's AI</h3>
          <NafisAIWidget 
            agentUrl="https://your-deployed-agent.com/iframe"
            position="inline"
            showToggle={false}
            width="100%"
            height="600px"
          />
        </div>
      )}

      {config.position !== 'inline' && (
        <NafisAIWidget 
          agentUrl="https://your-deployed-agent.com/iframe"
          position={config.position}
          theme={config.theme}
        />
      )}
    </div>
  );
};

// Export all examples
export default {
  PortfolioExample,
  JobApplicationExample,
  ClientDemoExample,
  MobileOptimizedExample,
  MultiPageExample,
  AdvancedExample
};
