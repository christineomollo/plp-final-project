import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { contentAPI } from '../services/api';
import { Heart, BookOpen, MessageCircle, RefreshCw, Share2, Loader2, Filter } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [affirmation, setAffirmation] = useState(null);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [affirmationLoading, setAffirmationLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardData();
  }, [selectedCategory]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch affirmation
      const affirmationData = await contentAPI.getAffirmation();
      setAffirmation(affirmationData.affirmation);

      // Fetch articles
      const articlesData = await contentAPI.getArticles(selectedCategory, 1, 9);
      setArticles(articlesData.articles);

      // Fetch categories
      const categoriesData = await contentAPI.getCategories();
      setCategories(categoriesData.categories);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAffirmation = async () => {
    try {
      setAffirmationLoading(true);
      const data = await contentAPI.getAffirmation();
      setAffirmation(data.affirmation);
    } catch (error) {
      console.error('Error refreshing affirmation:', error);
    } finally {
      setAffirmationLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'menstrual-health': 'bg-pink-100 text-pink-700',
      'exercise': 'bg-purple-100 text-purple-700',
      'nutrition': 'bg-green-100 text-green-700',
      'mental-health': 'bg-blue-100 text-blue-700',
      'wellness': 'bg-bestie-lavender text-bestie-purple',
      'self-love': 'bg-rose-100 text-rose-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
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
              <Link to="/community" className="text-gray-700 hover:text-bestie-purple">Community</Link>
              <Link to="/profile" className="text-gray-700 hover:text-bestie-purple">Profile</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.username}</span>! 💖
          </h1>
          <p className="text-gray-600">Here's your daily dose of wellness and inspiration</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-bestie-purple" size={48} />
          </div>
        ) : (
          <>
            {/* Daily Affirmation Card */}
            <div className="card mb-8 bg-gradient-to-br from-bestie-pink to-bestie-purple text-white animate-fadeIn">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Heart size={32} fill="white" />
                  <h2 className="text-2xl font-bold">Daily Affirmation</h2>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={refreshAffirmation}
                    disabled={affirmationLoading}
                    className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                  >
                    <RefreshCw size={20} className={affirmationLoading ? 'animate-spin' : ''} />
                  </button>
                  <button className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              {affirmation && (
                <>
                  <p className="text-xl md:text-2xl font-medium mb-4 leading-relaxed">
                    "{affirmation.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="badge bg-white bg-opacity-20 text-gray-800">
                      {affirmation.category?.replace('-', ' ')}
                    </span>
                    <span className="text-sm opacity-75">{affirmation.date}</span>
                  </div>
                </>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6 flex items-center gap-4 overflow-x-auto pb-2">
              <Filter size={20} className="text-gray-600 flex-shrink-0" />
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === '' 
                    ? 'bg-bestie-purple text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Articles
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.value 
                      ? 'bg-bestie-purple text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Wellness <span className="gradient-text">Articles</span>
              </h2>
              
              {articles.length === 0 ? (
                <div className="card text-center py-12">
                  <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No articles found in this category.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <div
                      key={article._id}
                      className="card hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <div className="flex items-center justify-between mb-3">
                        <span className={`badge ${getCategoryColor(article.category)}`}>
                          {article.category.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-gray-500">{article.readTime} min read</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
                      <button className="mt-4 text-bestie-purple font-semibold hover:underline">
                        Read More →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Link to="/community" className="card bg-gradient-to-br from-bestie-purple to-bestie-lilac text-gray-800 hover:scale-105 transition-transform">
                <MessageCircle size={32} className="mb-3" />
                <h3 className="text-2xl font-bold mb-2">Community Chat</h3>
                <p className="opacity-90">Connect with fellow Besties and share your journey</p>
              </Link>

              <div className="card bg-gradient-to-br from-bestie-peach to-bestie-rose text-gray-800 hover:scale-105 transition-transform">
                <Heart size={32} className="mb-3" />
                <h3 className="text-2xl font-bold mb-2">Self-Care Tips</h3>
                <p className="opacity-90">Explore personalized wellness recommendations</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="modal-content max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="text-2xl font-bold">{selectedArticle.title}</h2>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="flex items-center gap-4 mb-6">
                <span className={`badge ${getCategoryColor(selectedArticle.category)}`}>
                  {selectedArticle.category.replace('-', ' ')}
                </span>
                <span className="text-sm text-gray-500">{selectedArticle.readTime} min read</span>
              </div>
              <div className="prose max-w-none">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="btn-secondary"
              >
                Close
              </button>
              <button className="btn-primary">
                <Share2 size={16} className="inline mr-2" />
                Share Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;