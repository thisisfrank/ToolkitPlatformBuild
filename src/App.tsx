import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CopyGenerator from './components/CopyGenerator';
import MoreHelp from './components/MoreHelp';

function App() {
  const [activeSection, setActiveSection] = useState('copy-generator');

  const renderContent = () => {
    switch (activeSection) {
      case 'copy-generator':
        return <CopyGenerator />;
      case 'more-help':
        return <MoreHelp />;
      default:
        return <CopyGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-shadowforce to-gray-900">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="ml-64 p-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;