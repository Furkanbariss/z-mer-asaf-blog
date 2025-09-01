import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 md:pt-24 pt-32">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Zümer Asaf
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-gray-700 mb-8">
              Hukuk Öğrencisi & Kitap Tutkunu
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Hukuk eğitimim, okuduğum kitaplar, düşüncelerim ve hayatımdan karelerle 
              dolu bu blogda sizlerle buluşuyorum. Bilgi, deneyim ve düşüncelerimi paylaşmaktan mutluluk duyuyorum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/blog" 
                className="btn-primary text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                data-aos="fade-up" 
                data-aos-delay="200"
              >
                Blog Yazılarım
              </Link>
              <Link 
                to="/about" 
                className="btn-secondary text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                data-aos="fade-up" 
                data-aos-delay="400"
              >
                Hakkımda
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Blog Yazısı</div>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Okunan Kitap</div>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">3+</div>
              <div className="text-gray-600">Yıllık Deneyim</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Blog Kategorileri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Farklı konularda yazdığım blog yazılarımı kategorilere ayırarak kolayca bulabilirsiniz
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                  📚
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Kitap Yorumları</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Okuduğum kitaplar hakkında detaylı analizler, yorumlarım ve önemli notlarım. 
                  Her kitaptan aldığım dersleri ve düşüncelerimi paylaşıyorum.
                </p>
                <Link 
                  to="/books" 
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
                >
                  Kitapları Görüntüle
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div 
              className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                  ⚖️
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hukuk Deneyimleri</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Hukuk eğitimim sırasında edindiğim deneyimler, gözlemlerim ve 
                  öğrendiğim dersler. Pratik bilgiler ve teorik analizler.
                </p>
                <Link 
                  to="/blog" 
                  className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200"
                >
                  Yazıları Oku
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div 
              className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              data-aos="fade-up" 
              data-aos-delay="300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                  📝
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Kişisel Yazılar</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Hayat, düşünceler ve günlük deneyimlerim hakkında samimi yazılarım. 
                  Kişisel gelişim ve düşünce süreçlerimi paylaşıyorum.
                </p>
                <Link 
                  to="/blog" 
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200"
                >
                  Yazıları Keşfet
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Son Yazılarım
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En son yayınladığım blog yazılarımdan birkaçını burada bulabilirsiniz
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-6xl">📖</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hukuk Eğitiminde İlk Adımlar</h3>
                <p className="text-gray-600 mb-4">Hukuk fakültesine başladığım ilk günlerdeki deneyimlerim ve öğrendiğim dersler...</p>
                <Link to="/blog" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                  Devamını Oku →
                </Link>
              </div>
            </div>
            
            <div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">🎯</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hedef Belirleme ve Motivasyon</h3>
                <p className="text-gray-600 mb-4">Kişisel gelişim yolculuğumda hedef belirleme stratejilerim ve motivasyon kaynaklarım...</p>
                <Link to="/blog" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200">
                  Devamını Oku →
                </Link>
              </div>
            </div>
            
            <div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              data-aos="fade-up" 
              data-aos-delay="300"
            >
              <div className="h-48 bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                <span className="text-6xl">📚</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bu Ay Okuduğum Kitaplar</h3>
                <p className="text-gray-600 mb-4">Bu ay okuduğum kitapların kısa özetleri ve benim üzerimdeki etkileri...</p>
                <Link to="/books" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200">
                  Kitapları Görüntüle →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
            <Link 
              to="/blog" 
              className="btn-primary text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Tüm Yazıları Görüntüle
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            İletişime Geçin
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sorularınız, önerileriniz veya sadece merhaba demek için benimle iletişime geçebilirsiniz.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Mesaj Gönder
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
