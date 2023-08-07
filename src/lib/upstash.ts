import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/env.mjs";

const redis = new Redis({
	url: env.UPSTASH_REDIS_REST_URL,
	token: env.UPSTASH_REDIS_REST_TOKEN,
});

export function ratelimit(requests = 10, seconds: `${number} s` = "10 s") {
	return env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
		? new Ratelimit({
				redis: redis,
				limiter: Ratelimit.slidingWindow(requests, seconds),
		  })
		: {
				limit: () => ({ success: true }),
		  };
}
