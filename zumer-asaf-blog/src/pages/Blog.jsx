import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // localStorage'dan blog yazılarını al
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      // Varsayılan verileri kullan
      const defaultPosts = [
        {
          id: 1,
          title: "Hukuk Eğitiminde İlk Adımlar",
          excerpt: "Hukuk fakültesine başladığım ilk günlerdeki deneyimlerim ve öğrendiğim dersler...",
          content: "Hukuk eğitimine başladığım ilk günlerde, bu alanın ne kadar geniş ve derin olduğunu fark ettim. Her ders yeni bir kapı açıyor ve her konu birbirine bağlanıyor. Bu yazıda, hukuk eğitiminin ilk aşamalarında karşılaştığım zorlukları ve bunları nasıl aştığımı paylaşacağım...",
          date: "2024-01-15",
          image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
          author: "Zümer Asaf"
        },
        {
          id: 2,
          title: "Kitap Okuma Alışkanlığı Nasıl Kazanılır?",
          excerpt: "Düzenli kitap okuma alışkanlığı kazanmanın yolları ve bunun hayatımıza etkileri...",
          content: "Kitap okuma alışkanlığı, hayatımızın en değerli alışkanlıklarından biridir. Bu yazıda, nasıl düzenli kitap okuma alışkanlığı kazanabileceğinizi ve bu alışkanlığın size nasıl fayda sağlayacağını anlatacağım...",
          date: "2024-01-10",
          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
          author: "Zümer Asaf"
        },
        {
          id: 3,
          title: "Hedef Belirleme ve Motivasyon",
          excerpt: "Kişisel gelişim yolculuğumda hedef belirleme stratejilerim ve motivasyon kaynaklarım...",
          content: "Hedef belirlemek, başarıya ulaşmanın en önemli adımlarından biridir. Bu yazıda, etkili hedef belirleme tekniklerini ve motivasyonu nasıl koruyabileceğinizi paylaşacağım...",
          date: "2024-01-05",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
          author: "Zümer Asaf"
        }
      ];
      setPosts(defaultPosts);
      localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 md:pt-16 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Blog Yazılarım
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hukuk eğitimim, kitap yorumlarım, düşüncelerim ve deneyimlerim hakkında yazdığım blog yazılarım
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
                >
                  Devamını Oku
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16" data-aos="fade-up">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Henüz Blog Yazısı Yok
            </h3>
            <p className="text-gray-600 mb-8">
              Yakında yeni blog yazıları eklenecek. Takipte kalın!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
