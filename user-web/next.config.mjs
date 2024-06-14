// next.config.js

const nextConfig = {
  images: {
    domains: ["knowledgender.s3.ap-northeast-2.amazonaws.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: "build", // 빌드된 파일이 생성될 디렉토리 설정
};

export default nextConfig;
