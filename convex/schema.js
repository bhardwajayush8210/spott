import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
// import { ca } from "date-fns/locale/ca";
// import { sl } from "date-fns/locale/sl";
// import { QrCode } from "lucide-react";

export default defineSchema({
  //Users Table
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(), //clerk user ID for auth
    email: v.string(),
    imageUrl: v.optional(v.string()),

    //Onboarding
    hasCompletedOnboarding: v.boolean(),
    location: v.optional(
      v.object({
        city: v.string(),
        state: v.optional(v.string()),
        country: v.string(),
      }),
    ),

    interests: v.optional(v.array(v.string())), //MIN 3 interests

    // Organizer tracking (User Subscriptions)
    freeEventsCreated: v.number(), //number of free events created(1 free)

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_token", ["tokenIdentifier"]),

  //Events Table
  events: defineTable({
    title: v.string(),
    description: v.string(),
    slug: v.string(),

    // Organizer
    organizerId: v.id("users"), //user ID of organizer
    organizerName: v.string(),

    // Event Details
    category: v.string(),
    tags: v.array(v.string()),

    // Date & Time
    startDate: v.number(),
    endDate: v.number(),
    timezone: v.string(),

    // Location
    locationType: v.union(v.literal("physical"), v.literal("online")),
    venue: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.string(),
    state: v.optional(v.string()),
    country: v.string(),

    // Capacity & Ticketing
    capacity: v.number(),
    ticketType: v.union(v.literal("free"), v.literal("paid")),
    ticketPrice: v.optional(v.number()), // paid at event
    registrationCount: v.number(),

    //customization
    coverImage: v.optional(v.string()),
    themeColor: v.optional(v.string()),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organizer", ["organizerId"])
    .index("by_category", ["category"])
    .index("by_start_date", ["startDate"])
    .index("by_slug", ["slug"])
    .searchIndex("search_title", { searchField: "title" }),

  registrations: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),

    // Attendee Info
    attendeeName: v.string(),
    attendeeEmail: v.string(),

    // QR Code & Check-in
    qrCode: v.string(), // Unique QR code for each registration

    // check-in
    checkedIn: v.boolean(),
    checkedInAt: v.optional(v.number()),

    //Status
    status: v.union(v.literal("confirmed"), v.literal("cancelled")),
    registered: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_event", ["eventId"])
    .index("by_qr_code", ["qrCode"])
    .index("by_event_user", ["eventId", "userId"]),
});
