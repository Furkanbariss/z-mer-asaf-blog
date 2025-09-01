import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    imageFile: null,
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Burada API çağrısı yapılacak
      // Şimdilik localStorage'a kaydediyoruz
      const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      const newPost = {
        id: Date.now().toString(),
        ...formData,
        imageFile: null, // File objesi localStorage'a kaydedilemez
        imagePreview: imagePreview, // Base64 string olarak kaydediyoruz
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdAt: new Date().toISOString(),
        published: true
      };
      
      posts.push(newPost);
      localStorage.setItem('blogPosts', JSON.stringify(posts));

      alert('Blog yazısı başarıyla eklendi!');
      navigate('/admin/posts');
    } catch (error) {
      console.error('Blog yazısı eklenirken hata:', error);
      alert('Blog yazısı eklenirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Yeni Blog Yazısı Ekle</h1>
            <button
              onClick={() => navigate('/admin/posts')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Geri Dön
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Başlık *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Blog yazısı başlığı"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Özet
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Blog yazısının kısa özeti"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                İçerik *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="12"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Blog yazısının içeriği"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Yazar
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yazar adı"
                />
              </div>

              <div>
                <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-2">
                  Görsel *
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
                      alt="Önizleme" 
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Etiketler
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="etiket1, etiket2, etiket3 (virgülle ayırın)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Etiketleri virgülle ayırarak yazın
              </p>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/posts')}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Ekleniyor...' : 'Blog Yazısını Ekle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
