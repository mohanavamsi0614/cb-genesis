import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
   server: {
    allowedHosts: [
      'd2d8a935e87d.ngrok-free.app'  // Replace this if ngrok URL changes
    ]
  }
})
