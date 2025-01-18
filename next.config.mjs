import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/r/index",
        destination: "/r/index.json",
        permanent: true,
      },
      {
        source: "/r/:name((?!index\\.json|styles/).*)",
        destination: "/r/styles/default/:name.json",
        permanent: true,
        missing: [
          {
            type: "query",
            key: "_redirected",
            value: undefined,
          },
        ],
      },
    ];
  },
};

export default withMDX(config);
