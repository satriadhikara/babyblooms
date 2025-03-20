module.exports = (api) => {
  api.cache(true); // This is important for performance

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "better-auth/react":
              "./node_modules/better-auth/dist/client/react/index.cjs",
            "@better-auth/expo/client":
              "./node_modules/@better-auth/expo/dist/client.cjs",
          },
          extensions: [".cjs", ".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
