import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Navbar from '../components/Navbar';

const Inbox = () => {
  const [searchParams] = useSearchParams();
  const initialContactId = searchParams.get('contact');
  
  const [conversations, setConversations] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userStr);
    setCurrentUser(user);

    // Initialize Socket
    socketRef.current = io('http://localhost:5001');
    socketRef.current.emit('join', user.id);

    socketRef.current.on('newMessage', (message) => {
      // If we are currently chatting with the sender, append the message
      setActiveContact((prevContact) => {
        if (prevContact && prevContact._id === message.senderId) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
        return prevContact;
      });
      // Also refresh conversations list to put this one at the top
      fetchConversations();
    });

    fetchConversations();

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/messages/conversations', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setConversations(data);
      if (loading) setLoading(false);

      // If we have an initial contact from URL and it's not the active one
      if (initialContactId && !activeContact) {
        let contact = data.find(c => c.contact._id === initialContactId)?.contact;
        if (!contact) {
          // New conversation, fetch user details directly
          const userRes = await fetch(`/api/admin/users`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          if (userRes.ok) {
            const allUsers = await userRes.json();
            contact = allUsers.find(u => u._id === initialContactId);
            if (contact) {
              // Add a mock conversation entry so it shows in the sidebar
              setConversations(prev => [{ contact, lastMessage: { content: 'New conversation...', createdAt: new Date() } }, ...prev]);
            }
          }
        }
        if (contact) {
          loadMessages(contact);
        }
      }
    } catch (err) {
      console.error('Failed to fetch conversations', err);
      setLoading(false);
    }
  };

  const loadMessages = async (contact) => {
    setActiveContact(contact);
    try {
      const res = await fetch(`/api/messages/${contact._id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setMessages(data);
      // Refresh conversations to clear unread counts if we had any
      fetchConversations();
    } catch (err) {
      console.error('Failed to load messages', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContact) return;

    const messageData = {
      receiverId: activeContact._id,
      content: newMessage
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(messageData)
      });
      
      const savedMessage = await res.json();
      
      // Update local UI immediately
      setMessages([...messages, savedMessage]);
      setNewMessage('');
      
      // Send via socket
      socketRef.current.emit('sendMessage', savedMessage);
      fetchConversations();
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  if (loading) return <div className="text-center mt-5 text-white">Loading inbox...</div>;

  return (
    <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Navbar />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
        <h2 className="mb-4 text-white">Your Inbox</h2>
        
        <div className="row glass-panel" style={{ minHeight: '600px', padding: 0, overflow: 'hidden' }}>
          
          {/* Sidebar - Conversations */}
          <div className="col-md-4" style={{ borderRight: '1px solid var(--border-glass)', padding: 0, backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div className="p-3" style={{ borderBottom: '1px solid var(--border-glass)' }}>
              <h5 className="mb-0">Conversations</h5>
            </div>
            
            <div style={{ overflowY: 'auto', height: 'calc(600px - 57px)' }}>
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-muted">No messages yet.</div>
              ) : (
                conversations.map((conv, index) => (
                  <div 
                    key={index}
                    onClick={() => loadMessages(conv.contact)}
                    style={{ 
                      padding: '16px', 
                      cursor: 'pointer', 
                      borderBottom: '1px solid var(--border-glass)',
                      backgroundColor: activeContact?._id === conv.contact._id ? 'rgba(var(--accent-primary-rgb), 0.1)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                    className="conversation-item hover-glass"
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <strong style={{ color: 'var(--accent-secondary)' }}>{conv.contact.storeName || conv.contact.username}</strong>
                      <small className="text-muted">
                        {new Date(conv.lastMessage.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <div 
                      style={{ 
                        fontSize: '0.85rem', 
                        color: (conv.lastMessage.receiverId === currentUser.id && !conv.lastMessage.readStatus) ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontWeight: (conv.lastMessage.receiverId === currentUser.id && !conv.lastMessage.readStatus) ? 'bold' : 'normal',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {conv.lastMessage.senderId === currentUser.id ? 'You: ' : ''}{conv.lastMessage.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Main - Chat Area */}
          <div className="col-md-8 d-flex flex-column" style={{ padding: 0 }}>
            {activeContact ? (
              <>
                {/* Chat Header */}
                <div className="p-3 d-flex align-items-center" style={{ borderBottom: '1px solid var(--border-glass)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                  <div>
                    <h5 className="mb-0" style={{ color: 'var(--accent-secondary)' }}>
                      {activeContact.storeName || activeContact.username}
                    </h5>
                    <small className="text-muted">{activeContact.role}</small>
                  </div>
                </div>

                {/* Messages List */}
                <div className="flex-grow-1 p-4" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {messages.map((msg, idx) => {
                    const isMine = msg.senderId === currentUser.id;
                    return (
                      <div key={idx} style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: isMine ? 'flex-end' : 'flex-start'
                      }}>
                        <div style={{
                          maxWidth: '75%',
                          padding: '12px 16px',
                          borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                          background: isMine ? 'linear-gradient(135deg, var(--accent-primary), #6366f1)' : 'rgba(255,255,255,0.05)',
                          color: isMine ? '#fff' : 'var(--text-primary)',
                          border: isMine ? 'none' : '1px solid var(--border-glass)',
                          fontSize: '0.95rem'
                        }}>
                          {msg.content}
                        </div>
                        <small className="text-muted mt-1" style={{ fontSize: '0.7rem' }}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </small>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3" style={{ borderTop: '1px solid var(--border-glass)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <form onSubmit={sendMessage} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.05)', 
                        border: '1px solid var(--border-glass)',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '10px 20px'
                      }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '20px', padding: '0 24px' }}>
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                <div className="text-center">
                  <h4 style={{ color: 'var(--text-secondary)' }}>Select a conversation</h4>
                  <p>Choose a contact from the sidebar to start chatting</p>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Inbox;
