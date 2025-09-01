import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPhoto = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageFile: null,
    date: new Date().toISOString().split('T')[0]
  });
  const [imagePreview, setImagePreview] = useState('');

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
    
    // Yeni fotoğraf oluştur
    const newPhoto = {
      id: Date.now(), // Basit ID oluşturma
      ...formData,
      imageFile: null, // File objesi localStorage'a kaydedilemez
      imagePreview: imagePreview, // Base64 string olarak kaydediyoruz
    };

    // Mevcut fotoğrafları al
    const existingPhotos = JSON.parse(localStorage.getItem('gallery') || '[]');
    
    // Yeni fotoğrafı ekle
    const updatedPhotos = [newPhoto, ...existingPhotos];
    
    // localStorage'a kaydet
    localStorage.setItem('gallery', JSON.stringify(updatedPhotos));
    
    // localStorage değişikliği eventi tetikle
    window.dispatchEvent(new Event('storage'));
    
    // Başarı mesajı ve yönlendirme
    alert('Fotoğraf başarıyla eklendi!');
    navigate('/admin/gallery');
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
              <h1 className="text-2xl font-bold text-gray-900">Yeni Fotoğraf Ekle</h1>
            </div>
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
                Fotoğraf *
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Fotoğraf önizleme" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Tarih *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            {/* Önizleme */}
            {formData.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Önizleme
                </label>
                <div className="border border-gray-300 rounded-lg p-4">
                  <img
                    src={formData.image}
                    alt="Önizleme"
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden text-center text-gray-500 py-8">
                    Fotoğraf yüklenemedi
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/gallery')}
                className="btn-secondary"
              >
                İptal
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Fotoğrafı Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;

