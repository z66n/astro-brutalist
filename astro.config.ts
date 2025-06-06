// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// Read deploy target from env
const isFirebase =
  process.env.DEPLOY_TARGET === "firebase" || !!process.env.PORT;

// https://astro.build/config
export default defineConfig({
  site: process.env.CI
    ? "https://astro-shadcn-ui-template.vercel.app"
    : "http://localhost:4321",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    ...(isFirebase
      ? {}
      : {
          resolve: {
            alias: {
              'react-dom/server.browser': 'react-dom/server',
              'react-dom/server.node': 'react-dom/server',
              'react-dom/server': 'react-dom/server',
            },
          },
        }),
  },
  ...(isFirebase
    ? {}
    : {
        output: "server",
        adapter: cloudflare({
          platformProxy: {
            enabled: true,
          },
        }),
      }),
});
