import React, { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Products from './components/Products';
import Templates from './components/Templates';
import EmailGenerator from './components/EmailGenerator';
import Upgrade from './components/Upgrade';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('products');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection('products');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return <Products />;
      case 'templates':
        return <Templates />;
      case 'email-generator':
        return <EmailGenerator />;
      case 'upgrade':
        return <Upgrade />;
      default:
        return <Products />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-shadowforce to-gray-900">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />
      <main className="ml-64 p-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;