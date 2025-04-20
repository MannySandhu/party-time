import { z } from 'zod';

export const Geolocation = z.object({
    area_labels: z.array(z.string()).optional(),
    lat: z.number(),
    lon: z.number()
});