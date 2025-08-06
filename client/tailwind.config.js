// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mycustom: ['var(--font-mycustom)'],
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"], // adjust as needed
};
