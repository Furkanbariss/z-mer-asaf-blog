import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Books from './pages/Books';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AddPost from './pages/admin/AddPost';
import EditPost from './pages/admin/EditPost';
import AdminBooks from './pages/admin/AdminBooks';
import AddBook from './pages/admin/AddBook';
import EditBook from './pages/admin/EditBook';
import AdminGallery from './pages/admin/AdminGallery';
import AddPhoto from './pages/admin/AddPhoto';
import EditPhoto from './pages/admin/EditPhoto';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/admin" replace />;
};

function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    // URL değişikliklerini dinle
    const pathname = window.location.pathname;
    setIsAdminRoute(pathname.startsWith('/admin'));
  }, []);

  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        {/* Navbar sadece admin olmayan sayfalarda göster */}
        {!isAdminRoute && <Navbar />}
        
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/books" element={<Books />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/posts" 
              element={
                <ProtectedRoute>
                  <AdminPosts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-post" 
              element={
                <ProtectedRoute>
                  <AddPost />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/edit-post/:id" 
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/books" 
              element={
                <ProtectedRoute>
                  <AdminBooks />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-book" 
              element={
                <ProtectedRoute>
                  <AddBook />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/edit-book/:id" 
              element={
                <ProtectedRoute>
                  <EditBook />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/gallery" 
              element={
                <ProtectedRoute>
                  <AdminGallery />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-photo" 
              element={
                <ProtectedRoute>
                  <AddPhoto />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/edit-photo/:id" 
              element={
                <ProtectedRoute>
                  <EditPhoto />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer sadece admin olmayan sayfalarda göster */}
        {!isAdminRoute && <Footer />}
      </div>
    </Router>
  );
}

export default App;
