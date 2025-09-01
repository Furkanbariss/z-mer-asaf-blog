import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
                ← Geri
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Blog Yazıları Yönetimi</h1>
            </div>
            <div className="flex items-center">
              <Link to="/admin/add-post" className="btn-primary">
                Yeni Yazı Ekle
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Henüz blog yazısı bulunmuyor.</p>
            <Link to="/admin/add-post" className="btn-primary">
              İlk Yazıyı Ekle
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Blog Yazıları ({posts.length})</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {posts.map((post) => (
                <div key={post.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.imagePreview || post.image || '/placeholder-image.jpg'}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {post.author} • {formatDate(post.date)}
                          </p>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        to={`/admin/edit-post/${post.id}`}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        title="Düzenle"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        title="Sil"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPosts;

