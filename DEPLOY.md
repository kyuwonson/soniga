# 배포 가이드

## 로컬 개발 서버 실행

### 1. 개발 서버 시작
```bash
npm run dev
```

### 2. 브라우저에서 확인
- http://localhost:3000

## 문제 해결

### 개발 서버가 실행되지 않는 경우

1. **포트가 사용 중인 경우**
   ```bash
   # 다른 포트로 실행
   npm run dev -- -p 3001
   ```

2. **의존성 재설치**
   ```bash
   rm -rf node_modules
   npm install
   npm run dev
   ```

3. **캐시 삭제 후 재시작**
   ```bash
   rm -rf .next
   npm run dev
   ```

## GitHub Pages 배포

### 자동 배포 (권장)

1. 코드를 main 브랜치에 푸시하면 자동으로 배포됩니다
2. GitHub 저장소 → Settings → Pages에서 배포 상태 확인
3. Actions 탭에서 배포 진행 상황 확인

### 수동 배포

```bash
# 빌드
npm run build

# out 폴더가 생성되면 GitHub Pages에 업로드
```

## Git 커밋이 느린 경우

### 해결 방법

1. **큰 파일 제외 확인**
   ```bash
   # .gitignore 확인
   cat .gitignore
   ```

2. **이미 커밋된 큰 파일 제거**
   ```bash
   git rm -r --cached node_modules
   git rm -r --cached .next
   git commit -m "Remove large files from git"
   ```

3. **Git 캐시 정리**
   ```bash
   git gc --prune=now
   ```
