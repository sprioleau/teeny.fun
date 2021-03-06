const deployedUrl = "http://localhost:3000";

export const isDevelopment = process.env.NODE_ENV === "development";

export const ROOT_URL = isDevelopment ? "http://localhost:3000" : deployedUrl;

export const STRINGS = {
	TEENY_URLS: "teeny_urls",
};

// Source: https://www.makeuseof.com/top-emojis-explained-cheat-sheet/
// Removed emojis with multiple skin tones
export const topEmojis: string[] = [
	"π",
	"β€οΈ",
	"π€£",
	// "π",
	"π­",
	// "π",
	"π",
	"π₯°",
	"π",
	"π",
	"π",
	"π",
	"π",
	"π₯Ί",
	"π",
	"π₯",
	"βΊοΈ",
	// "π€¦",
	"β₯οΈ",
	// "π€·",
	"π",
	"π",
	"π€",
	"π",
	"π",
	"π€",
	// "π",
	"π",
	"π³",
	"π₯³",
	"π",
	// "π",
	"π",
	"π",
	// "πͺ",
	"β¨",
	"π",
	"π",
	"π",
	"π",
	"π’",
	// "π",
	"π",
	"π©",
	"π―",
	"πΉ",
	"π",
	"π",
	"π",
	"π",
	"π‘",
	"π",
	"π",
	"π",
	// "π€",
	"π",
	"π€€",
	// "π",
	"π€ͺ",
	"β£οΈ",
	"π",
	"π",
	"π",
	// "π",
	"π",
	"π",
	"π",
	"π€©",
	"π",
	"π¬",
	"π±",
	"π΄",
	"π€­",
	"π",
	"π",
	"π",
	"π",
	"πΈ",
	"π",
	"πΆ",
	"βοΈ",
	"π",
	"π₯΅",
	"π",
	"π",
	"βοΈ",
	"π€",
	"π°",
	"π",
	"π",
	"π",
	"π₯",
	// "π",
	"βΉοΈ",
	"π",
	"π₯΄",
	// "π",
	"π©",
	"β",
];