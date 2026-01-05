/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@walletconnect/universal-provider', '@walletconnect/ethereum-provider', '@walletconnect/sign-client', '@walletconnect/logger', 'pino', 'thread-stream'],
  turbopack: {},
};

module.exports = nextConfig;