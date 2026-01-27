# 개발 서버 실행 가이드

## 🖥️ 터미널 여는 방법

### 방법 A: Cursor/VS Code에서 열기 (가장 쉬움)
1. **단축키 사용**: 키보드에서 `Ctrl + ` (백틱 키, 숫자 1 왼쪽에 있는 키)
2. **또는 메뉴 사용**: 
   - 상단 메뉴에서 `Terminal` → `New Terminal` 클릭
3. **또는 명령 팔레트 사용**:
   - `Ctrl + Shift + P` 누르기
   - "Terminal: Create New Terminal" 입력 후 Enter

### 방법 B: Windows PowerShell 직접 실행
1. **Windows 키** 누르기
2. **"PowerShell"** 또는 **"터미널"** 검색
3. **"Windows PowerShell"** 또는 **"터미널"** 앱 클릭

### 방법 C: 파일 탐색기에서 열기
1. `c:\Users\kyuwon\Desktop\soniga` 폴더를 파일 탐색기에서 열기
2. 주소창에 **`powershell`** 입력 후 **Enter** 키 누르기
3. 또는 폴더 내 빈 공간에서 **우클릭** → **"터미널에서 열기"** 또는 **"PowerShell에서 열기"** 선택

---

## 🚀 개발 서버 실행하기

### 방법 1: 터미널에서 직접 실행

1. **터미널 열기** (위의 방법 중 하나 선택)

2. **프로젝트 폴더로 이동**:
   ```powershell
   cd c:\Users\kyuwon\Desktop\soniga
   ```

3. **개발 서버 실행**:
   ```powershell
   npm run dev
   ```

4. **브라우저에서 확인**:
   - `http://localhost:3000` 열기
   - 또는 터미널에 표시된 주소로 접속

### 방법 2: Cursor/VS Code 터미널 사용 (권장)

1. **Cursor/VS Code에서 터미널 열기**: `Ctrl + ` (백틱)

2. **터미널이 자동으로 프로젝트 폴더에 있으면 바로 실행**:
   ```powershell
   npm run dev
   ```

3. **만약 다른 폴더에 있다면 먼저 이동**:
   ```powershell
   cd c:\Users\kyuwon\Desktop\soniga
   npm run dev
   ```

## ⚠️ 문제 해결

### 문제 1: "스크립트를 실행할 수 없으므로" 오류 (PowerShell 실행 정책 오류)

**에러 메시지**: `이 시스템에서 스크립트를 실행할 수 없으므로 npm.ps1 파일을 로드할 수 없습니다`

#### 해결 방법 A: 명령 프롬프트(cmd) 사용 (가장 쉬움) ⭐

1. **Windows 키** 누르기
2. **"cmd"** 또는 **"명령 프롬프트"** 검색
3. **"명령 프롬프트"** 앱 실행
4. 다음 명령어 입력:
   ```cmd
   cd c:\Users\kyuwon\Desktop\soniga
   npm run dev
   ```

#### 해결 방법 B: PowerShell 실행 정책 변경

1. **PowerShell을 관리자 권한으로 실행**:
   - Windows 키 누르기
   - "PowerShell" 검색
   - **우클릭** → **"관리자 권한으로 실행"** 선택

2. **실행 정책 변경**:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   - "Y" 입력하여 확인

3. **일반 PowerShell 다시 열고 실행**:
   ```powershell
   cd c:\Users\kyuwon\Desktop\soniga
   npm run dev
   ```

#### 해결 방법 C: Cursor/VS Code에서 터미널 프로필 변경

1. Cursor/VS Code에서 터미널 열기 (`Ctrl + `)
2. 터미널 우측 상단의 **"+" 옆 화살표** 클릭
3. **"Command Prompt"** 또는 **"cmd"** 선택
4. 다음 명령어 입력:
   ```cmd
   npm run dev
   ```

### 문제 2: 포트 3000이 이미 사용 중

만약 포트 3000이 이미 사용 중이라면:
- 다른 포트로 실행: `npm run dev -- -p 3001`
- 또는 기존 프로세스 종료 후 다시 실행

## 확인 사항

- node_modules 폴더가 있는지 확인
- package.json이 올바른지 확인
- 터미널에 에러 메시지가 없는지 확인
