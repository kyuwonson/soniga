/**
 * GitHub Pages 배포 시 basePath(/soniga)를 포함한 경로
 * 로컬 개발 시에는 빈 문자열
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const HOME_PATH = `${BASE_PATH}/`;
