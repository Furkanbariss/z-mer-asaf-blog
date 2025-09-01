import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // localStorage'dan blog yazısını al
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      const posts = JSON.parse(storedPosts);
      const foundPost = posts.find(p => p.id === parseInt(id));
      setPost(foundPost);
    } else {
      // Varsayılan verileri kullan
      const defaultPosts = [
        {
          id: 1,
          title: "Hukuk Eğitiminde İlk Adımlar",
          excerpt: "Hukuk fakültesine başladığım ilk günlerdeki deneyimlerim ve öğrendiğim dersler...",
          content: "Hukuk eğitimine başladığım ilk günlerde, bu alanın ne kadar geniş ve derin olduğunu fark ettim. Her ders yeni bir kapı açıyor ve her konu birbirine bağlanıyor. Bu yazıda, hukuk eğitiminin ilk aşamalarında karşılaştığım zorlukları ve bunları nasıl aştığımı paylaşacağım.\n\nHukuk fakültesine ilk adım attığımda, beklentilerim oldukça yüksekti. Ancak gerçeklik, beklentilerimden çok daha karmaşık ve zorlayıcıydı. İlk dönemde aldığım dersler - Anayasa Hukuku, Medeni Hukuk, Roma Hukuku - her biri kendi içinde derinlik barındırıyordu.\n\nÖzellikle Anayasa Hukuku dersinde, devlet yapısını ve temel hakları öğrenirken, bu konuların günlük hayatımızla ne kadar iç içe olduğunu fark ettim. Her haber, her olay aslında hukuki bir boyut taşıyordu.\n\nMedeni Hukuk ise, kişiler arası ilişkilerin temelini oluşturuyordu. Sözleşmeler, mülkiyet hakları, aile hukuku... Bu konular sadece teorik değil, pratik hayatta sürekli karşımıza çıkıyordu.\n\nRoma Hukuku dersi ise, hukukun temellerini anlamak için mükemmel bir başlangıç noktasıydı. Modern hukuk sistemlerinin kökenlerini öğrenmek, günümüz hukukunu daha iyi anlamamı sağladı.\n\nBu ilk dönemde öğrendiğim en önemli ders, hukukun sadece kurallar bütünü olmadığı, aynı zamanda toplumsal düzenin temel taşı olduğuydu. Her hukuk kuralının arkasında bir mantık, bir amaç vardı.\n\nGelecek dönemlerde bu temel bilgiler üzerine daha spesifik alanları inceleyeceğiz. Ceza hukuku, ticaret hukuku, idare hukuku gibi alanlar bizi bekliyor. Her biri kendi içinde derinlik barındıran bu alanları öğrenmek için sabırlı ve sistematik bir yaklaşım gerekiyor.\n\nHukuk eğitimi sadece bilgi edinmek değil, aynı zamanda analitik düşünme, problem çözme ve adalet duygusunu geliştirmek anlamına geliyor. Bu yolculukta her gün yeni bir şey öğreniyorum ve bu öğrenme sürecinin hiç bitmeyeceğini biliyorum.",
          date: "2024-01-15",
          image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
          author: "Zümer Asaf"
        },
        {
          id: 2,
          title: "Kitap Okuma Alışkanlığı Nasıl Kazanılır?",
          excerpt: "Düzenli kitap okuma alışkanlığı kazanmanın yolları ve bunun hayatımıza etkileri...",
          content: "Kitap okuma alışkanlığı, hayatımızın en değerli alışkanlıklarından biridir. Bu yazıda, nasıl düzenli kitap okuma alışkanlığı kazanabileceğinizi ve bu alışkanlığın size nasıl fayda sağlayacağını anlatacağım.\n\nKitap okuma alışkanlığı kazanmak için öncelikle doğru bir başlangıç yapmak önemlidir. İlk olarak, ilgi alanınıza uygun kitaplar seçmelisiniz. Eğer hukuk öğrencisiyseniz, hukuk kitaplarıyla başlayabilir, ancak sadece ders kitaplarıyla sınırlı kalmamalısınız.\n\nGünlük okuma rutini oluşturmak çok önemlidir. Günde en az 30 dakika kitap okumaya ayırın. Bu süreyi sabah erken saatlerde veya gece yatmadan önce yapabilirsiniz. Önemli olan tutarlılıktır.\n\nOkuma ortamınızı da düzenlemelisiniz. Rahat bir koltuk, iyi aydınlatma ve sessiz bir ortam okuma deneyiminizi iyileştirecektir. Telefonunuzu sessize alın ve dikkat dağıtıcı unsurları ortadan kaldırın.\n\nKitap okurken not almak, anlayışınızı artıracaktır. Önemli pasajları işaretleyin, kenar notları alın. Bu şekilde kitaptan daha fazla fayda sağlayacaksınız.\n\nFarklı türlerde kitaplar okumayı deneyin. Roman, biyografi, felsefe, bilim... Her tür size farklı bakış açıları kazandıracaktır. Bu çeşitlilik, düşünce dünyanızı zenginleştirecektir.\n\nKitap okuma alışkanlığının faydaları saymakla bitmez. Kelime hazneniz genişler, yazma beceriniz gelişir, analitik düşünme yeteneğiniz artar. Ayrıca, farklı kültürleri ve bakış açılarını tanıma fırsatı bulursunuz.\n\nHukuk öğrencisi olarak, kitap okuma alışkanlığımın bana sağladığı en büyük fayda, karmaşık metinleri anlama ve analiz etme yeteneğimdir. Hukuki metinler genellikle karmaşık ve yoğundur. Düzenli kitap okuma, bu tür metinleri daha kolay anlamamı sağlıyor.\n\nSon olarak, kitap okuma alışkanlığınızı başkalarıyla paylaşın. Okuduğunuz kitaplar hakkında arkadaşlarınızla tartışın, kitap kulüplerine katılın. Bu şekilde okuma deneyiminizi daha da zenginleştirebilirsiniz.\n\nKitap okuma alışkanlığı, hayatınızın en değerli yatırımlarından biridir. Bu alışkanlığı kazanmak için sabırlı olun ve kendinize zaman tanıyın. Sonuçlarını göreceksiniz.",
          date: "2024-01-10",
          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
          author: "Zümer Asaf"
        },
        {
          id: 3,
          title: "Hedef Belirleme ve Motivasyon",
          excerpt: "Kişisel gelişim yolculuğumda hedef belirleme stratejilerim ve motivasyon kaynaklarım...",
          content: "Hedef belirlemek, başarıya ulaşmanın en önemli adımlarından biridir. Bu yazıda, etkili hedef belirleme tekniklerini ve motivasyonu nasıl koruyabileceğinizi paylaşacağım.\n\nHedef belirlerken SMART prensibini kullanmak çok önemlidir. Hedefleriniz Spesifik, Ölçülebilir, Ulaşılabilir, İlgili ve Zaman sınırlı olmalıdır. Örneğin, 'Daha iyi bir öğrenci olmak' yerine 'Bu dönem tüm derslerimde en az B+ almak' gibi spesifik bir hedef belirleyin.\n\nHedeflerinizi kısa vadeli, orta vadeli ve uzun vadeli olarak kategorize edin. Kısa vadeli hedefler (günlük, haftalık) size anlık motivasyon sağlarken, uzun vadeli hedefler (yıllık) size yön verir.\n\nMotivasyonu korumak için hedeflerinizi görselleştirin. Bir hedef tahtası oluşturun, telefonunuza hatırlatıcılar koyun. Hedeflerinizi sürekli göz önünde bulundurun.\n\nİlerlemenizi takip edin. Günlük, haftalık veya aylık olarak hedeflerinize ne kadar yaklaştığınızı değerlendirin. Bu değerlendirme, hangi alanlarda iyileştirme yapmanız gerektiğini gösterecektir.\n\nHedeflerinize ulaşmak için gerekli kaynakları belirleyin. Zaman, para, bilgi, beceri... Bu kaynakları nasıl elde edeceğinizi planlayın.\n\nMotivasyonunuzu korumak için kendinizi ödüllendirin. Küçük başarılarınızı kutlayın. Bu ödüller, devam etmeniz için size güç verecektir.\n\nHedeflerinize ulaşmak için gerekli olan alışkanlıkları geliştirin. Örneğin, düzenli çalışma alışkanlığı, sağlıklı yaşam alışkanlığı gibi. Alışkanlıklar, hedeflerinize ulaşmanızın temelidir.\n\nEngellerle karşılaştığınızda pes etmeyin. Her başarılı insan, yolculuğu sırasında engellerle karşılaşmıştır. Önemli olan, bu engelleri aşmak için stratejiler geliştirmektir.\n\nHedeflerinizi başkalarıyla paylaşın. Bu şekilde hem sorumluluk hissedersiniz hem de destek alırsınız. Aileniz, arkadaşlarınız veya mentorunuz size yolculuğunuzda yardımcı olabilir.\n\nSon olarak, hedeflerinizi düzenli olarak gözden geçirin ve gerekirse güncelleyin. Hayat değişir, öncelikleriniz değişir. Hedeflerinizin de bu değişimlere uyum sağlaması gerekir.\n\nHedef belirleme ve motivasyon, kişisel gelişimin temelidir. Bu süreçte sabırlı olun ve kendinize inanın. Başarıya ulaşmak için gereken tek şey, doğru hedefler belirlemek ve bu hedeflere ulaşmak için gerekli adımları atmaktır.",
          date: "2024-01-05",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
          author: "Zümer Asaf"
        }
      ];
      const foundPost = defaultPosts.find(p => p.id === parseInt(id));
      setPost(foundPost);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center" data-aos="fade-up">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yazı yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center" data-aos="fade-up">
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Yazı Bulunamadı</h2>
          <p className="text-gray-600 mb-8">Aradığınız blog yazısı mevcut değil.</p>
          <Link 
            to="/blog" 
            className="btn-primary inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Blog'a Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 md:pt-16 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8" data-aos="fade-right">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Blog'a Dön
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden" data-aos="fade-up">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Article Meta */}
            <div className="flex items-center text-sm text-gray-500 mb-6" data-aos="fade-up" data-aos-delay="100">
              <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
              <span className="mx-2">•</span>
              <span>{post.author}</span>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-aos="fade-up" data-aos-delay="200">
              {post.title}
            </h1>

            {/* Article Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="300">
              {post.excerpt}
            </p>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none" data-aos="fade-up" data-aos-delay="400">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200" data-aos="fade-up" data-aos-delay="500">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{post.author}</p>
                    <p className="text-sm text-gray-600">Blog Yazarı</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-16" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Benzer Yazılar</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-4xl">📖</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hukuk Eğitiminde Başarı</h3>
                <p className="text-gray-600 mb-4">Hukuk fakültesinde başarılı olmanın sırları ve ipuçları...</p>
                <Link to="/blog" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                  Devamını Oku →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kişisel Gelişim Yolculuğu</h3>
                <p className="text-gray-600 mb-4">Kendini geliştirmenin yolları ve motivasyon teknikleri...</p>
                <Link to="/blog" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200">
                  Devamını Oku →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
