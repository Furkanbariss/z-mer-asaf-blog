import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    const savedPhotos = localStorage.getItem('gallery');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) {
      const updatedPhotos = photos.filter(photo => photo.id !== id);
      setPhotos(updatedPhotos);
      localStorage.setItem('gallery', JSON.stringify(updatedPhotos));
      
      // localStorage değişikliği eventi tetikle
      window.dispatchEvent(new Event('storage'));
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
              <h1 className="text-2xl font-bold text-gray-900">Galeri Yönetimi</h1>
            </div>
            <div className="flex items-center">
              <Link to="/admin/add-photo" className="btn-primary">
                Yeni Fotoğraf Ekle
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {photos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Henüz fotoğraf bulunmuyor.</p>
            <Link to="/admin/add-photo" className="btn-primary">
              İlk Fotoğrafı Ekle
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Fotoğraflar ({photos.length})</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={photo.imagePreview || photo.image || '/placeholder-image.jpg'}
                      alt={photo.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Link
                        to={`/admin/edit-photo/${photo.id}`}
                        className="bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition-colors duration-200"
                        title="Düzenle"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors duration-200"
                        title="Sil"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {photo.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(photo.date)}
                    </p>
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

export default AdminGallery;

