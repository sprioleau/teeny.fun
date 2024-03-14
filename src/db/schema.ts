import { relations } from "drizzle-orm";
import { integer, serial, uuid } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	authProviderId: text("auth_provider_id").notNull().unique(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const metadata = pgTable("metadata", {
	id: serial("id").primaryKey(),
	title: text("title"),
	description: text("description"),
	image: text("image"),
	icon: text("icon"),
	url: text("url"),
});

export const urls = pgTable("urls", {
	id: serial("id").primaryKey(),
	destinationUrl: text("destination_url").notNull(),
	code: text("code").notNull(),
	codePoints: text("code_points").unique().notNull(),
	visits: integer("visits").default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),

	userAuthProviderId: text("user_auth_provider_id").references(() => users.authProviderId),

	userId: uuid("user_id")
		.notNull()
		.references(() => users.id),

	metadataId: serial("metadata_id")
		.notNull()
		.references(() => metadata.id),
});

export const userRelations = relations(users, ({ many }) => ({
	urls: many(urls),
}));

export const urlRelations = relations(urls, ({ one }) => ({
	user: one(users, { fields: [urls.userId], references: [users.id] }),
	metadata: one(metadata, { fields: [urls.metadataId], references: [metadata.id] }),
}));
