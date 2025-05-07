import { z } from 'zod';
import { OpenMateoWeatherSchema } from './weather.schema.js';
import { VenuesSchema } from './venues.schema.js';

export const EventSchema = z.object({
  eventName: z.string().min(1),
  location: z.string().min(1),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  radius: z.number().min(1),
  groupSize: z.number().min(1),
  preferences: z.array(z.enum(["bar", "pub", "club", "restaurant"])),
  date: z.string().min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  finalized: z.boolean().optional(),

  weather: OpenMateoWeatherSchema.optional(),
  venues: z.array(VenuesSchema).optional()
});
