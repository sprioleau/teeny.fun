import { type NextRequest } from "next/server";
import LinkMiddleware from "~/lib/middleware/link";

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api/ routes
		 * 2. /auth/ routes
		 * 3. /_next/ (Next.js internals)
		 * 4. /_vercel (Vercel internals)
		 */
		"/((?!api/|auth/|_next/|_vercel|[\\w-]+\\.\\w+).*)",
	],
};

export default async function middleware(req: NextRequest) {
	// TODO: Check req.nextUrl.pathname against and add additional middlewares to handle
	return LinkMiddleware(req);
}
