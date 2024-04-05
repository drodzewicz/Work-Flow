// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, UserConfig } from "vite";
import type { InlineConfig } from "vitest";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

type ViteConfig = UserConfig & { test: InlineConfig };
const config: ViteConfig = {
  // other config
  plugins: [react(), svgr(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./src/test/setup.ts"],
  },
};
export default defineConfig(config);
