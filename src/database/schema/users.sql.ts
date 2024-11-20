import type { z } from "@hono/zod-openapi";

import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const usersTable = mysqlTable("users", {
  id: int({ unsigned: true }).primaryKey().autoincrement(),
});

export const selectUsersSchema = createSelectSchema(usersTable);
export type SelectUsersSchema = z.infer<typeof selectUsersSchema>;

export const insertUsersSchema = createInsertSchema(usersTable);
export type InsertUsersSchema = z.infer<typeof insertUsersSchema>;
