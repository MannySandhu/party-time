import nock from "nock";
import { getWeatherFromOpenMateoAPI } from "../../src/services/weatherService/getWeatherFromOpenMateoAPI.js";
import { OpenMateoWeatherSchema } from "../../src/models/weather.schema";

describe('Weather Service', () => {
  describe('GET', () => {
    beforeAll(() => {
      nock('https://api.open-meteo.com')
        .get('/v1/forecast')
        .query(true)
        .reply(200, {
          latitude: 51.4,
          longitude: -0.22,
          utc_offset_seconds: 0,
          timezone: 'GMT',
          timezone_abbreviation: 'GMT',
          elevation: 31,
          daily_units: {
            time: 'iso8601',
            temperature_2m_mean: '°C',
            precipitation_sum: 'mm',
            windspeed_10m_max: 'km/h'
          },
          daily: {
            time: [
              '2025-04-17',
              '2025-04-18',
              '2025-04-19',
              '2025-04-20',
              '2025-04-21',
              '2025-04-22',
              '2025-04-23'
            ],
            temperature_2m_mean: [
              11.5, 12.4,
              11.3, 12.6,
              12.3, 11.5,
              13.9
            ],
            precipitation_sum: [
              0, 0.5, 4.8, 0,
              1.5, 0.9, 0
            ],
            windspeed_10m_max: [
              14, 18.4, 16.6,
              8.4, 14.3, 13.9,
              20.5
            ]
          }
        })
    });
    
    test('Retrieves open mateo weather with status 200', async () => {
    
      const coordinates = { lat: 51.4, lon: -0.22 }
      const result = await getWeatherFromOpenMateoAPI(coordinates);
      const validated = OpenMateoWeatherSchema.safeParse(result.data);

      expect(result.status).toBe(200);
      expect(result.data).toEqual(validated.data);
    });

    // test('Fail validation when latitude is undefined with status 400', async () => {

    //   const coordinates = { lat: 51.4, lon: -0.22 }
    //   const result = await getWeatherFromOpenMateo(coordinates);
    //   const invalidResult = { ...result.data, latitude: undefined }
    //   const validated = OpenMateoWeatherSchema.safeParse(invalidResult.data);

    //   expect(validated.success).toBe(false);

    //   try {
    //     expect(() => OpenMateoWeatherSchema.parse(invalidResult.data)).toThrow();
    //   } catch (error) {
    //     expect(error.status).toBe(400);
    //     expect(error.message).toBe("Weather data from Open-Meteo API failed validation");
    //   }

    // });

    afterAll(() => {
      nock.cleanAll();
    });
  });
});
