import { metadata, urls, users } from "./schema";

export type User = typeof users.$inferSelect;
export type Url = typeof urls.$inferSelect;
export type UrlWithMetadata = Url & { metadata: Metadata };
export type Metadata = typeof metadata.$inferSelect;
