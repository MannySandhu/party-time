export const EventSchema = z.object({
    _id: z.string().optional(),
    userId: z.string(),
    eventName: z.string().min(1),
    location: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }),
    startTime: z.string(),
    endTime: z.string(),
    groupSize: z.number(),
    preferences: z.array(z.enum(["bar", "pub", "club", "restaurant"])),
    weather: Weather,
    venues: z.array(PartyVenueSchema),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    finalized: z.boolean().default(false)
  });
  