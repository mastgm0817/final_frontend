
# BUILD STAGE
FROM node:18.16.0-alpine as base_image

FROM base_image 
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json .
RUN npm i

FROM base_image AS builder
WORKDIR /app
COPY . .
COPY --from=base_image /app/node_modules ./node_modules
COPY .env.production .env.production

# build 진행
RUN npm run build

FROM base_image AS runner
WORKDIR /app
# 보안 문제가 발생할 수 있으므로 도커 컨테이너 내에서 루트 권한으로 서버 프로세스를 실행하지 않는 것이 좋다.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# standalone 폴더 및 정적 파일 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]


# # ========================================
# # NGINX STAGE
# # ========================================
	@@ -23,7 +42,7 @@ COPY nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=runner ./* .

EXPOSE 80
