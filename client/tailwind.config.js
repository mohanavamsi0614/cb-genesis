// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mycustom: ['var(--font-mycustom)'],
        poppins: ['var(--font-poppins)'],
        pirates: ['var(--font-pirates)'],
      },
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"], // adjust as needed
};
