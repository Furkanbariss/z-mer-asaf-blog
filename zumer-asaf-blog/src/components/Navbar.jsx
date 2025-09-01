import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Anasayfa', icon: '🏠' },
    { path: '/about', label: 'Hakkımda', icon: '👤' },
    { path: '/blog', label: 'Blog', icon: '📝' },
    { path: '/books', label: 'Kitaplığım', icon: '📚' },
    { path: '/gallery', label: 'Galeri', icon: '🖼️' },
    { path: '/contact', label: 'İletişim', icon: '📧' }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-primary-600">Zümer Asaf Blog</h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="bg-white shadow-lg rounded-lg p-3 text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={closeSidebar}
        ></div>
        
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link to="/" onClick={closeSidebar} className="flex items-center">
                <h1 className="text-xl font-bold text-primary-600">Zümer Asaf Blog</h1>
              </Link>
              <button
                onClick={closeSidebar}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                © 2024 Zümer Asaf Blog
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

