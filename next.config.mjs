/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 배포를 위한 설정 (빌드 시에만 적용)
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  }),
};

export default nextConfig;
