import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPhoto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageFile: null,
    date: new Date().toISOString().split('T')[0]
  });
  const [imagePreview, setImagePreview] = useState('');
  const [originalImage, setOriginalImage] = useState('');

  useEffect(() => {
    // Mevcut fotoğrafı yükle
    const photos = JSON.parse(localStorage.getItem('gallery') || '[]');
    const photo = photos.find(p => p.id.toString() === id);
    
    if (photo) {
      setFormData({
        title: photo.title || '',
        description: photo.description || '',
        imageFile: null,
        date: photo.date || new Date().toISOString().split('T')[0]
      });
      setImagePreview(photo.imagePreview || '');
      setOriginalImage(photo.imagePreview || '');
    } else {
      alert('Fotoğraf bulunamadı!');
      navigate('/admin/gallery');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));
      
      // Görsel önizleme
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const photos = JSON.parse(localStorage.getItem('gallery') || '[]');
      const photoIndex = photos.findIndex(p => p.id.toString() === id);
      
      if (photoIndex === -1) {
        throw new Error('Fotoğraf bulunamadı');
      }

      const updatedPhoto = {
        ...photos[photoIndex],
        ...formData,
        imageFile: null,
        imagePreview: imagePreview,
        updatedAt: new Date().toISOString()
      };
      
      photos[photoIndex] = updatedPhoto;
      localStorage.setItem('gallery', JSON.stringify(photos));
      
      // localStorage değişikliği eventi tetikle
      window.dispatchEvent(new Event('storage'));
      
      alert('Fotoğraf başarıyla güncellendi!');
      navigate('/admin/gallery');
    } catch (error) {
      console.error('Fotoğraf güncellenirken hata:', error);
      alert('Fotoğraf güncellenirken bir hata oluştu.');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) {
      try {
        const photos = JSON.parse(localStorage.getItem('gallery') || '[]');
        const filteredPhotos = photos.filter(p => p.id.toString() !== id);
        localStorage.setItem('gallery', JSON.stringify(filteredPhotos));
        
        alert('Fotoğraf başarıyla silindi!');
        navigate('/admin/gallery');
      } catch (error) {
        console.error('Fotoğraf silinirken hata:', error);
        alert('Fotoğraf silinirken bir hata oluştu.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/gallery')}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                ← Geri
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Fotoğrafı Düzenle</h1>
            </div>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sil
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Fotoğraf Başlığı *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Fotoğrafın başlığını girin"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="input-field resize-none"
                placeholder="Fotoğraf hakkında kısa açıklama yazın"
              />
            </div>

            <div>
              <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-2">
                Fotoğraf
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {(imagePreview || originalImage) && (
                <div className="mt-2">
                  <img 
                    src={imagePreview || originalImage} 
                    alt="Fotoğraf önizleme" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Tarih
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/gallery')}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Güncelle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPhoto;
