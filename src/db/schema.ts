import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	authProviderId: text("auth_provider_id").notNull().unique(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userSelectSchema = createSelectSchema(users);
export const userInsertSchema = createInsertSchema(users);

export const metadata = pgTable("metadata", {
	id: serial("id").primaryKey(),
	url: text("url").unique().notNull(),
	title: text("title"),
	description: text("description"),
	image: text("image"),
	icon: text("icon"),
});

export const metadataSelectSchema = createSelectSchema(metadata);
export const metadataInsertSchema = createInsertSchema(metadata);

export const urls = pgTable("urls", {
	id: serial("id").primaryKey(),
	clientKey: text("client_key"),
	destinationUrl: text("destination_url").notNull(),
	code: text("code").notNull(),
	codePoints: text("code_points").unique().notNull(),
	visits: integer("visits").default(0).notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),

	userAuthProviderId: text("user_auth_provider_id").references(() => users.authProviderId),

	userId: uuid("user_id").references(() => users.id),

	metadataId: serial("metadata_id")
		.notNull()
		.references(() => metadata.id),
});

export const urlSelectSchema = createSelectSchema(urls);
export const urlWithMetadataSelectSchema = urlSelectSchema
	.merge(
		z.object({
			createdAt: z.coerce.date(),
			updatedAt: z.coerce.date(),
		})
	)
	.and(z.object({ metadata: metadataSelectSchema }));
export const urlInsertSchema = createInsertSchema(urls);

export const userRelations = relations(users, ({ many }) => ({
	urls: many(urls),
}));

export const urlRelations = relations(urls, ({ one }) => ({
	user: one(users, { fields: [urls.userId], references: [users.id] }),
	metadata: one(metadata, { fields: [urls.metadataId], references: [metadata.id] }),
}));
