import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  plugins: [
    typescript()
  ],
  output: {
    name: "sfparser",
    file: 'dist/total-war-save-parser.js',
    format: 'umd'
  },
  external: ['jdataview']
}
