import type { z } from "@hono/zod-openapi";

import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = mysqlTable("users", {
  id: int({ unsigned: true }).primaryKey().autoincrement(),
});

export const selectUsersSchema = createSelectSchema(users);
export type SelectUsersSchema = z.infer<typeof selectUsersSchema>;

export const insertUsersSchema = createInsertSchema(users);
export type InsertUsersSchema = z.infer<typeof insertUsersSchema>;
