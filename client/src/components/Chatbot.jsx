import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Hello! I am your Ethiozone AI Assistant. I can help you search for jobs, find handymen (Hire Me), browse real estate (Houses), or guide you through creating listings. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      setIsTyping(false);

      if (response.ok && data.reply) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I am having trouble connecting right now. Please try again." }]);
      }
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'ai', text: "Network error. Please try again later." }]);
    }
  };

  const quickReplies = [
    { label: "🛠️ Find a plumber", text: "Find a plumber" },
    { label: "💼 Latest jobs", text: "Show me job openings" },
    { label: "🏠 Browse houses", text: "Browse houses" },
    { label: "📝 How to list my business?", text: "How to list my business" }
  ];

  return (
    <div className="ai-chatbot-container">
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`chatbot-toggle-btn ${isOpen ? 'active' : ''}`}
        aria-label="Toggle AI Assistant"
        style={{ padding: isOpen ? '0' : '10px' }}
      >
        {isOpen ? '✕' : <img src="/logo.png" alt="Logo" className="chatbot-logo-img" />}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="chatbot-window glass-panel">
          {/* Header */}
          <div className="chatbot-header">
            <span className="avatar" style={{ display: 'flex', alignItems: 'center', width: '30px', height: '30px' }}>
              <img src="/logo.png" alt="Logo" className="chatbot-logo-img" />
            </span>
            <div className="header-info">
              <h4>Ethiozone AI</h4>
              <span className="status"><span className="status-dot"></span> Online Guide</span>
            </div>
            <button className="btn-close-chat" onClick={() => setIsOpen(false)}>&times;</button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.sender}`}>
                {msg.sender === 'ai' && (
                  <span className="msg-avatar" style={{ display: 'flex', marginTop: '4px', width: '20px', height: '20px' }}>
                    <img src="/logo.png" alt="Logo" className="chatbot-logo-img" />
                  </span>
                )}
                <div className="message-bubble">
                  {msg.text.split('\n').map((para, i) => (
                    <p key={i} style={{ margin: '0 0 8px 0' }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-row ai">
                <span className="msg-avatar" style={{ display: 'flex', marginTop: '4px', width: '20px', height: '20px' }}>
                  <img src="/logo.png" alt="Logo" className="chatbot-logo-img" />
                </span>
                <div className="message-bubble typing-bubble">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="chatbot-quick-replies">
            {quickReplies.map((reply, index) => (
              <button 
                key={index} 
                className="quick-reply-pill" 
                onClick={() => handleSend(reply.text)}
              >
                {reply.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="chatbot-input-form"
          >
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="form-control chat-input"
            />
            <button type="submit" className="btn btn-primary btn-chat-send">
              ➔
            </button>
          </form>
        </div>
      )}

      <style>{`
        .ai-chatbot-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          font-family: inherit;
        }

        .chatbot-toggle-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          border: none;
          color: white;
          font-size: 1.8rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(13, 148, 136, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .chatbot-toggle-btn:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 12px 40px rgba(13, 148, 136, 0.5);
        }

        .chatbot-toggle-btn.active {
          background: #1e293b;
          font-size: 1.2rem;
          border: 1px solid var(--border-glass);
        }

        .chatbot-window {
          position: absolute;
          bottom: 72px;
          right: 0;
          width: 380px;
          height: 500px;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          border: 1px solid var(--border-glass);
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
          animation: slideUpFade 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-header {
          padding: 16px;
          background: rgba(13, 148, 136, 0.1);
          border-bottom: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chatbot-header .avatar {
          font-size: 1.8rem;
        }

        .chatbot-header .header-info h4 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .chatbot-header .header-info .status {
          font-size: 0.75rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          display: inline-block;
          animation: pulseGreen 2s infinite;
        }

        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .btn-close-chat {
          margin-left: auto;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.4rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .btn-close-chat:hover {
          color: var(--text-main);
        }

        .chatbot-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(0, 0, 0, 0.15);
        }

        .message-row {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          max-width: 85%;
        }

        .message-row.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-row.ai {
          align-self: flex-start;
        }

        .msg-avatar {
          font-size: 1.2rem;
          margin-top: 2px;
        }

        .message-bubble {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.88rem;
          line-height: 1.4;
          color: var(--text-main);
        }

        .message-row.user .message-bubble {
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          color: white;
          border-bottom-right-radius: 2px;
        }

        .message-row.ai .message-bubble {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          border-bottom-left-radius: 2px;
        }

        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
        }

        .typing-bubble .dot {
          width: 6px;
          height: 6px;
          background: var(--text-secondary);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .typing-bubble .dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-bubble .dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }

        .chatbot-quick-replies {
          padding: 8px 12px;
          display: flex;
          gap: 6px;
          overflow-x: auto;
          white-space: nowrap;
          border-top: 1px solid var(--border-glass);
          background: rgba(0, 0, 0, 0.08);
        }

        .chatbot-quick-replies::-webkit-scrollbar {
          height: 4px;
        }

        .chatbot-quick-replies::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .quick-reply-pill {
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          border-radius: 16px;
          color: var(--text-secondary);
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .quick-reply-pill:hover {
          background: rgba(13, 148, 136, 0.15);
          color: var(--text-main);
          border-color: var(--accent-primary);
        }

        .chatbot-input-form {
          padding: 12px;
          border-top: 1px solid var(--border-glass);
          display: flex;
          gap: 8px;
          background: rgba(15, 23, 42, 0.4);
        }

        .chat-input {
          margin: 0;
          font-size: 0.88rem;
          border-radius: 8px !important;
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
        }
        .chat-input::placeholder {
          color: rgba(255, 255, 255, 0.45) !important;
        }
        .chat-input:focus {
          background: rgba(255, 255, 255, 0.12) !important;
          border-color: var(--accent-primary) !important;
          color: #ffffff !important;
          box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.25) !important;
          outline: none;
        }

        .btn-chat-send {
          padding: 0 16px;
          font-size: 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-logo-img {
          mix-blend-mode: screen;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.6)) drop-shadow(0 1px 3px rgba(255, 255, 255, 0.4));
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        body.light-theme .chatbot-logo-img {
          mix-blend-mode: multiply;
          filter: invert(1) drop-shadow(0 0 10px rgba(0, 0, 0, 0.4)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.25));
        }

        @media (max-width: 992px) {
          .ai-chatbot-container {
            bottom: 90px;
          }
        }

        @media (max-width: 480px) {
          .chatbot-window {
            width: calc(100vw - 32px);
            height: calc(100vh - 150px);
            right: -8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
