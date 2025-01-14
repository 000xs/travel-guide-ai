import React from 'react';

const Signup = () => {
    return (
        <div
            className="flex items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/travel-bg.jpg')" }} // Add a travel-themed background image
        >
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md backdrop-blur-sm">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Join the Adventure!
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Sign up to explore the world with our travel bot.
                </p>

                <div className="space-y-4">
                    {/* Google Sign-Up Button */}
                    <button
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 flex items-center justify-center"
                    >
                        <img
                            src="https://img.icons8.com/color/48/000000/google-logo.png"
                            alt="Google"
                            className="w-6 h-6 mr-2"
                        />
                        Sign Up with Google
                    </button>

                    {/* Facebook Sign-Up Button */}
                    <button
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                    >
                        <img
                            src="https://img.icons8.com/color/48/000000/facebook-new.png"
                            alt="Facebook"
                            className="w-6 h-6 mr-2"
                        />
                        Sign Up with Facebook
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Email Sign-Up Form */}
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Sign Up with Email
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;