import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { chatAPI } from '../services/api';
import { Send, Flag, Trash2, Users, Loader2, CheckCircle } from 'lucide-react';

const Community = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [stats, setStats] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, []);

  // Poll for new messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages(true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const data = await chatAPI.getMessages(50);
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await chatAPI.getStats();
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      await chatAPI.sendMessage(newMessage, isAnonymous);
      setNewMessage('');
      await fetchMessages(true);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await chatAPI.deleteMessage(messageId);
      await fetchMessages(true);
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message.');
    }
  };

  const reportMessage = async (messageId) => {
    if (!window.confirm('Report this message as inappropriate?')) return;

    try {
      await chatAPI.reportMessage(messageId);
      alert('Message reported. Our moderators will review it.');
      await fetchMessages(true);
    } catch (error) {
      console.error('Error reporting message:', error);
      alert('Failed to report message.');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bestie-lavender via-white to-bestie-peach">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">
              💖 BurBestie
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-bestie-purple">Dashboard</Link>
              <Link to="/community" className="text-bestie-purple font-semibold">Community</Link>
              <Link to="/profile" className="text-gray-700 hover:text-bestie-purple">Profile</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="card mb-6 bg-gradient-to-br from-bestie-purple to-bestie-pink text-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Community Circle 💬</h1>
              <p className="opacity-90">Connect with fellow Besties in a safe, supportive space</p>
            </div>
            {stats && (
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={20} />
                  <span className="font-semibold">{stats.activeBesties} Besties</span>
                </div>
                <p className="text-sm opacity-75">{stats.todayMessages} messages today</p>
              </div>
            )}
          </div>
        </div>

        {/* Guidelines */}
        <div className="card mb-6 bg-bestie-lavender">
          <h3 className="font-bold mb-2 text-bestie-purple">Community Guidelines 💖</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✅ Be kind, respectful, and supportive</li>
            <li>✅ Share your experiences and listen to others</li>
            <li>✅ Use the anonymous option for sensitive topics</li>
            <li>❌ No harassment, discrimination, or hate speech</li>
            <li>❌ No spam or promotional content</li>
          </ul>
        </div>

        {/* Chat Container */}
        <div className="card p-0 overflow-hidden" style={{ height: '60vh' }}>
          {/* Messages Area */}
          <div className="overflow-y-auto p-6 h-full bg-gray-50" style={{ height: 'calc(60vh - 100px)' }}>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin text-bestie-purple" size={48} />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Users size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No messages yet</p>
                <p className="text-gray-400 text-sm">Be the first to say hi! 👋</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isOwnMessage = msg.user._id === user?._id;
                  return (
                    <div
                      key={msg._id}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                      <div className={`flex gap-3 max-w-lg ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar */}
                        <img
                          src={msg.user.profileImage}
                          alt={msg.user.username}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        
                        {/* Message Content */}
                        <div>
                          <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                            <span className="font-semibold text-sm text-gray-700">
                              {msg.user.username}
                            </span>
                            {msg.isAnonymous && (
                              <span className="badge badge-purple text-xs">Anonymous</span>
                            )}
                            <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                          </div>
                          
                          <div className={`rounded-2xl px-4 py-3 ${
                            isOwnMessage
                              ? 'bg-gradient-to-br from-bestie-pink to-bestie-purple text-gray-800'
                              : 'bg-white text-gray-800 shadow-md'
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                          </div>
                          
                          {/* Message Actions */}
                          <div className={`flex gap-2 mt-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                            {isOwnMessage ? (
                              <button
                                onClick={() => deleteMessage(msg._id)}
                                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                              >
                                <Trash2 size={12} />
                                Delete
                              </button>
                            ) : (
                              <button
                                onClick={() => reportMessage(msg._id)}
                                className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1"
                              >
                                <Flag size={12} />
                                Report
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t-2 border-gray-200">
            <form onSubmit={sendMessage} className="flex gap-3">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e);
                    }
                  }}
                  placeholder="Share your thoughts with the community..."
                  className="input-field resize-none"
                  rows="2"
                  maxLength={1000}
                  disabled={sending}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4"
                      disabled={sending}
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600 cursor-pointer">
                      Post anonymously
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">
                    {newMessage.length}/1000
                  </span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={!newMessage.trim() || sending}
                className="btn-primary self-start"
              >
                {sending ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Send
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Community Stats */}
        {stats && (
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="card text-center">
              <Users className="text-bestie-purple mx-auto mb-2" size={32} />
              <p className="text-2xl font-bold">{stats.activeBesties}</p>
              <p className="text-sm text-gray-600">Active Besties</p>
            </div>
            <div className="card text-center">
              <CheckCircle className="text-bestie-pink mx-auto mb-2" size={32} />
              <p className="text-2xl font-bold">{stats.todayMessages}</p>
              <p className="text-sm text-gray-600">Messages Today</p>
            </div>
            <div className="card text-center">
              <Users className="text-bestie-peach mx-auto mb-2" size={32} />
              <p className="text-2xl font-bold">{stats.totalMessages}</p>
              <p className="text-sm text-gray-600">Total Messages</p>
            </div>
          </div>
        )}

        {/* Safety Notice */}
        <div className="card mt-6 bg-yellow-50 border-2 border-yellow-200">
          <p className="text-sm text-gray-700">
            <strong>💡 Safety Reminder:</strong> Never share personal information like your address, 
            phone number, or financial details in the chat. If you feel unsafe, use the SOS button 
            or report inappropriate messages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Community;