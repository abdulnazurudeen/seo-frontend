const path = require('path')

module.exports = {
  env: {
    APIURL: process.env.NEXT_PUBLIC_APIURL,
    STRIP_PUBKEY: process.env.NEXT_PUBLIC_STRIP_PUBKEY
  },
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
