## 시작하기

Git 저장소를 Pull 한 다음 필요한 패키지를 설치합니다. 
실행하려면

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
실행 도메인 : http://stablediffusion-test.vercel.app/main

# Stablediffusion API를 활용한 가상의류 피팅 서비스
 Stable diffusion에서 제공하는 inpaint(image to image) 기능을 활용하여, 
 전신사진 속 원하는 의상만 변경할 수 있는 서비스 입니다.

1. 전신 사진을 업로드 한 후, 이미지 위에 원하는 부분을 마스킹합니다.
2. 마스킹이 끝나면 원하는 의상을 선택합니다.
3. 마스킹과 의상 선택이 끝나면 '이미지 생성' 버튼을 눌러 변경 된 이미지를 확인합니다.

# 기술 스택

1. Next Js 13.2.4
2. TypeScript
3. Tailwind
4. Recoil
5. AWS S3
6. Stable diffusion API
