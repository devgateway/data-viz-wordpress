import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  failOnWarn: false,
  outDir: "build",
  watch: process.argv.includes("--watch"),
  entries: [
    {
      builder: "mkdist",
      input: "src",
      outDir: "build",
      format: "esm",
      ext: "js",
      declaration: true,
      esbuild: {
        target: "es2020",
      },
    },
    {
      builder: "mkdist",
      input: "src",
      outDir: "build",
      format: "cjs",
      ext: "cjs",
      esbuild: {
        target: "es2020",
      },
    }
  ]
});