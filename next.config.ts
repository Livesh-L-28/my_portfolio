import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/vr-demo",
        destination: "/projects/venipuncture-vr#demos-gallery",
        permanent: false,
      },
      {
        source: "/venipuncture-demo",
        destination: "/projects/venipuncture-vr#demos-gallery",
        permanent: false,
      },
      {
        source: "/medical-vr",
        destination: "/projects/venipuncture-vr#demos-gallery",
        permanent: false,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
