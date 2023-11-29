ALTER TABLE user ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE user ADD `is_admin` integer;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);