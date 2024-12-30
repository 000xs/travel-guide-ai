/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["Playfair Display", "serif"], // For headers
        body: ["Source Sans Pro", "sans-serif"], // For body text
        header2: ["Merriweather", "serif"], // For headers
        body2: ["Roboto", "sans-serif"],
      },
      colors: {
        "tropical-sunset": "#F9A826",
        "ocean-blue": "#00A6A6",
        "jungle-green": "#006400",
        "coral-red": "#F06C5B",
        "sandy-beige": "#F1E0C6",
        "coconut-brown": "#6F4F37",
        "sea-foam-green": "#A8D8B9",
        "ivory-white": "#F8F8F8",
        "spice-red": "#D72638",
        "coconut-white": "#F7F7F7",
        "text-black": "#212121",
      },
    },
  },
  plugins: [],
};
