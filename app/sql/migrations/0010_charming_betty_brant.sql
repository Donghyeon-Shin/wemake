ALTER TABLE "team" ADD COLUMN "team_leader_id" uuid;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_team_leader_id_profiles_profile_id_fk" FOREIGN KEY ("team_leader_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "team" RENAME TO "teams";
