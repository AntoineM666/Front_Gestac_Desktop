const {app} = require('electron');

module.exports = {
  appId: 'amdeveloppement.fr',
  productName: 'Gestac',
  copyright: 'Copyright © 2021 Antoine MARIE',
  directories: {
    output: 'build',
  },
  files: [
    'dist/**/*',
    'node_modules/**/*'
  ],
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64']
      }
    ]
  }
}