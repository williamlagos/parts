import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    { 
      type: 'www',
      serviceWorker: null 
    },
    { type: 'dist' }
  ],
  globalStyle: 'src/global.css',
  globalScript: 'src/global.ts',
  copy: [
    { src: 'robots.txt' }
  ],
  namespace: 'clipper',
  devServer: {
    openBrowser: false,
    reloadStrategy: 'pageReload',
    port: 4000
  }
};
