import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [originalImage, setOriginalImage] = useState('');

  useEffect(() => {
    // Mevcut blog yazısını yükle
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const post = posts.find(p => p.id === id);
    
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        author: post.author || '',
        imageFile: null,
        tags: post.tags ? post.tags.join(', ') : ''
      });
      setImagePreview(post.imagePreview || '');
      setOriginalImage(post.imagePreview || '');
    } else {
      alert('Blog yazısı bulunamadı!');
      navigate('/admin/posts');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      const postIndex = posts.findIndex(p => p.id === id);
      
      if (postIndex === -1) {
        throw new Error('Blog yazısı bulunamadı');
      }

      const updatedPost = {
        ...posts[postIndex],
        ...formData,
        imageFile: null,
        imagePreview: imagePreview,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        updatedAt: new Date().toISOString()
      };
      
      posts[postIndex] = updatedPost;
      localStorage.setItem('blogPosts', JSON.stringify(posts));

      alert('Blog yazısı başarıyla güncellendi!');
      navigate('/admin/posts');
    } catch (error) {
      console.error('Blog yazısı güncellenirken hata:', error);
      alert('Blog yazısı güncellenirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      try {
        const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        const filteredPosts = posts.filter(p => p.id !== id);
        localStorage.setItem('blogPosts', JSON.stringify(filteredPosts));
        
        alert('Blog yazısı başarıyla silindi!');
        navigate('/admin/posts');
      } catch (error) {
        console.error('Blog yazısı silinirken hata:', error);
        alert('Blog yazısı silinirken bir hata oluştu.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Blog Yazısını Düzenle</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate('/admin/posts')}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Geri Dön
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sil
              </button>
            </div>
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
                  Görsel
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
                      alt="Görsel önizleme" 
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
                {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
