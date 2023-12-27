import { defineConfig } from "vite";

const GITHUB_PAGES_DEFAULT_FOLDER = "/docs";
const PRODUCTION_PATH = "/snake-game";

export default defineConfig({
  base: PRODUCTION_PATH,
  build: {
    outDir: `.${GITHUB_PAGES_DEFAULT_FOLDER}`,
  },
});
