import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const id = () => uuid("id").defaultRandom().primaryKey();
const createdAt = () => timestamp("created_at", { withTimezone: true }).defaultNow().notNull();
const updatedAt = () => timestamp("updated_at", { withTimezone: true }).defaultNow().notNull();

export const userStatus = pgEnum("user_status", ["active", "blocked", "deleted"]);
export const titleType = pgEnum("title_type", ["movie", "series"]);
export const contentSourceType = pgEnum("content_source_type", ["telegram", "rubika", "backup"]);
export const contentSourceStatus = pgEnum("content_source_status", ["unconfigured", "active", "disabled"]);
export const subscriptionStatus = pgEnum("subscription_status", ["trialing", "active", "past_due", "canceled"]);
export const ticketStatus = pgEnum("ticket_status", ["open", "in_progress", "resolved", "closed"]);
export const reportStatus = pgEnum("report_status", ["open", "reviewing", "resolved", "dismissed"]);

export const users = pgTable("users", {
  id: id(),
  phone: text("phone").notNull(),
  status: userStatus("status").default("active").notNull(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [uniqueIndex("users_phone_idx").on(table.phone)]);

export const profiles = pgTable("profiles", {
  id: id(), userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name").notNull(), avatarUrl: text("avatar_url"), locale: text("locale").default("fa-IR").notNull(),
  createdAt: createdAt(), updatedAt: updatedAt(),
});

export const familyProfiles = pgTable("family_profiles", {
  id: id(), userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(), avatarUrl: text("avatar_url"), isKidsProfile: boolean("is_kids_profile").default(false).notNull(),
  createdAt: createdAt(), updatedAt: updatedAt(),
});

export const genres = pgTable("genres", { id: id(), slug: text("slug").notNull(), name: text("name").notNull(), createdAt: createdAt() }, (table) => [uniqueIndex("genres_slug_idx").on(table.slug)]);

export const titles = pgTable("titles", {
  id: id(), type: titleType("type").notNull(), nameFa: text("name_fa").notNull(), nameEn: text("name_en"), slug: text("slug").notNull(), synopsis: text("synopsis"), posterUrl: text("poster_url"), backdropUrl: text("backdrop_url"), releaseYear: integer("release_year"), durationMinutes: integer("duration_minutes"), isPublished: boolean("is_published").default(false).notNull(),
  createdAt: createdAt(), updatedAt: updatedAt(),
}, (table) => [uniqueIndex("titles_slug_idx").on(table.slug)]);

export const movies = pgTable("movies", { titleId: uuid("title_id").primaryKey().references(() => titles.id, { onDelete: "cascade" }), sourceRef: text("source_ref"), createdAt: createdAt() });
export const series = pgTable("series", { titleId: uuid("title_id").primaryKey().references(() => titles.id, { onDelete: "cascade" }), totalSeasons: integer("total_seasons"), createdAt: createdAt() });
export const seasons = pgTable("seasons", { id: id(), seriesId: uuid("series_id").notNull().references(() => series.titleId, { onDelete: "cascade" }), number: integer("number").notNull(), name: text("name"), createdAt: createdAt() });
export const episodes = pgTable("episodes", { id: id(), seasonId: uuid("season_id").notNull().references(() => seasons.id, { onDelete: "cascade" }), number: integer("number").notNull(), title: text("title").notNull(), durationMinutes: integer("duration_minutes"), sourceRef: text("source_ref"), createdAt: createdAt() });

export const actors = pgTable("actors", { id: id(), nameFa: text("name_fa").notNull(), nameEn: text("name_en"), photoUrl: text("photo_url"), createdAt: createdAt() });
export const directors = pgTable("directors", { id: id(), nameFa: text("name_fa").notNull(), nameEn: text("name_en"), photoUrl: text("photo_url"), createdAt: createdAt() });
export const titleGenres = pgTable("title_genres", { titleId: uuid("title_id").notNull().references(() => titles.id, { onDelete: "cascade" }), genreId: uuid("genre_id").notNull().references(() => genres.id, { onDelete: "cascade" }) }, (table) => [primaryKey({ columns: [table.titleId, table.genreId] })]);
export const titleActors = pgTable("title_actors", { titleId: uuid("title_id").notNull().references(() => titles.id, { onDelete: "cascade" }), actorId: uuid("actor_id").notNull().references(() => actors.id, { onDelete: "cascade" }), characterName: text("character_name") }, (table) => [primaryKey({ columns: [table.titleId, table.actorId] })]);
export const titleDirectors = pgTable("title_directors", { titleId: uuid("title_id").notNull().references(() => titles.id, { onDelete: "cascade" }), directorId: uuid("director_id").notNull().references(() => directors.id, { onDelete: "cascade" }) }, (table) => [primaryKey({ columns: [table.titleId, table.directorId] })]);

export const watchHistory = pgTable("watch_history", { id: id(), userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), titleId: uuid("title_id").references(() => titles.id, { onDelete: "cascade" }), episodeId: uuid("episode_id").references(() => episodes.id, { onDelete: "cascade" }), watchedAt: timestamp("watched_at", { withTimezone: true }).defaultNow().notNull() });
export const watchProgress = pgTable("watch_progress", { id: id(), userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), titleId: uuid("title_id").references(() => titles.id, { onDelete: "cascade" }), episodeId: uuid("episode_id").references(() => episodes.id, { onDelete: "cascade" }), positionSeconds: integer("position_seconds").default(0).notNull(), completed: boolean("completed").default(false).notNull(), updatedAt: updatedAt() });
export const watchlist = pgTable("watchlist", { userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), titleId: uuid("title_id").notNull().references(() => titles.id, { onDelete: "cascade" }), createdAt: createdAt() }, (table) => [primaryKey({ columns: [table.userId, table.titleId] })]);
export const downloads = pgTable("downloads", { id: id(), userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), titleId: uuid("title_id").references(() => titles.id, { onDelete: "cascade" }), episodeId: uuid("episode_id").references(() => episodes.id, { onDelete: "cascade" }), deviceId: text("device_id").notNull(), status: text("status").notNull(), createdAt: createdAt() });
export const ratings = pgTable("ratings", { id: id(), userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), titleId: uuid("title_id").notNull().references(() => titles.id, { onDelete: "cascade" }), score: integer("score").notNull(), createdAt: createdAt(), updatedAt: updatedAt() }, (table) => [uniqueIndex("ratings_user_title_idx").on(table.userId, table.titleId)]);
export const reels = pgTable("reels", { id: id(), title: text("title"), caption: text("caption"), mediaUrl: text("media_url").notNull(), sourceRef: text("source_ref"), isPublished: boolean("is_published").default(false).notNull(), createdAt: createdAt(), updatedAt: updatedAt() });
export const comments = pgTable("comments", { id: id(), userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), titleId: uuid("title_id").references(() => titles.id, { onDelete: "cascade" }), reelId: uuid("reel_id").references(() => reels.id, { onDelete: "cascade" }), body: text("body").notNull(), createdAt: createdAt(), updatedAt: updatedAt() });

