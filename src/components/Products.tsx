import React, { useState } from 'react';
import { mockProducts, mockUser } from '../data/mockData';
import { Download, FileText, BookOpen, Wrench, GraduationCap, CheckCircle, AlertCircle, Grid, List } from 'lucide-react';

const categoryIcons = {
  guide: BookOpen,
  template: FileText,
  course: GraduationCap,
  tool: Wrench,
};

const categoryColors = {
  guide: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  template: 'bg-green-500/20 text-green-400 border-green-500/30',
  course: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  tool: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export default function Products() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleDownload = async (productId: string) => {
    setDownloadingId(productId);
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  const handleUpdate = async (productId: string) => {
    setUpdatingId(productId);
    setTimeout(() => {
      setUpdatingId(null);
    }, 1500);
  };

  const ProductCard = ({ product, isHorizontal = false }: { product: any, isHorizontal?: boolean }) => {
    const IconComponent = categoryIcons[product.category];
    const isDownloading = downloadingId === product.id;
    const isUpdating = updatingId === product.id;
    const needsUpdate = product.isNew;

    if (isHorizontal) {
      return (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-supernova/50 transition-all duration-300 hover:shadow-lg hover:shadow-supernova/10">
          <div className="p-8 flex items-center space-x-8">
            {/* Icon */}
            <div className="w-16 h-16 bg-supernova/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-8 h-8 text-supernova" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-jakarta font-bold text-xl text-white mb-3">{product.name}</h3>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[product.category]}`}>
                      {product.category.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-400 font-jakarta">
                      <span>Version {product.version}</span>
                      {product.lastDownloaded && (
                        <>
                          <span>•</span>
                          <span>Last downloaded: {new Date(product.lastDownloaded).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Version Status */}
                <div className="flex flex-col items-end">
                  {needsUpdate ? (
                    <div className="flex items-center text-green-400">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span className="text-xs font-semibold font-jakarta">NEW VERSION AVAILABLE</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-xs font-semibold font-jakarta">UP TO DATE</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              {needsUpdate ? (
                <button
                  onClick={() => handleUpdate(product.id)}
                  disabled={isUpdating}
                  className="bg-green-500 hover:bg-green-600 text-white font-jakarta font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center"
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 mr-2" />
                      New version available
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleDownload(product.id)}
                  disabled={isDownloading}
                  className="bg-supernova hover:bg-yellow-400 text-shadowforce font-jakarta font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-shadowforce mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Vertical Card Layout
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-supernova/50 transition-all duration-300 hover:shadow-lg hover:shadow-supernova/10">
        {/* Product Header */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-supernova/20 rounded-lg flex items-center justify-center mr-4">
                <IconComponent className="w-6 h-6 text-supernova" />
              </div>
              <div>
                <h3 className="font-jakarta font-bold text-lg text-white mb-2">{product.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${categoryColors[product.category]}`}>
                  {product.category.toUpperCase()}
                </span>
              </div>
            </div>
            
            {/* Version Status */}
            <div className="flex flex-col items-end">
              {needsUpdate ? (
                <div className="flex items-center text-green-400">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs font-semibold font-jakarta">NEW VERSION AVAILABLE</span>
                </div>
              ) : (
                <div className="flex items-center text-green-400">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs font-semibold font-jakarta">UP TO DATE</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400 font-jakarta mb-6">
              <span>Version {product.version}</span>
              {product.lastDownloaded && (
                <>
                  <span>•</span>
                  <span>Last downloaded: {new Date(product.lastDownloaded).toLocaleDateString()}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3">
            {needsUpdate ? (
              <button
                onClick={() => handleUpdate(product.id)}
                disabled={isUpdating}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-jakarta font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 mr-2" />
                    New version available
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => handleDownload(product.id)}
                disabled={isDownloading}
                className="flex-1 bg-supernova hover:bg-yellow-400 text-shadowforce font-jakarta font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-shadowforce mr-2"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Header with User Name and View Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-anton text-4xl text-white mb-3">MY PRODUCTS</h1>
          <p className="font-jakarta text-gray-400 text-lg">
            Access and download all your purchased digital products
          </p>
        </div>
        <div className="flex items-center space-x-8">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-supernova text-shadowforce' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-supernova text-shadowforce' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          
          {/* User Welcome */}
          <div className="text-right">
            <p className="font-jakarta text-sm text-gray-400">Welcome back,</p>
            <p className="font-jakarta font-bold text-lg text-white">{mockUser.name}</p>
          </div>
        </div>
      </div>

      {/* Products Layout */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} isHorizontal={true} />
          ))}
        </div>
      )}
    </div>
  );
}