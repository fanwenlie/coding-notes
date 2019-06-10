const presets = [
  ["@babel/env", {
    targets: {
      edge: "17",
      firefox: "60",
      chrome: "52",
      safari: "8"
    },
    useBuiltIns: "usage"
  }]
];
const plugins = []
module.exports = { presets, plugins };