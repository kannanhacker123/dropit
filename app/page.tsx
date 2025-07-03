"use client"

import React from 'react'
import { Upload, Shield, Zap, Leaf, Bird, TreePine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-600 relative overflow-hidden'>
      {/* Animated background elements inspired by logo */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-20 w-96 h-96 bg-green-400/30 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-lime-400/20 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      {/* Floating cloud elements */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-16 left-1/4 w-16 h-10 bg-white/60 rounded-full blur-sm animate-float'></div>
        <div className='absolute top-32 right-1/3 w-12 h-8 bg-white/50 rounded-full blur-sm animate-float delay-300'></div>
        <div className='absolute bottom-40 left-1/6 w-20 h-12 bg-white/40 rounded-full blur-sm animate-float delay-700'></div>
      </div>

      {/* Main content */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center'>
        {/* Logo area with nature-inspired glassmorphism */}
        <div className='mb-8 p-8 rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl'>
          <div className='flex items-center gap-4 mb-6'>
            {/* 3D-style logo representation */}
            <div className='relative'>
              <div className='p-1 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg'>
                <div className='relative'>
                  <Image src={"/my/logo.jpeg"} alt="Dropit Logo" width={100} height={64} className='rounded-full' />
                </div>
              </div>
              {/* Cloud accent */}
              <div className='absolute -top-1 -left-1 w-6 h-4 bg-white/80 rounded-full blur-sm'></div>
            </div>
            
            <h1 className='text-5xl font-bold text-white drop-shadow-lg'>
              Dropit
            </h1>
          </div>
          
          <p className='text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md'>
            Your natural file storage solution that grows with you
          </p>

          {/* CTA Button with nature theme */}
          <Link href={"/signin"}>
          <button className='group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-semibold text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 active:scale-95'>
            <span className='relative z-10 flex items-center gap-2'>
              <Upload className='w-5 h-5' />
              Upload Your Files
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </button>
          </Link>
        </div>

        {/* Feature cards with nature theme */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-12'>
          <div className='group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105'>
            <div className='p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl w-fit mb-4 group-hover:rotate-6 transition-transform duration-300'>
              <Shield className='w-6 h-6 text-white' />
            </div>
            <h3 className='text-lg font-semibold text-white mb-2 drop-shadow'>Secure Growth</h3>
            <p className='text-white/80 text-sm'>Protected like seeds in fertile soil, your files are safe and secure</p>
          </div>

          <div className='group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105'>
            <div className='p-3 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl w-fit mb-4 group-hover:rotate-6 transition-transform duration-300'>
              <Zap className='w-6 h-6 text-white' />
            </div>
            <h3 className='text-lg font-semibold text-white mb-2 drop-shadow'>Swift as Wind</h3>
            <p className='text-white/80 text-sm'>Upload and access files as fast as a bird in flight</p>
          </div>

          <div className='group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105'>
            <div className='p-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl w-fit mb-4 group-hover:rotate-6 transition-transform duration-300'>
              <Leaf className='w-6 h-6 text-white' />
            </div>
            <h3 className='text-lg font-semibold text-white mb-2 drop-shadow'>Always Growing</h3>
            <p className='text-white/80 text-sm'>Your storage expands naturally, reaching every device like branches</p>
          </div>
        </div>

        {/* Floating nature elements */}
        <div className='absolute top-29 right-72 text-green-300 animate-bounce delay-300'>
          <Leaf className='w-5 h-5' />
        </div>
        <div className='absolute bottom-80 left-99 text-lime-300 animate-bounce delay-700'>
          <Bird className='w-5 h-5' />
        </div>
        <div className='absolute bottom-32 right-50 text-teal-300 animate-bounce delay-500'>
          <TreePine className='w-5 h-5' />
        </div>
        <div className='absolute top-32 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-bounce delay-1000'></div>
      </div>

      {/* Nature-inspired pattern overlay */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M30 30c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] pointer-events-none'></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default HomePage