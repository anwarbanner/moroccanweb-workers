/** @type {import('next').NextConfig} */
// - `npm run build`        → Node.js server (cPanel "Setup Node.js App", Vercel…) in .next/standalone
// - `npm run build:static` → static site in out/ (upload to public_html, no Node needed)
// works on Windows, macOS and Linux (no env variable needed)
const isStatic = process.env.npm_lifecycle_event === 'build:static' || process.env.STATIC_EXPORT === '1';

const nextConfig = {
  output: isStatic ? 'export' : 'standalone',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  compress: true,
};
export default nextConfig;
