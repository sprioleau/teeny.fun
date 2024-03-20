import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import LinkMiddleware from "./lib/middleware/link";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// export default clerkMiddleware();
export default clerkMiddleware((auth, req) => {
	if (!isProtectedRoute(req)) {
		auth().protect();
	}

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
