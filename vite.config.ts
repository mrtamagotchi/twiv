import dts from "vite-plugin-dts";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, UserConfig } from "vitest/config";

export default defineConfig({
  base: "./",
  plugins: [
    dts({ rollupTypes: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "mylib",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "tailwind-merge"],
      output: {
        globals: {
          react: "React",
          twMerge: "tailwind-merge",
        },
      },
    },
  },
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: ["src/main.tsx"],
    },
  },
} satisfies UserConfig);
