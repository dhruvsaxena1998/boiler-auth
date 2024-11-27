import { z } from "@hono/zod-openapi";
import dayjs from "dayjs";
import {
  datetime,
  int,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { usersTable } from "./users.sql";

export const sessionsTable = mysqlTable("sessions", {
  id: int({ unsigned: true }).primaryKey().autoincrement(),
  hashed_token: varchar({ length: 128 }).notNull().unique(),
  user_id: int({ unsigned: true })
    .references(() => usersTable.id)
    .notNull(),
  expires: datetime().notNull(),
  created_at: datetime().$default(() => dayjs().toDate()),
});

export const selectSessionsSchema = createSelectSchema(sessionsTable)
  .extend({
    token: z.string(),
  })
  .omit({
    created_at: true,
    hashed_token: true,
  });
export type SelectSessionsSchema = z.infer<typeof selectSessionsSchema>;

export const insertSessionsSchema = createInsertSchema(sessionsTable);
export type InsertSessionsSchema = z.infer<typeof insertSessionsSchema>;
