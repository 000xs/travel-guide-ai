// pages/index.js
import Navigationbar from '@/Components/Navigationbar';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="relative h-screen w-[100%]">
      <Head>
        <title>Landing Page</title>
      </Head>
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover w-[100%] bg-center"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      >
        <div className="absolute inset-0"></div>
      </div>
      <Navigationbar />
      
      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold">Welcome to Our Site</h1>
        <p className="mt-4 text-lg max-w-xl text-center">
          Discover amazing products and services that will change your life.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-medium">
          Get Started
        </button>
      </div>
      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold">Welcome to Our Site</h1>
        <p className="mt-4 text-lg max-w-xl text-center">
          Discover amazing products and services that will change your life.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-medium">
          Get Started
        </button>
      </div>
    </div>
  );
}
