/** @type {import('next').NextConfig} */
const nextConfig = {
  // Native `sharp` can't run in Bolt/StackBlitz (WebContainers); we don't need image optimisation here.
  images: { unoptimized: true },
};

export default nextConfig;
