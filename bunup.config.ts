import { defineConfig } from "bunup";

export default defineConfig({
  entry: ["src/index.ts"],
  minify: true,
  dts: true,
  sourcemap: true,
  exports: true,
  unused: true,
});
