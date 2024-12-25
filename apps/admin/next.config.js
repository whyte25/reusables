/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    "@reusables/ui",
    "@reusables/lib",
    "@reusables/provider",
    "@reusables/config",
    "@reusables/assets",
    "@reusables/hooks",
  ],
};
