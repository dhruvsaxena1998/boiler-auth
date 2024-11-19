import type { z } from "@hono/zod-openapi";

import { datetime, int, mysqlTable, text } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { users } from "./users.sql";

export const sessions = mysqlTable("sessions", {
  id: int({ unsigned: true }).primaryKey().autoincrement(),
  token: text().notNull(),
  user_id: int({ unsigned: true })
    .references(() => users.id)
    .notNull(),
  expires: datetime().notNull(),
});

export const selectSessionsSchema = createSelectSchema(sessions);
export type SelectSessionsSchema = z.infer<typeof selectSessionsSchema>;

export const insertSessionsSchema = createInsertSchema(sessions);
export type InsertSessionsSchema = z.infer<typeof insertSessionsSchema>;
