import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card max-w-2xl w-full mx-4 text-center">
        <h1 className="text-5xl font-bold gradient-text mb-6">
          💖 BurBestie
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Your Digital Safe Haven for Women
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Connect with a supportive community, access empowering content,
          and get help when you need it most. BurBestie is here for you 24/7.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="feature-card">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-semibold mb-2">Community Support</h3>
            <p className="text-sm text-gray-600">Connect with women who understand</p>
          </div>
          <div className="feature-card">
            <div className="text-3xl mb-3">🚨</div>
            <h3 className="font-semibold mb-2">SOS Support</h3>
            <p className="text-sm text-gray-600">Emergency help at your fingertips</p>
          </div>
          <div className="feature-card">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold mb-2">Empowering Content</h3>
            <p className="text-sm text-gray-600">Articles and affirmations for growth</p>
          </div>
        </div>

        <div className="space-y-4">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-primary block">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-primary block">
                Join Our Community
              </Link>
              <Link to="/login" className="btn-secondary block">
                Already a Member? Sign In
              </Link>
            </>
          )}
          <Link to="/about" className="text-bestie-purple hover:underline block mt-4">
            Learn More About BurBestie
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;