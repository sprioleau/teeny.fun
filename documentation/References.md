Cannot use environment variables in drizle.config.ts
[https://github.com/t3-oss/t3-env/issues/180](https://github.com/t3-oss/t3-env/issues/180)
[https://github.com/drizzle-team/drizzle-orm/issues/654](https://github.com/drizzle-team/drizzle-orm/issues/654)
[https://github.com/nextauthjs/next-auth/discussions/8996](https://github.com/nextauthjs/next-auth/discussions/8996)

Barrel files prevent next from properly splitting client and server code. So, server components and client components get exported from "src/components" and the DATABASE_URL ends up on the client.
[https://github.com/vercel/next.js/discussions/50549](https://github.com/vercel/next.js/discussions/50549)

Route Handlers throwing "Invalid URL" error
[https://nextjs.org/docs/messages/invalid-page-config](https://nextjs.org/docs/messages/invalid-page-config)
