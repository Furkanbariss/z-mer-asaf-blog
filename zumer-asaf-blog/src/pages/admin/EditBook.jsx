import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [originalCover, setOriginalCover] = useState('');

  useEffect(() => {
    // Mevcut kitabı yükle
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const book = books.find(b => b.id.toString() === id);
    
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        coverFile: null,
        description: book.description || '',
        review: book.review || '',
        rating: book.rating || 5,
        readDate: book.readDate || new Date().toISOString().split('T')[0]
      });
      setCoverPreview(book.coverPreview || '');
      setOriginalCover(book.coverPreview || '');
    } else {
      alert('Kitap bulunamadı!');
      navigate('/admin/books');
    }
  }, [id, navigate]);

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
    
    try {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      const bookIndex = books.findIndex(b => b.id.toString() === id);
      
      if (bookIndex === -1) {
        throw new Error('Kitap bulunamadı');
      }

      const updatedBook = {
        ...books[bookIndex],
        ...formData,
        coverFile: null,
        coverPreview: coverPreview,
        rating: parseInt(formData.rating),
        updatedAt: new Date().toISOString()
      };
      
      books[bookIndex] = updatedBook;
      localStorage.setItem('books', JSON.stringify(books));
      
      alert('Kitap başarıyla güncellendi!');
      navigate('/admin/books');
    } catch (error) {
      console.error('Kitap güncellenirken hata:', error);
      alert('Kitap güncellenirken bir hata oluştu.');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Bu kitabı silmek istediğinizden emin misiniz?')) {
      try {
        const books = JSON.parse(localStorage.getItem('books') || '[]');
        const filteredBooks = books.filter(b => b.id.toString() !== id);
        localStorage.setItem('books', JSON.stringify(filteredBooks));
        
        alert('Kitap başarıyla silindi!');
        navigate('/admin/books');
      } catch (error) {
        console.error('Kitap silinirken hata:', error);
        alert('Kitap silinirken bir hata oluştu.');
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
                onClick={() => navigate('/admin/books')}
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                ← Geri
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Kitabı Düzenle</h1>
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
                Kitap Kapağı
              </label>
              <input
                type="file"
                id="coverFile"
                name="coverFile"
                accept="image/*"
                onChange={handleCoverChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {(coverPreview || originalCover) && (
                <div className="mt-2">
                  <img 
                    src={coverPreview || originalCover} 
                    alt="Kapak önizleme" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="input-field resize-none"
                placeholder="Kitap hakkında kısa açıklama yazın"
              />
            </div>

            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                Değerlendirme
              </label>
              <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChange}
                rows={6}
                className="input-field resize-none"
                placeholder="Kitap hakkında değerlendirmenizi yazın"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Puan (1-10)
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="input-field"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="readDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Okuma Tarihi
                </label>
                <input
                  type="date"
                  id="readDate"
                  name="readDate"
                  value={formData.readDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/books')}
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

export default EditBook;
