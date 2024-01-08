CREATE TABLE `cable_pull_calcs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `earth_measurement` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`earth_georef` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `earth_reading` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`earth_measurement_id` integer,
	`rod_seperation` integer,
	`earth_measurement` integer,
	`measurement_photo` blob,
	FOREIGN KEY (`earth_measurement_id`) REFERENCES `earth_measurement`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `earth_drop_calcs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `com_demand` (
	`id` integer PRIMARY KEY NOT NULL,
	`project_id` integer,
	`office_lnp_va` integer,
	`office_lnp_area` integer,
	`office_acc_va` integer,
	`office_acc_area` integer,
	`okfice_acrc_va` integer,
	`office_acrc_area` integer,
	`office_aczh_va` integer,
	`office_aczh_area` integer,
	`office_acvv_va` integer,
	`office_acvv_area` integer,
	`carpark_oa_va` integer,
	`carpark_oa_area` integer,
	`carpark_oa_ev_charging` integer,
	`carpark_oa_ev_charging_area` integer,
	`carpark_basement_va` integer,
	`carpark_basement_area` integer,
	`carpark_basement_ev_charging` integer,
	`carpark_basement_ev_charging_area` integer,
	`retail_lnp_va` integer,
	`retail_lnp_area` integer,
	`retail_ac_va` integer,
	`retail_ac_area` integer,
	`warehouse_lnp_va` integer,
	`warehouse_lnp_area` integer,
	`warehouse_ventilation_va` integer,
	`warehouse_ventilation_area` integer,
	`warehouse_special_equipment` integer,
	`light_industrial_lnp_va` integer,
	`light_industrial_lnp_area` integer,
	`light_industrial_ventilation_va` integer,
	`light_industrial_ventilation_area` integer,
	`light_industrial_ac_va` integer,
	`light_industrial_ac_area` integer,
	`light_industrial_special_equipment` integer,
	`taverns_va` integer,
	`taverns_area` integer,
	`theater_va` integer,
	`theater_area` integer,
	FOREIGN KEY (`project_id`) REFERENCES `maxdemand_project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `maxdemand_project` (
	`id` integer PRIMARY KEY NOT NULL,
	`master_project_id` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`master_project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `res_demand` (
	`id` integer PRIMARY KEY NOT NULL,
	`project_id` integer,
	`no_units` integer NOT NULL,
	`interior_lighting` integer,
	`exterior_lighting` integer,
	`10a_sockets` integer,
	`15a_sockets` integer DEFAULT 10,
	`20a_sockets` integer DEFAULT 15,
	`cooking_appliances` integer,
	`heating` integer,
	`instantaneous_water_heating` integer,
	`storage_water_heating` integer,
	`pool_heating` integer,
	`communal_lighting` integer,
	`communal_sockets` integer,
	`communal_washing` integer,
	`communcal_ac` integer,
	`communcal_pool` integer,
	`electric_carcharges` integer,
	`lifts` integer,
	`motors` integer,
	`large_load` integer,
	FOREIGN KEY (`project_id`) REFERENCES `maxdemand_project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `organisation` (
	`id` text PRIMARY KEY NOT NULL,
	`organisation_name` text,
	`organisation_abn` text,
	`organisation_website` text,
	`organisation_email` text,
	`organisation_address` text
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_reference` text NOT NULL,
	`client_name` text,
	`project_location` text,
	`user_id` text,
	`has_vd_calc` integer,
	`has_md_calc` integer,
	`has_earthing_calc` integer,
	`has_cablepull_calc` integer,
	`organisation_id` text,
	`project_status` text NOT NULL,
	`project_priority` text,
	`notes` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `email_verification` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_key` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`hashed_password` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `password_verification` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token` text,
	`expires` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` blob NOT NULL,
	`idle_expires` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_profile` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text,
	`user_id` text NOT NULL,
	`profile` blob,
	`avatar_url` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`is_admin` integer,
	`organisation_id` text,
	`verified` integer,
	`recieved_email` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `voltage_drop_calcs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer,
	`cable_length` integer,
	`cable_type` text,
	`cable_resistance` integer,
	`voltage_drop` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organisation_organisation_name_unique` ON `organisation` (`organisation_name`);--> statement-breakpoint
CREATE INDEX `org_id_idx` ON `organisation` (`id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `project` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);