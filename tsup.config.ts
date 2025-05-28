import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/commands.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  outDir: "dist",
  target: "node20",
  splitting: false,
  sourcemap: false,
  minify: false,
});
