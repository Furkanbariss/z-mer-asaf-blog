import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // localStorage'dan fotoğrafları al
    const storedPhotos = localStorage.getItem('gallery');
    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos));
    }
    
    // localStorage değişikliklerini dinle
    const handleStorageChange = () => {
      const updatedPhotos = localStorage.getItem('gallery');
      if (updatedPhotos) {
        setPhotos(JSON.parse(updatedPhotos));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 md:pt-16 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Galeri
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hayatımdan kareler, anılarım ve güzel anlar. Her fotoğraf bir hikaye anlatıyor.
          </p>
        </div>

        {/* Photos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openModal(photo)}
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={photo.imagePreview || photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-bold mb-1">{photo.title}</h3>
                  <p className="text-sm opacity-90">{photo.description}</p>
                  <p className="text-xs opacity-75 mt-2">
                    {new Date(photo.date).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                
                {/* Click Indicator */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {photos.length === 0 && (
          <div className="text-center py-16" data-aos="fade-up">
            <div className="text-6xl mb-6">📸</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Henüz Fotoğraf Eklenmemiş
            </h3>
            <p className="text-gray-600 mb-8">
              Yakında hayatımdan güzel kareleri burada paylaşacağım!
            </p>
          </div>
        )}

        {/* Photo Stats */}
        {photos.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8" data-aos="fade-up">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Galeri İstatistikleri
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{photos.length}</div>
                <div className="text-gray-600">Toplam Fotoğraf</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {new Date(Math.max(...photos.map(p => new Date(p.date)))).getFullYear()}
                </div>
                <div className="text-gray-600">En Yeni Tarih</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {new Date(Math.min(...photos.map(p => new Date(p.date)))).getFullYear()}
                </div>
                <div className="text-gray-600">En Eski Tarih</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-full overflow-hidden rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img
              src={selectedPhoto.imagePreview || selectedPhoto.image}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPhoto.title}</h3>
              <p className="text-gray-600 mb-3">{selectedPhoto.description}</p>
              <p className="text-sm text-gray-500">
                Tarih: {new Date(selectedPhoto.date).toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
