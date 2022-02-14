

module.exports = {
  reactStrictMode: true,
  
  // future: {
  //   webpack5: true,
  // },
  // webpack(config) {
  //   config.resolve.fallback = {
  //     ...config.resolve.fallback,
  //     fs: false,
  //   }
  //   return config
  // }
}

// module.exports = {
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         fs: 'empty'
//       }
//     }

//     return config
//   }
// }

// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     config.node = {
//       fs: 'empty'
//     }
//     return config
//   }
// }
