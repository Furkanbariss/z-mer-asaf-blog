import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverFile: null,
    description: '',
    review: '',
    rating: 5,
    readDate: new Date().toISOString().split('T')[0]
  });
  const [coverPreview, setCoverPreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverFile: file
      }));
      
      // Görsel önizleme
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Yeni kitap oluştur
    const newBook = {
      id: Date.now(), // Basit ID oluşturma
      ...formData,
      coverFile: null, // File objesi localStorage'a kaydedilemez
      coverPreview: coverPreview, // Base64 string olarak kaydediyoruz
      rating: parseInt(formData.rating)
    };

    // Mevcut kitapları al
    const existingBooks = JSON.parse(localStorage.getItem('books') || '[]');
    
    // Yeni kitabı ekle
    const updatedBooks = [newBook, ...existingBooks];
    
    // localStorage'a kaydet
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    
    // Başarı mesajı ve yönlendirme
    alert('Kitap başarıyla eklendi!');
    navigate('/admin/books');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/books')}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                ← Geri
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Yeni Kitap Ekle</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Kitap Adı *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Kitabın adını girin"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Yazar *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Yazarın adını girin"
                />
              </div>
            </div>

            <div>
              <label htmlFor="coverFile" className="block text-sm font-medium text-gray-700 mb-2">
                Kitap Kapağı *
              </label>
              <input
                type="file"
                id="coverFile"
                name="coverFile"
                accept="image/*"
                onChange={handleCoverChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {coverPreview && (
                <div className="mt-2">
                  <img 
                    src={coverPreview} 
                    alt="Kapak önizleme" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Kitap Açıklaması *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="input-field resize-none"
                placeholder="Kitabın kısa açıklamasını girin"
              />
            </div>

            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                Kitap Yorumu
              </label>
              <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChange}
                rows={4}
                className="input-field resize-none"
                placeholder="Kitap hakkındaki yorumunuzu yazın"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Puan (1-5) *
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="1">1 Yıldız</option>
                  <option value="2">2 Yıldız</option>
                  <option value="3">3 Yıldız</option>
                  <option value="4">4 Yıldız</option>
                  <option value="5">5 Yıldız</option>
                </select>
              </div>

              <div>
                <label htmlFor="readDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Okuma Tarihi *
                </label>
                <input
                  type="date"
                  id="readDate"
                  name="readDate"
                  value={formData.readDate}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/books')}
                className="btn-secondary"
              >
                İptal
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Kitabı Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

