const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {}, // Customize Ant Design theme variables here
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
