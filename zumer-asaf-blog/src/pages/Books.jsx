import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // localStorage'dan kitapları al
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      // Varsayılan verileri kullan
      const defaultBooks = [
        {
          id: 1,
          title: "Suç ve Ceza",
          author: "Fyodor Dostoyevski",
          cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
          description: "Psikolojik gerilim türünün en önemli eserlerinden biri. İnsan psikolojisinin derinliklerine inen bir başyapıt.",
          review: "Bu kitap, insan psikolojisinin en karanlık köşelerini aydınlatıyor. Raskolnikov'un iç çatışmaları ve vicdani sorgulamaları, okuyucuyu derinden etkiliyor. Hukuk öğrencisi olarak, suç ve ceza kavramlarının psikolojik boyutunu anlamak için mükemmel bir eser.",
          rating: 5,
          readDate: "2024-01-20"
        },
        {
          id: 2,
          title: "1984",
          author: "George Orwell",
          cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&h=400&fit=crop",
          description: "Distopik bir gelecek tasarımı. Totaliter rejimlerin tehlikelerini gösteren uyarı niteliğinde bir eser.",
          review: "Orwell'in vizyonu, günümüzde bile geçerliliğini koruyor. Büyük Birader kavramı ve düşünce polisi, bireysel özgürlüklerin ne kadar değerli olduğunu hatırlatıyor. Hukuk ve özgürlük kavramlarını düşünmek için ideal bir kitap.",
          rating: 4,
          readDate: "2024-01-15"
        },
        {
          id: 3,
          title: "Küçük Prens",
          author: "Antoine de Saint-Exupéry",
          cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
          description: "Çocuklar için yazılmış ama her yaştan okuyucuya hitap eden felsefi bir masal.",
          review: "Bu kitap, hayatın anlamını ve insan ilişkilerinin önemini çok güzel anlatıyor. Küçük Prens'in gezegenler arası yolculuğu, aslında insanın kendi iç dünyasında yaptığı bir yolculuk. Her okuduğumda farklı anlamlar çıkarıyorum.",
          rating: 5,
          readDate: "2024-01-10"
        }
      ];
      setBooks(defaultBooks);
      localStorage.setItem('books', JSON.stringify(defaultBooks));
    }
  }, []);

  const toggleReview = (bookId) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 md:pt-16 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Kitaplığım
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Okuduğum kitaplar, yorumlarım ve öğrendiğim dersler. Her kitap hayatıma yeni bir pencere açıyor.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div 
              key={book.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
                  {renderStars(book.rating)}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {book.title}
                </h2>
                
                <p className="text-gray-600 mb-3">
                  <span className="font-semibold">Yazar:</span> {book.author}
                </p>
                
                <p className="text-sm text-gray-500 mb-4">
                  Okuma Tarihi: {new Date(book.readDate).toLocaleDateString('tr-TR')}
                </p>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {book.description}
                </p>
                
                <button
                  onClick={() => toggleReview(book.id)}
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 flex items-center"
                >
                  {expandedBook === book.id ? 'Yorumu Gizle' : 'Yorumumu Oku'}
                  <svg 
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${expandedBook === book.id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedBook === book.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg" data-aos="fade-up">
                    <h4 className="font-semibold text-gray-900 mb-2">Yorumum:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {book.review}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {books.length === 0 && (
          <div className="text-center py-16" data-aos="fade-up">
            <div className="text-6xl mb-6">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Henüz Kitap Eklenmemiş
            </h3>
            <p className="text-gray-600 mb-8">
              Yakında okuduğum kitapları ve yorumlarımı burada paylaşacağım!
            </p>
          </div>
        )}

        {/* Reading Stats */}
        {books.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8" data-aos="fade-up">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Okuma İstatistiklerim
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{books.length}</div>
                <div className="text-gray-600">Toplam Kitap</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {(books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1)}
                </div>
                <div className="text-gray-600">Ortalama Puan</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {books.filter(book => book.rating >= 4).length}
                </div>
                <div className="text-gray-600">Yüksek Puanlı Kitap</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
