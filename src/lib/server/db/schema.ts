import { pgTable, text, timestamp, boolean, integer, pgEnum, json, index, uniqueIndex, primaryKey } from "drizzle-orm/pg-core";

export const gameRoomStatusEnum = pgEnum("game_room_status", ["waiting", "playing", "ended"]);
export const gameRoomModeEnum = pgEnum("game_room_mode", ["Easy", "Normal", "Hard", "Skibidi Toilet"]);
export const userRoleEnum = pgEnum("user_role", ["User", "Admin"]);
export const playerTypeEnum = pgEnum("player_type", ["user", "guest"]);

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	rankScore: integer("rank_score").notNull().default(0),
	role: userRoleEnum("role").notNull().default("User"),
});

export const verifications = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at")
});

export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

// --- Game Tables ---
export const players = pgTable("players", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	type: playerTypeEnum("type").notNull(),
	userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
	guestName: text("guest_name"),
	avatar: text("avatar"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [index("players_user_idx").on(table.userId)]);

export const gameRooms = pgTable("game_rooms", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	joinCode: text("join_code").notNull().unique(),
	status: gameRoomStatusEnum("status").notNull().default("waiting"),
	mode: gameRoomModeEnum("mode").notNull().default("Normal"),
	algorithm: text("algorithm").notNull(),
	initialArray: json("initial_array").notNull(),
	maxPlayers: integer("max_players").notNull().default(4),
	isPrivate: boolean("is_private").notNull().default(false),
	hostPlayerId: text("host_player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => [index("rooms_host_idx").on(table.hostPlayerId)]);

export const roomParticipants = pgTable("room_participants", {
	roomId: text("room_id").notNull().references(() => gameRooms.id, { onDelete: "cascade" }),
	playerId: text("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
	isReady: boolean("is_ready").notNull().default(false),
	score: integer("score").default(0),
	rank: integer("rank"),
	finishedAt: timestamp("finished_at"),
	joinedAt: timestamp("joined_at").notNull().defaultNow(),
}, (table) => [
	primaryKey({ columns: [table.roomId, table.playerId] }),
	index("participants_room_idx").on(table.roomId),
	index("participants_player_idx").on(table.playerId),
]);

export const matchSteps = pgTable("match_steps", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	roomId: text("room_id").notNull().references(() => gameRooms.id, { onDelete: "cascade" }),
	playerId: text("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
	stepNumber: integer("step_number").notNull(),
	currentArray: json("current_array").notNull(),
	isCorrect: boolean("is_correct").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => [
	uniqueIndex("step_unique").on(table.roomId, table.playerId, table.stepNumber),
	index("steps_room_idx").on(table.roomId),
	index("steps_player_idx").on(table.playerId),
]);