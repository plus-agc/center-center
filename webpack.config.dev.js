const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
    client: {
      overlay: {
        runtimeErrors: (error) => {
          const stack = error?.stack ?? '';
          const message = error?.message ?? '';
          const blob = `${stack}${message}`;
          // Adobe Fonts（動的キット）が XHR 失敗時に投げる — フォントはシステムフォントにフォールバック
          if (/use\.typekit\.net|p\.typekit\.net|primer\.typekit\.net/i.test(blob)) {
            return false;
          }
          return true;
        },
      },
    },
  },
});
