
// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 5173,
//     proxy: {
//       "/api": {
//         target: "https://healthpro-backend-o6bj.onrender.com",
//         changeOrigin: true,
//       }
//     }
//   }
// });