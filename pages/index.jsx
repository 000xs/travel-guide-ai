 

import { useSession } from "next-auth/react";
import Head from "next/head";
 
 
import Link from "next/link";

 

export default function Home() {


  const { data: session, status } = useSession();



  return (

    <main className="  jelly-scroll h-screen font-header2 scroll-smooth" data-scroll-container>
      <Head>
        <title>Landing Page</title>
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
          <ul class="nav-links cursor-pointer flex flex-row space-x-4  font-header2 items-center justify-center">
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
          onClick={()=> window.location.href = "/app/chat"}
          className="bg-white text-black rounded-full font-body2 px-4 py-2">Start Planning Your Trip Now</button>
        </div>



      </div>
      <section id="about" class="py-12 bg-gray-50 w-[100%] h-[100vh]" data-scroll-section>
        <div class="  px-32 py-12">

          <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
            Why Sri Lanka?
          </h2>

          <p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Sri Lanka, the Pearl of the Indian Ocean, is a tropical paradise known for its pristine beaches, lush tea plantations, ancient temples, and diverse wildlife. From the cultural triangle to the serene hill country, Sri Lanka offers something for every traveler.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div class="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="/sigiriya.png" alt="Sigiriya Rock" class="w-full h-48 object-cover"></img>
              <p class="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                Sigiriya Rock
              </p>
            </div>

            <div class="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0oix2CBsTm1_D6ABn3Vaf5yS3NTDXPqncaA&s" alt="Ella" class="w-full h-48 object-cover"></img>
              <p class="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                Ella
              </p>
            </div>

            <div class="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmK-CAJIjPxHS3fsOaT-KY1bukORkvmw_Mpw&s" alt="Galle Fort" class="w-full h-48 object-cover"></img>
              <p class="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                Galle Fort
              </p>
            </div>

            <div class="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSLhAQhbexCdMfzOoyLWfN8PV1nCCM6O3q_Q&s" alt="Yala National Park" class="w-full h-48 object-cover"></img>
              <p class="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                Yala National Park
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="ai-planner" class="py-16 bg-white" data-scroll-section>
        <div class="  py-12 px-32">

          <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Plan Your Perfect Trip with AI
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div class="text-center">
              <div class="flex justify-center mb-4">
                <i class="fas fa-map-marked-alt text-5xl text-blue-500"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">
                Personalized Itineraries
              </h3>
              <p class="text-gray-600">
                Tailored to your preferences for a unique travel experience.
              </p>
            </div>

            <div class="text-center">
              <div class="flex justify-center mb-4">
                <i class="fas fa-cloud-sun text-5xl text-green-500"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">
                Real-Time Updates
              </h3>
              <p class="text-gray-600">
                Get real-time weather and travel updates on the go.
              </p>
            </div>

            <div class="text-center">
              <div class="flex justify-center mb-4">
                <i class="fas fa-wallet text-5xl text-yellow-500"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">
                Budget-Friendly
              </h3>
              <p class="text-gray-600">
                Recommendations that fit your budget without compromising on fun.
              </p>
            </div>

            <div class="text-center">
              <div class="flex justify-center mb-4">
                <i class="fas fa-binoculars text-5xl text-purple-500"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">
                Local Insights
              </h3>
              <p class="text-gray-600">
                Discover hidden gems and local secrets for an authentic experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" class="py-16 bg-gray-50" data-scroll-section>
        <div class="   px-32">

          <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div class="bg-white p-6 rounded-lg shadow-lg">
              <div class="flex items-center mb-4">
                <img src="https://source.unsplash.com/100x100/?portrait,woman" alt="Sarah" class="w-12 h-12 rounded-full mr-4"></img>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Sarah, USA</h3>
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600">
              &quot;This AI travel planner made my Sri Lanka trip unforgettable! It saved me so much time and effort.&quot;
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg">
              <div class="flex items-center mb-4">
                <img src="https://source.unsplash.com/100x100/?portrait,man" alt="John" class="w-12 h-12 rounded-full mr-4"></img>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">John, UK</h3>
                  <div class="flex text-yellow-400">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p class="text-gray-600">
              &quot;The travel guide was incredibly helpful. I discovered places I never would have found on my own.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>


      <section id="cta" class="py-16 bg-blue-600" data-scroll-section>
        <div class="container mx-auto px-4 text-center">

          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore Sri Lanka?
          </h2>

          <p class="text-lg text-white mb-8">
            Sign up now and let our AI travel planner create the perfect itinerary for your Sri Lanka adventure!
          </p>

          <Link href="/app/chat" class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
            Get Started
          </Link>
        </div>
      </section>
      <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div>
              <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
              <ul class="space-y-2">
                <li><a href="#about-us" class="hover:text-blue-400 transition-colors duration-300">About Us</a></li>
                <li><a href="#privacy-policy" class="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#terms-of-service" class="hover:text-blue-400 transition-colors duration-300">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
              <ul class="space-y-2">
                <li><i class="fas fa-envelope mr-2"></i>info@travelplanner.com</li>
                <li><i class="fas fa-phone mr-2"></i>+94 123 456 789</li>
                <li><i class="fas fa-map-marker-alt mr-2"></i>Colombo, Sri Lanka</li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
              <div class="flex space-x-4">
                <a href="https://facebook.com" class="text-white hover:text-blue-400 transition-colors duration-300">
                  <i class="fab fa-facebook-f text-2xl"></i>
                </a>
                <a href="https://twitter.com" class="text-white hover:text-blue-400 transition-colors duration-300">
                  <i class="fab fa-twitter text-2xl"></i>
                </a>
                <a href="https://instagram.com" class="text-white hover:text-blue-400 transition-colors duration-300">
                  <i class="fab fa-instagram text-2xl"></i>
                </a>
                <a href="https://linkedin.com" class="text-white hover:text-blue-400 transition-colors duration-300">
                  <i class="fab fa-linkedin-in text-2xl"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-700 mt-8 pt-8 text-center">
            <p class="text-gray-400">
              © 2023 Travel Planner AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>



  );
}
