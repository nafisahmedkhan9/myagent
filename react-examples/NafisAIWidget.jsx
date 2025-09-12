import React, { useState, useRef, useEffect } from 'react';

/**
 * Nafis AI Agent Widget - React Component
 * 
 * This component embeds Nafis's AI agent as an iframe widget
 * Perfect for portfolio websites, personal pages, or any React application
 */

const NafisAIWidget = ({ 
  // Configuration props
  agentUrl = "http://localhost:8000/iframe",  // Your deployed AI agent URL
  width = "100%", 
  height = "600px",
  showToggle = true,
  position = "bottom-right", // "bottom-right", "bottom-left", "fixed", "inline"
  theme = "default",
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

  // Styles for different positions
  const getPositionStyles = () => {
    const baseStyles = {
      zIndex: 1000,
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e1e5e9',
      backgroundColor: '#ffffff',
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

  // Toggle button styles
  const toggleButtonStyles = {
    position: 'fixed',
    bottom: position.includes('bottom') ? '20px' : 'auto',
    right: position.includes('right') ? '20px' : 'auto',
    left: position.includes('left') ? '20px' : 'auto',
    top: position === 'fixed' ? '20px' : 'auto',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0, 123, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    zIndex: 1001,
    transition: 'all 0.3s ease',
  };

  // Loading spinner styles
  const loadingStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#007bff',
    fontSize: '16px',
  };

  // Widget container styles
  const widgetContainerStyles = {
    ...getPositionStyles(),
    display: showToggle ? (isOpen ? 'block' : 'none') : 'block',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  };

  return (
    <>
      {/* Toggle Button (only shown if showToggle is true) */}
      {showToggle && (
        <button
          onClick={toggleWidget}
          style={toggleButtonStyles}
          title={isOpen ? "Close Chat" : "Chat with Nafis's AI"}
          aria-label={isOpen ? "Close Chat" : "Open Chat"}
        >
          {isOpen ? "✕" : "💬"}
        </button>
      )}

      {/* Widget Container */}
      <div style={widgetContainerStyles}>
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e1e5e9',
          fontWeight: '600',
          fontSize: '14px',
          color: '#333',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{title}</span>
          {showToggle && (
            <button
              onClick={toggleWidget}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#666',
                padding: '0',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Close"
            >
              ✕
            </button>
          )}
        </div>

        {/* Iframe Container */}
        <div style={{ position: 'relative', height: 'calc(100% - 50px)' }}>
          {/* Loading Indicator */}
          {isLoading && (
            <div style={loadingStyles}>
              <div>Loading Nafis's AI Agent...</div>
            </div>
          )}

          {/* AI Agent Iframe */}
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
      </div>
    </>
  );
};

export default NafisAIWidget;

// Usage Examples:

// 1. Fixed Bottom-Right Widget (Default)
// <NafisAIWidget agentUrl="https://your-deployed-app.com/iframe" />

// 2. Inline Embed
// <NafisAIWidget 
//   agentUrl="https://your-deployed-app.com/iframe"
//   position="inline"
//   showToggle={false}
//   width="100%"
//   height="500px"
// />

// 3. Modal-style Fixed Center
// <NafisAIWidget 
//   agentUrl="https://your-deployed-app.com/iframe"
//   position="fixed"
//   width="600px"
//   height="700px"
// />

// 4. Bottom-Left Corner
// <NafisAIWidget 
//   agentUrl="https://your-deployed-app.com/iframe"
//   position="bottom-left"
//   width="350px"
//   height="500px"
// />
