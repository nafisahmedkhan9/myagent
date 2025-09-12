import React, { useState, useRef, useEffect } from 'react';

/**
 * Nafis AI Agent Widget - Clean Chat Window Style
 * 
 * Looks like Facebook/LinkedIn chat - single clean window without card styling
 */

const NafisAIWidget = ({ 
  // Configuration props
  agentUrl = "https://nafis-ai-agent.onrender.com/iframe",
  width = "100%", 
  height = "600px",
  showToggle = true,
  position = "bottom-right", // "bottom-right", "bottom-left", "fixed", "inline"
  title = "Chat with Nafis's AI Assistant"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Toggle widget visibility
  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  // Listen for close messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'closeChat') {
        setIsOpen(false);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Seamless chat window styles (no card styling)
  const getPositionStyles = () => {
    const baseStyles = {
      zIndex: 1000,
      // Removed all background, borders, shadows for seamless look
    };

    switch (position) {
      case "bottom-right":
        return {
          ...baseStyles,
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: width,
          height: height,
          maxWidth: '400px',
          maxHeight: '600px',
        };
      case "bottom-left":
        return {
          ...baseStyles,
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: width,
          height: height,
          maxWidth: '400px',
          maxHeight: '600px',
        };
      case "fixed":
        return {
          ...baseStyles,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width,
          height: height,
          maxWidth: '90vw',
          maxHeight: '90vh',
        };
      default: // inline
        return {
          ...baseStyles,
          width: width,
          height: height,
        };
    }
  };

  // Toggle button styles (modern chat button)
  const toggleButtonStyles = {
    position: 'fixed',
    bottom: position.includes('bottom') ? '20px' : 'auto',
    right: position.includes('right') ? '20px' : 'auto',
    left: position.includes('left') ? '20px' : 'auto',
    top: position === 'fixed' ? '20px' : 'auto',
    backgroundColor: '#0084ff', // Facebook messenger blue
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '56px',
    height: '56px',
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0, 132, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    zIndex: 1001,
    transition: 'all 0.3s ease',
  };

  // Loading spinner styles
  const loadingStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#0084ff',
    fontSize: '14px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  // Widget container styles
  const widgetContainerStyles = {
    ...getPositionStyles(),
    display: showToggle ? (isOpen ? 'block' : 'none') : 'block',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    borderRadius: position === 'inline' ? '0' : '12px',
    boxShadow: position === 'inline' ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.15)',
  };

  return (
    <>
      {/* Toggle Button (only shown when chat is closed) */}
      {showToggle && !isOpen && (
        <button
          onClick={toggleWidget}
          style={toggleButtonStyles}
          title="Chat with Nafis"
          aria-label="Open Chat"
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          💬
        </button>
      )}

      {/* Seamless Chat Window Container */}
      <div style={widgetContainerStyles}>
        {/* Loading Indicator */}
        {isLoading && (
          <div style={loadingStyles}>
            <div>Loading chat...</div>
          </div>
        )}

        {/* AI Agent Iframe - Seamless */}
        <iframe
          ref={iframeRef}
          src={agentUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: isLoading ? 'none' : 'block',
          }}
          onLoad={handleIframeLoad}
          title="Nafis Ahmed Khan AI Assistant"
          allow="camera; microphone; geolocation"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
        />
      </div>
    </>
  );
};

export default NafisAIWidget;

// Usage Examples for Seamless Chat Window:

// 1. Seamless floating chat (no background/borders)
// <NafisAIWidget 
//   agentUrl="https://nafis-ai-agent.onrender.com/iframe"
//   position="bottom-right"
//   width="380px"
//   height="600px"
// />

// 2. Seamless inline chat (pure iframe)
// <NafisAIWidget 
//   agentUrl="https://nafis-ai-agent.onrender.com/iframe"
//   position="inline"
//   showToggle={false}
//   width="100%"
//   height="500px"
// />

// 3. Full-screen seamless chat
// <NafisAIWidget 
//   agentUrl="https://nafis-ai-agent.onrender.com/iframe"
//   position="fixed"
//   width="700px"
//   height="800px"
// />
