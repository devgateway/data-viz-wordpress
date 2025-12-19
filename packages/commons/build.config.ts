import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  failOnWarn: false,
  outDir: "build",
  entries: [
    {
      builder: "mkdist",
      input: "src",
      outDir: "build",
      format: "esm",
      ext: "js",
      declaration: true,
    },
    {
      builder: "mkdist",
      input: "src",
      outDir: "build",
      format: "cjs",
      ext: "cjs",
    }
  ]
});