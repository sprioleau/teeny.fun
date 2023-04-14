import { type NextRequest } from "next/server";
import LinkMiddleware from "~/lib/middleware/link";

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api/ routes
		 * 2. /auth/ routes
		 * 3. /_static (static files)
		 * 4. /_next (Next.js internals)
		 * 5. /_vercel (Vercel internals)
		 */
		"/((?!api/|auth/|_static|_next|_vercel|[\\w-]+\\.\\w+).*)",
	],
};

export default async function middleware(req: NextRequest) {
	// TODO: Check req.nextUrl.pathname against and add additional middlewares to handle
	return LinkMiddleware(req);
}
