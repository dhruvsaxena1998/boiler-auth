CREATE TABLE `sessions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`hashed_token` varchar(128) NOT NULL,
	`user_id` int unsigned NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` datetime,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `sessions_hashed_token_unique` UNIQUE(`hashed_token`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;