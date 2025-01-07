'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="min-h-screen flex">
        {/* Left Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-sm">

            {/* Main Content */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
                Welcome back to Artswrk <span className="text-2xl">👋</span>
              </h1>
            </div>

            {/* Google Sign In */}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-xs text-gray-500 uppercase tracking-wider bg-white">
                  or continue with
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 hover:border-gray-300 transition-colors"
                placeholder="Enter your email"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 hover:border-gray-300 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-900 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-primary-800 transition-colors"
              >
                Sign in
              </button>
            </div>

            {/* Footer */}
            <div className="mt-12">
              <p className="text-sm text-gray-500">
                New to Artswrk?{' '}
                <Link href="/join" className="text-gray-900 hover:text-gray-800 font-medium">
                 Join Now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Content - Animated Design */}
        <div className="flex-1 relative hidden lg:block animated-gradient overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-96 h-96">
              {/* Large circle */}
              <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-3xl floating" />
              
              {/* Smaller floating circles */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full backdrop-blur-2xl floating" 
                   style={{ animationDelay: '-2s' }} />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/20 rounded-full backdrop-blur-2xl floating" 
                   style={{ animationDelay: '-1s' }} />
              <div className="absolute top-1/2 right-0 w-16 h-16 bg-white/20 rounded-full backdrop-blur-2xl floating" 
                   style={{ animationDelay: '-3s' }} />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center space-y-4 floating" style={{ animationDelay: '-1.5s' }}>
                  <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-2xl rounded-2xl transform rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 