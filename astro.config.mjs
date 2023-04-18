import {defineConfig} from 'astro/config';
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig(
  {
    build: {
      format: 'file'
    },
    integrations: [
      compress(),
      sitemap(),
      tailwind(
        {
          config: {applyBaseStyles: false},
        }
      )
    ],
    site: 'https://webauthn.wtf'
  }
);