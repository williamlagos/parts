import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    { type: 'www' },
    { type: 'dist' }
  ],
  globalStyle: 'src/global.css',
  copy: [
    { src: 'robots.txt' }
  ],
  devServer: {
    openBrowser: false
  }
};
