import { z } from 'zod';

export const OpenMateoWeatherSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  daily_units: z.object({
    time: z.string(),
    temperature_2m_mean: z.string(),
    precipitation_sum: z.string(),
    windspeed_10m_max: z.string()
  }),
  daily: z.object({
    time: z.array(z.string()),
    temperature_2m_mean: z.array(z.number()),
    precipitation_sum: z.array(z.number()),
    windspeed_10m_max: z.array(z.number())
  })
});
