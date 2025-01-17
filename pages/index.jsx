

import { useSession } from "next-auth/react";
import Head from "next/head";


import Link from "next/link";



export default function Home() {


  const { data: session, status } = useSession();



  return (

    <main className="  jelly-scroll h-screen font-header2 scroll-smooth" data-scroll-container>
      <Head>

        {/* Primary Meta Tags */}
        <title>SerandipAI - AI-Powered Sri Lanka Travel Planner</title>
        <meta name="title" content="SerandipAI - AI-Powered Sri Lanka Travel Planner" />
        <meta
          name="description"
          content="Plan your perfect trip to Sri Lanka with SerandipAI. Get personalized itineraries, real-time updates, and local insights powered by AI."
        />
        <link rel="canonical" href="https://www.serandipai.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.serandipai.com" />
        <meta property="og:title" content="SerandipAI - AI-Powered Sri Lanka Travel Planner" />
        <meta
          property="og:description"
          content="Plan your perfect trip to Sri Lanka with SerandipAI. Get personalized itineraries, real-time updates, and local insights powered by AI."
        />
        <meta property="og:image" content="https://www.serandipai.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.serandipai.com" />
        <meta property="twitter:title" content="SerandipAI - AI-Powered Sri Lanka Travel Planner" />
        <meta
          property="twitter:description"
          content="Plan your perfect trip to Sri Lanka with SerandipAI. Get personalized itineraries, real-time updates, and local insights powered by AI."
        />
        <meta property="twitter:image" content="https://www.serandipai.com/twitter-image.jpg" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></link>

      </Head>
      <div
        data-scroll-section
        className=" bg-center bg-cover h-screen w-[100%]"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('/image-enhanced.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >



        <nav className="text-white px-32 py-6 font-header2 flex-row flex justify-between items-center ">
          <div className="logo font-header2 text-2xl">
            SerandipAI

          </div>
          <ul className="nav-links cursor-pointer flex flex-row space-x-4  font-header2 items-center justify-center">
            <li className="  border-white border-b-4 border-b-spacing-2"><a href="#home">  Home</a></li>
            <li><a href="#about">  About Sri Lanka</a></li>
            <li><a href="#ai-planner">  AI Travel Planner</a></li>
            <li><a href="#testimonials">  Testimonials</a></li>

          </ul>
          {!session ? (
            <Link href={"/app/chat"}>
              <div className="cta bg-white text-black rounded-full px-4 py-2">Get&apos;s Start</div>

            </Link>
          ) : (
            <Link href={"/app/chat"}>
              <div className="cta bg-white text-black rounded-full px-4 py-2">Playground</div>


            </Link>
          )}
        </nav>
        <div className="content text-white space-y-4 items-start flex flex-col  font-header py-32 px-32">
          <h1 className="leading-tight text-5xl font-light">Explore Sri Lanka Like Never Before <br /> with AI-Powered Travel Planning!</h1>
          <h3 className=" text-2xl font-header2">Your Personal Travel Guide to Discover the Wonders of Sri Lanka.</h3>

          <button
            onClick={() => window.location.href = "/app/chat"}
            className="bg-white text-black rounded-full font-body2 px-4 py-2">Start Planning Your Trip Now</button>
        </div>



      </div>
      <section id="about" className="py-12 bg-gray-50 w-[100%] h-[100vh]" data-scroll-section>
        <div className="  px-32 py-12">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
            Why Sri Lanka?
          </h2>

          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Sri Lanka, the Pearl of the Indian Ocean, is a tropical paradise known for its pristine beaches, lush tea plantations, ancient temples, and diverse wildlife. From the cultural triangle to the serene hill country, Sri Lanka offers something for every traveler.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="/sigiriya.png" alt="Sigiriya Rock" className="w-full h-48 object-cover"></img>
              <p className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                Sigiriya Rock
              </p>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0oix2CBsTm1_D6ABn3Vaf5yS3NTDXPqncaA&s" alt="Ella" className="w-full h-48 object-cover"></img>
              <p className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                Ella
              </p>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmK-CAJIjPxHS3fsOaT-KY1bukORkvmw_Mpw&s" alt="Galle Fort" className="w-full h-48 object-cover"></img>
              <p className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                Galle Fort
              </p>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSLhAQhbexCdMfzOoyLWfN8PV1nCCM6O3q_Q&s" alt="Yala National Park" className="w-full h-48 object-cover"></img>
              <p className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                Yala National Park
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="ai-planner" className="py-16 bg-white" data-scroll-section>
        <div className="  py-12 px-32">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Plan Your Perfect Trip with AI
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <i className="fas fa-map-marked-alt text-5xl text-blue-500"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Personalized Itineraries
              </h3>
              <p className="text-gray-600">
                Tailored to your preferences for a unique travel experience.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <i className="fas fa-cloud-sun text-5xl text-green-500"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Real-Time Updates
              </h3>
              <p className="text-gray-600">
                Get real-time weather and travel updates on the go.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <i className="fas fa-wallet text-5xl text-yellow-500"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Budget-Friendly
              </h3>
              <p className="text-gray-600">
                Recommendations that fit your budget without compromising on fun.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <i className="fas fa-binoculars text-5xl text-purple-500"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Local Insights
              </h3>
              <p className="text-gray-600">
                Discover hidden gems and local secrets for an authentic experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="py-16 bg-gray-50" data-scroll-section>
        <div className="   px-32">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img src="https://source.unsplash.com/100x100/?portrait,woman" alt="Sarah" className="w-12 h-12 rounded-full mr-4"></img>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Sarah, USA</h3>
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                &quot;This AI travel planner made my Sri Lanka trip unforgettable! It saved me so much time and effort.&quot;
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img src="https://source.unsplash.com/100x100/?portrait,man" alt="John" className="w-12 h-12 rounded-full mr-4"></img>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">John, UK</h3>
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                &quot;The travel guide was incredibly helpful. I discovered places I never would have found on my own.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>


      <section id="cta" className="py-16 bg-blue-600" data-scroll-section>
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore Sri Lanka?
          </h2>

          <p className="text-lg text-white mb-8">
            Sign up now and let our AI travel planner create the perfect itinerary for your Sri Lanka adventure!
          </p>

          <Link href="/app/chat" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
            Get Started
          </Link>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about-us" className="hover:text-blue-400 transition-colors duration-300">About Us</a></li>
                <li><a href="#privacy-policy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#terms-of-service" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li><i className="fas fa-envelope mr-2"></i>info@SerandipAI.com</li>
                <li><i className="fas fa-phone mr-2"></i>+94 123 456 789</li>
                <li><i className="fas fa-map-marker-alt mr-2"></i>Colombo, Sri Lanka</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <i className="fab fa-facebook-f text-2xl"></i>
                </a>
                <a href="https://twitter.com" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a href="https://instagram.com" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a href="https://linkedin.com" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <i className="fab fa-linkedin-in text-2xl"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 SerandipAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>



  );
}
