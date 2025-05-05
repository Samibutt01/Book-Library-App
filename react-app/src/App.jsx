import { Link, Outlet, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || (path !== '/' && location.pathname.includes(path));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-orange-600 dark:text-orange-400" data-slot="icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"></path>
                </svg>
                <span className="ml-2 self-center text-2xl font-semibold whitespace-nowrap">
                  <span className="text-orange-600 dark:text-orange-400">Book</span>
                  <span className="text-green-600 dark:text-green-400">Library</span>
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  to={'/'} 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/') 
                      ? 'bg-orange-100 text-orange-700 dark:bg-gray-700 dark:text-orange-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to={'books'} 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('books') 
                      ? 'bg-orange-100 text-orange-700 dark:bg-gray-700 dark:text-orange-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Books
                </Link>
                <Link 
                  to={'authors'} 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('authors') 
                      ? 'bg-orange-100 text-orange-700 dark:bg-gray-700 dark:text-orange-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Authors
                </Link>
                <Link 
                  to={'about'} 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('about') 
                      ? 'bg-orange-100 text-orange-700 dark:bg-gray-700 dark:text-orange-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu" 
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to={'/'} 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-orange-100 text-orange-700 dark:bg-gray-700 dark:text-orange-400' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to={'books'} 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('books') 
                  ? 'bg-orange-100 text-orange-700 dark:bg-gray-700 dark:text-orange-400' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Books
            </Link>
            <Link 
              to={'authors'} 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('authors') 
                  ? 'bg-orange-100 text-orange-700 dark:bg-gray-700 dark:text-orange-400' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Authors
            </Link>
            <Link 
              to={'about'} 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('about') 
                  ? 'bg-orange-100 text-orange-700 dark:bg-gray-700 dark:text-orange-400' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              About Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <svg className="h-6 w-6 text-orange-600 dark:text-orange-400" data-slot="icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"></path>
              </svg>
              <span className="ml-2 text-lg font-semibold">
                <span className="text-orange-600 dark:text-orange-400">Book</span>
                <span className="text-green-600 dark:text-green-400">Library</span>
              </span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} BookLibrary. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link 
                to={'about'} 
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                About Us
              </Link>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
