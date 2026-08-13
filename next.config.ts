import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Notion file/image URLs (uploaded files + external S3 mirrors) and the
    // placeholder covers used by the mock/fallback data.
    remotePatterns: [
      { protocol: "https", hostname: "www.notion.so" },
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
