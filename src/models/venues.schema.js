import { z } from "zod";

export const VenuesSchema = z.object({
  business_status: z.string(),
  geometry: z.object({
    location: z.object({
      lat: z.number(),
      lng: z.number()
    })
  }),
  name: z.string(),
  vicinity: z.string(),
  place_id: z.string(),
  opening_hours: z.object({
    open_now: z.boolean()
  }).optional(),
  rating: z.number().optional(),
  user_ratings_total: z.number().optional(),
  photos: z.array(z.object({
    photo_reference: z.string()
  })).optional()
});

// Google Places API Wrapper
export const GooglePlacesAPISchema = z.object({
  results: z.array(VenuesSchema),
  status: z.string()
});
