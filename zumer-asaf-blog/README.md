# Zümer Asaf Blog

Modern ve responsive bir blog sitesi. Hukuk öğrencisi Zümer Asaf'ın kişisel blogu olarak tasarlanmıştır.

## 🚀 Özellikler

### Kullanıcı Tarafı (Frontend)
- **Anasayfa**: Hoş geldin mesajı ve site genel bakışı
- **Hakkımda**: Zümer Asaf'ın kişisel bilgileri ve ilgi alanları
- **Blog**: Blog yazılarının listesi ve detay sayfaları
- **Kitaplığım**: Okunan kitapların listesi ve yorumları
- **Galeri**: Fotoğraf albümü (modal ile büyütme özelliği)
- **İletişim**: İletişim formu ve bilgileri

### Admin Paneli
- **Giriş Sistemi**: Güvenli admin girişi (admin/1234)
- **Dashboard**: İstatistikler ve hızlı erişim
- **Blog Yönetimi**: Yazı ekleme, silme ve listeleme
- **Kitap Yönetimi**: Kitap ekleme, silme ve listeleme
- **Galeri Yönetimi**: Fotoğraf ekleme, silme ve listeleme

## 🛠️ Teknolojiler

- **Frontend**: React 19, Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **State Management**: React Hooks + localStorage
- **UI Components**: Headless UI, Heroicons

## 📁 Proje Yapısı

```
zumer-asaf-blog/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigasyon çubuğu
│   │   └── Footer.jsx          # Alt bilgi
│   ├── pages/
│   │   ├── Home.jsx            # Anasayfa
│   │   ├── About.jsx           # Hakkımda
│   │   ├── Blog.jsx            # Blog listesi
│   │   ├── BlogDetail.jsx      # Blog detay
│   │   ├── Books.jsx           # Kitaplar
│   │   ├── Gallery.jsx         # Galeri
│   │   ├── Contact.jsx         # İletişim
│   │   └── admin/
│   │       ├── AdminLogin.jsx      # Admin giriş
│   │       ├── AdminDashboard.jsx  # Admin panel
│   │       ├── AdminPosts.jsx      # Blog yönetimi
│   │       ├── AddPost.jsx         # Yazı ekleme
│   │       ├── AdminBooks.jsx      # Kitap yönetimi
│   │       ├── AddBook.jsx         # Kitap ekleme
│   │       ├── AdminGallery.jsx    # Galeri yönetimi
│   │       └── AddPhoto.jsx        # Fotoğraf ekleme
│   ├── data/
│   │   ├── posts.js            # Blog yazıları verisi
│   │   ├── books.js            # Kitaplar verisi
│   │   └── gallery.js          # Galeri verisi
│   ├── App.jsx                 # Ana uygulama
│   └── main.jsx                # Giriş noktası
├── tailwind.config.js          # TailwindCSS konfigürasyonu
├── postcss.config.js           # PostCSS konfigürasyonu
└── package.json                # Bağımlılıklar
```

## 🚀 Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleme
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatma
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

### 4. Build Önizleme
```bash
npm run preview
```

## 📱 Kullanım

### Kullanıcı Tarafı
1. Ana sayfa: `http://localhost:5173/`
2. Blog: `http://localhost:5173/blog`
3. Kitaplar: `http://localhost:5173/books`
4. Galeri: `http://localhost:5173/gallery`
5. İletişim: `http://localhost:5173/contact`

### Admin Paneli
1. Admin giriş: `http://localhost:5173/admin`
2. Kullanıcı adı: `admin`
3. Şifre: `1234`

## 🎨 Tasarım Özellikleri

- **Responsive Design**: Mobil, tablet ve masaüstü uyumlu
- **Modern UI**: TailwindCSS ile temiz ve modern tasarım
- **Smooth Transitions**: Hover efektleri ve geçişler
- **Accessibility**: Erişilebilirlik standartlarına uygun
- **Dark/Light Mode Ready**: Gelecekte tema desteği için hazır

## 💾 Veri Yönetimi

- **localStorage**: Tüm veriler tarayıcı localStorage'da saklanır
- **CRUD Operations**: Oluşturma, okuma, güncelleme, silme işlemleri
- **Data Persistence**: Sayfa yenilemelerinde veri korunur

## 🔒 Güvenlik

- **Admin Authentication**: Basit kullanıcı adı/şifre doğrulaması
- **Protected Routes**: Admin sayfaları korumalı
- **Input Validation**: Form doğrulamaları

## 🚀 Gelecek Özellikler

- [ ] Backend API entegrasyonu
- [ ] Kullanıcı kayıt sistemi
- [ ] Yorum sistemi
- [ ] Arama özelliği
- [ ] Kategoriler ve etiketler
- [ ] SEO optimizasyonu
- [ ] PWA desteği
- [ ] Dark mode
- [ ] Çoklu dil desteği

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Zümer Asaf** - Hukuk öğrencisi ve yazılım geliştiricisi

---

**Not**: Bu proje eğitim amaçlı geliştirilmiştir. Gerçek kullanım için güvenlik önlemleri artırılmalıdır.
