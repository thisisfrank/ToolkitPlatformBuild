import React from 'react';
import { 
  Edit3,
  HelpCircle,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'copy-generator', name: 'Copy Generator', icon: Edit3 },
  { id: 'more-help', name: 'More Help', icon: HelpCircle },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700/50 text-white h-screen fixed left-0 top-0 z-10">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-supernova rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-shadowforce" />
          </div>
          <div className="ml-3">
            <h1 className="font-anton text-lg text-white">RECRUITER TOOLS</h1>
            <p className="text-xs text-supernova">Copy Generator</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 font-jakarta ${
                    activeSection === item.id
                      ? 'bg-supernova text-shadowforce font-semibold shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700/50">
        <p className="text-xs text-gray-400 font-jakarta text-center">
          Premium Recruiting Tools
        </p>
      </div>
    </div>
  );
}