export const liveChannels = pgTable("live_channels", { id: id(), name: text("name").notNull(), logoUrl: text("logo_url"), streamUrl: text("stream_url"), isActive: boolean("is_active").default(false).notNull(), createdAt: createdAt(), updatedAt: updatedAt() });
export const liveSchedules = pgTable("live_schedules", { id: id(), channelId: uuid("channel_id").notNull().references(() => liveChannels.id, { onDelete: "cascade" }), title: text("title").notNull(), startsAt: timestamp("starts_at", { withTimezone: true }).notNull(), endsAt: timestamp("ends_at", { withTimezone: true }), createdAt: createdAt() });
export const rooms = pgTable("rooms", { id: id(), ownerId: uuid("owner_id").notNull().references(() => users.id), name: text("name").notNull(), isActive: boolean("is_active").default(true).notNull(), createdAt: createdAt(), updatedAt: updatedAt() });
export const roomMembers = pgTable("room_members", { roomId: uuid("room_id").notNull().references(() => rooms.id, { onDelete: "cascade" }), userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), joinedAt: createdAt() }, (table) => [primaryKey({ columns: [table.roomId, table.userId] })]);
export const notifications = pgTable("notifications", { id: id(), userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), type: text("type").notNull(), payload: jsonb("payload").$type<Record<string, unknown>>().notNull(), readAt: timestamp("read_at", { withTimezone: true }), createdAt: createdAt() });

export const collections = pgTable("collections", { id: id(), name: text("name").notNull(), description: text("description"), isPublic: boolean("is_public").default(false).notNull(), createdAt: createdAt(), updatedAt: updatedAt() });
export const collectionTitles = pgTable("collection_titles", { collectionId: uuid("collection_id").notNull().references(() => collections.id, { onDelete: "cascade" }), titleId: uuid("title_id").notNull().references(() => titles.id, { onDelete: "cascade" }), position: integer("position").default(0).notNull() }, (table) => [primaryKey({ columns: [table.collectionId, table.titleId] })]);
export const subscriptions = pgTable("subscriptions", { id: id(), userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), provider: text("provider").notNull(), providerCustomerId: text("provider_customer_id"), planCode: text("plan_code").notNull(), status: subscriptionStatus("status").notNull(), currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }), createdAt: createdAt(), updatedAt: updatedAt() });
export const reports = pgTable("reports", { id: id(), reporterId: uuid("reporter_id").notNull().references(() => users.id), targetType: text("target_type").notNull(), targetId: uuid("target_id").notNull(), reason: text("reason").notNull(), status: reportStatus("status").default("open").notNull(), createdAt: createdAt(), resolvedAt: timestamp("resolved_at", { withTimezone: true }) });
export const supportTickets = pgTable("support_tickets", { id: id(), userId: uuid("user_id").notNull().references(() => users.id), subject: text("subject").notNull(), body: text("body").notNull(), status: ticketStatus("status").default("open").notNull(), createdAt: createdAt(), updatedAt: updatedAt() });
export const analyticsEvents = pgTable("analytics_events", { id: id(), userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }), eventName: text("event_name").notNull(), properties: jsonb("properties").$type<Record<string, unknown>>().notNull(), occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull() });
export const auditLogs = pgTable("audit_logs", { id: id(), actorUserId: uuid("actor_user_id").references(() => users.id, { onDelete: "set null" }), action: text("action").notNull(), entityType: text("entity_type").notNull(), entityId: uuid("entity_id"), metadata: jsonb("metadata").$type<Record<string, unknown>>(), createdAt: createdAt() });
export const contentSources = pgTable("content_sources", { id: id(), type: contentSourceType("type").notNull(), name: text("name").notNull(), status: contentSourceStatus("status").default("unconfigured").notNull(), config: jsonb("config").$type<Record<string, unknown>>().notNull(), createdAt: createdAt(), updatedAt: updatedAt() });

export type User = typeof users.$inferSelect;
export type Title = typeof titles.$inferSelect;