import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 md:pt-16 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Hakkımda
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Merhaba! Ben Zümer Asaf. Hukuk öğrencisi, kitap tutkunu ve düşünce paylaşımına inanan biriyim.
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div data-aos="fade-right">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-64 h-64 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-8xl shadow-lg">
                👨‍⚖️
              </div>
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Zümer Asaf
              </h2>
              <p className="text-lg text-gray-600 text-center">
                Hukuk Öğrencisi & Kitap Tutkunu
              </p>
            </div>
          </div>
          
          <div data-aos="fade-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Hakkımda</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Merhaba! Ben Zümer Asaf. Hukuk fakültesinde eğitim görmekteyim ve 
                adalet sistemine olan tutkum beni bu alanda derinlemesine çalışmaya yönlendiriyor.
              </p>
              <p>
                Kitap okumayı çok seviyorum ve her kitaptan yeni bir şey öğrenmeye çalışıyorum. 
                Özellikle hukuk, felsefe ve kişisel gelişim konularındaki kitaplar benim için çok değerli.
              </p>
              <p>
                Bu blog, deneyimlerimi, düşüncelerimi ve öğrendiklerimi paylaşmak için oluşturduğum 
                bir platform. Umarım yazılarım sizlere de faydalı olur.
              </p>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-16" data-aos="fade-up">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">İlgi Alanlarım</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="text-4xl mb-4">⚖️</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Hukuk</h4>
              <p className="text-gray-600">
                Hukuk sistemleri, adalet teorileri ve pratik uygulamalar
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Kitap Okuma</h4>
              <p className="text-gray-600">
                Farklı türlerde kitaplar okumak ve analiz etmek
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="300">
              <div className="text-4xl mb-4">✍️</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Yazı Yazma</h4>
              <p className="text-gray-600">
                Düşüncelerimi ve deneyimlerimi yazıya dökmek
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="400">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Kişisel Gelişim</h4>
              <p className="text-gray-600">
                Sürekli öğrenme ve kendimi geliştirme
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="500">
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Seyahat</h4>
              <p className="text-gray-600">
                Yeni yerler keşfetmek ve farklı kültürleri tanımak
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="600">
              <div className="text-4xl mb-4">📸</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Fotoğrafçılık</h4>
              <p className="text-gray-600">
                Anları ölümsüzleştirmek ve görsel sanat
              </p>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8" data-aos="fade-up">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Hedeflerim</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Kısa Vadeli Hedefler</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Hukuk eğitimimi başarıyla tamamlamak
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Daha fazla kitap okumak ve analiz etmek
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Blog yazılarımı düzenli olarak güncellemek
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Yeni beceriler öğrenmek
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Uzun Vadeli Hedefler</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3">•</span>
                  Başarılı bir hukuk kariyeri kurmak
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3">•</span>
                  Topluma faydalı olacak projeler geliştirmek
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3">•</span>
                  Bilgi ve deneyimlerimi paylaşmaya devam etmek
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-3">•</span>
                  Sürekli öğrenen ve gelişen bir kişi olmak
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
