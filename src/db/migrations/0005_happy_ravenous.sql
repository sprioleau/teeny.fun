ALTER TABLE "metadata" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_url_unique" UNIQUE("url");