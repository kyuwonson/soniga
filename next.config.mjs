/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === 'production' ? '/soniga' : '';
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // GitHub Pages 배포를 위한 설정 (빌드 시에만 적용)
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    basePath,
    assetPrefix: '/soniga/',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  }),
};

export default nextConfig;
