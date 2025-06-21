import React from 'react';
import { mockTemplates } from '../data/mockData';
import { ExternalLink, Calendar, FileText, Database, Calculator, Grid } from 'lucide-react';

const typeIcons = {
  notion: FileText,
  clay: Database,
  calculator: Calculator,
  spreadsheet: Grid,
};

const typeColors = {
  notion: 'bg-gray-800 text-white border-gray-600',
  clay: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
  calculator: 'bg-green-600/20 text-green-400 border-green-500/30',
  spreadsheet: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
};

export default function Templates() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-anton text-4xl text-white mb-3">TEMPLATES & TOOLS</h1>
        <p className="font-jakarta text-gray-400 text-lg">
          Ready-to-use Notion templates, Clay tables, calculators, and productivity tools
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockTemplates.map((template) => {
          const IconComponent = typeIcons[template.type];
          
          return (
            <div key={template.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-supernova/50 transition-all duration-300 hover:shadow-lg hover:shadow-supernova/10">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 border ${typeColors[template.type]}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-jakarta font-bold text-lg text-white mb-2">{template.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${typeColors[template.type]}`}>
                      {template.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-400 font-jakarta text-sm mb-8">
                  {template.description}
                </p>
                
                {/* Last Used */}
                {template.lastUsed && (
                  <div className="flex items-center text-sm text-gray-400 font-jakarta mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last used: {new Date(template.lastUsed).toLocaleDateString()}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-supernova hover:bg-yellow-400 text-shadowforce font-jakarta font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Template
                  </button>
                  <button className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white font-jakarta font-bold py-3 px-4 rounded-lg transition-colors">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Request Template CTA */}
      <div className="text-center py-12">
        <h2 className="font-anton text-2xl text-white mb-3">Need a Custom Template?</h2>
        <p className="font-jakarta text-gray-400 mb-8 text-lg">
          Let us know what tools or templates would help accelerate your recruiting process
        </p>
        <button className="bg-supernova hover:bg-yellow-400 text-shadowforce font-jakarta font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
          Request Custom Template
        </button>
      </div>
    </div>
  );
}