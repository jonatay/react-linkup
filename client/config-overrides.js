const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', style: true }],
    config
  ); // change importing css to less
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '@blue-6',
      '@info-color': '@blue-6',
      '@success-color': '@green-6',
      '@processing-color': '@primary-color',
      '@error-color': '@red-6',
      '@highlight-color': '@red-6',
      '@warning-color': '@gold-6',
      '@normal-color': '#d9d9d9',
      '@body-background': '#666',
      '@layout-header-height': '50px'
      //'@component-background': '#FFFFD4'
    }
  })(config, env); // was 1DA57A
  return config;
};
