import { clerkMiddleware } from "@clerk/nextjs/server";
import LinkMiddleware from "@/lib/middleware/link";

export default clerkMiddleware((auth, req) => {
	return LinkMiddleware(req);
});

export const config = {
	// prettier-ignore
	matcher: [
		"/((?!.*\\..*|_next).*)", // Don't run middleware on static files
		"/"                     , // Run middleware on index page
		// "/(api|trpc)(.*)"       , // Run middleware on API routes
	],
};
