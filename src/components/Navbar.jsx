import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/Notion-logo.svg.png";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleAuthClick = (login) => {
    setIsLogin(login);
    setShowAuthModal(true);
    setMobileDrawerOpen(false);
  };

  const closeModal = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 bg-white">
        <div className="container px-4 mx-auto relative lg:text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
              <span className="text-xl tracking-tight font-semibold">Notion</span>
            </div>
            <ul className="hidden lg:flex ml-14 space-x-12">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="hover:text-blue-500 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden lg:flex justify-center space-x-4 items-center">
              <button 
                onClick={() => handleAuthClick(true)}
                className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Se connecter
              </button>
              <button
                onClick={() => handleAuthClick(false)}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-blue-700 transition-colors"
              >
                S'inscrire
              </button>
            </div>
            <div className="lg:hidden md:flex flex-col justify-end">
              <button 
                onClick={toggleNavbar}
                className="p-2 focus:outline-none"
              >
                {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-white w-full p-8 shadow-lg lg:hidden">
              <ul className="space-y-6">
                {navItems.map((item, index) => (
                  <li key={index} className="py-2">
                    <a href={item.href} className="text-lg hover:text-blue-500">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col space-y-4 mt-8">
                <button 
                  onClick={() => handleAuthClick(true)}
                  className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Se connecter
                </button>
                <button
                  onClick={() => handleAuthClick(false)}
                  className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-md hover:from-blue-500 hover:to-blue-700"
                >
                  S'inscrire
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {isLogin ? "Welcome back" : "Get started"}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="nom@exemple.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mot de passe</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-blue-700 transition-colors"
              >
                {isLogin ? "Se connecter" : "S'inscrire"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm">
              {isLogin ? (
                <p>
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="text-blue-500 hover:underline"
                  >
                    S'inscrire
                  </button>
                </p>
              ) : (
                <p>
                  Vous avez déjà un compte?{" "}
                  <button 
                    onClick={() => setIsLogin(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Se connecter
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;