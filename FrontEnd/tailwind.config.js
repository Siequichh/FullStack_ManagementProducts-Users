/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'unauthorized': "url('https://th.bing.com/th/id/OIP.451Tw7VMUB0ecblH_296MwHaHa?rs=1&pid=ImgDetMain')",
      },
    },
  },
  plugins: [],
}

