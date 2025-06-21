import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shadowforce via-gray-900 to-shadowforce flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-supernova rounded-xl mb-4">
            <User className="w-8 h-8 text-shadowforce" />
          </div>
          <h1 className="font-anton text-3xl text-white mb-2">SUPER RECRUITER</h1>
          <p className="text-guardian text-sm">Premium Client Portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="font-jakarta font-bold text-2xl text-shadowforce mb-2">Welcome Back</h2>
            <p className="text-gray-600">Access your exclusive content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-jakarta font-medium text-shadowforce mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-guardian rounded-xl focus:ring-2 focus:ring-supernova focus:border-transparent font-jakarta"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-jakarta font-medium text-shadowforce mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-guardian rounded-xl focus:ring-2 focus:ring-supernova focus:border-transparent font-jakarta"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-supernova hover:bg-yellow-400 text-shadowforce font-jakarta font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-shadowforce mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Access Portal'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-gray-500 hover:text-supernova font-jakarta">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-guardian text-xs font-jakarta">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
}