import {
	pgTable,
	text,
	integer,
	timestamp,
	uniqueIndex,
	index,
	pgEnum,
	primaryKey,
	boolean,
	json
} from 'drizzle-orm/pg-core';


export const gameRoomStatusEnum = pgEnum("game_room_status", [
	"waiting",
	"playing",
	"ended"
]);

export const gameRoomModeEnum = pgEnum("game_room_mode", [
	"Easy",
	"Normal",
	"Hard",
	"Skibidi Toilet"
]);

export const users = pgTable('users', (t) => ({
	id: t.text().primaryKey().$defaultFn(() => crypto.randomUUID()),
	email: t.text().unique(),
	image: t.text(),
	rankScore: t.integer().notNull().default(0),
	createdAt: t.timestamp().notNull().defaultNow(),
	updatedAt: t.timestamp().notNull().defaultNow(),
}));


export const sessions = pgTable("sessions", (t) => ({
	id: t.text().primaryKey().$defaultFn(() => crypto.randomUUID()),

	token: t.text().notNull().unique(),

	ipAddress: t.text(),
	userAgent: t.text(),

	userId: t.text()
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),

	expiresAt: t.timestamp().notNull(),

	createdAt: t.timestamp().notNull().defaultNow(),
	updatedAt: t.timestamp().notNull().defaultNow(),
}), (table) => [
	index("sessions_user_idx").on(table.userId)
]);

export const accounts = pgTable("accounts", (t) => ({
	id: t.text().primaryKey().$defaultFn(() => crypto.randomUUID()),

	userId: t.text()
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),

	providerId: t.text().notNull(),
	accountId: t.text().notNull(),

	password: t.text(),

	accessToken: t.text(),
	refreshToken: t.text(),
	idToken: t.text(),

	accessTokenExpiresAt: t.timestamp(),
	refreshTokenExpiresAt: t.timestamp(),

	scope: t.text(),

	createdAt: t.timestamp().notNull().defaultNow(),
	updatedAt: t.timestamp().notNull().defaultNow(),
}), (table) => [
	uniqueIndex("provider_account_unique")
		.on(table.providerId, table.accountId),

	index("accounts_user_idx").on(table.userId)
]);

export const gameRooms = pgTable("game_rooms", (t) => ({
	id: t.text().primaryKey().$defaultFn(() => crypto.randomUUID()),

	joinCode: t.text().notNull().unique(),

	status: gameRoomStatusEnum("status")
		.notNull()
		.default("waiting"),

	mode: gameRoomModeEnum("mode")
		.notNull()
		.default("Normal"),

	algorithm: t.text().notNull(),

	initialArray: t.json().notNull(),

	hostId: t.text()
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),

	createdAt: t.timestamp().notNull().defaultNow(),
	updatedAt: t.timestamp().notNull().defaultNow(),
}), (table) => [
	index("rooms_host_idx").on(table.hostId)
]);

export const roomParticipants = pgTable("room_participants", (t) => ({
	roomId: t.text()
		.notNull()
		.references(() => gameRooms.id, { onDelete: "cascade" }),

	userId: t.text()
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),

	isReady: t.boolean().notNull().default(false),

	score: t.integer(),
	rank: t.integer(),

	finishedAt: t.timestamp(),

	joinedAt: t.timestamp().notNull().defaultNow(),
}), (table) => [
	primaryKey({ columns: [table.roomId, table.userId] }),

	index("participants_room_idx").on(table.roomId),
	index("participants_user_idx").on(table.userId)
]);

export const matchSteps = pgTable("match_steps", (t) => ({
	id: t.text().primaryKey().$defaultFn(() => crypto.randomUUID()),

	roomId: t.text()
		.notNull()
		.references(() => gameRooms.id, { onDelete: "cascade" }),

	userId: t.text()
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),

	stepNumber: t.integer().notNull(),

	currentArray: t.json().notNull(),

	isCorrect: t.boolean().notNull(),

	createdAt: t.timestamp().notNull().defaultNow(),
}), (table) => [
	uniqueIndex("step_unique")
		.on(table.roomId, table.userId, table.stepNumber),

	index("steps_room_idx").on(table.roomId),
	index("steps_user_idx").on(table.userId)
]);