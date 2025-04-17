import request from "supertest";
import nock from "nock";
import app from "../src/app";

describe('/api/v1/weather', () => {
    describe('GET', () => {
        beforeAll(() => {
            nock('https://api.open-meteo.com')
                .get('/v1/forecast')
                .query(true)
                .reply(200, {
                    latitude: 51.4,
                    longitude: -0.22000003,
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
                        1.5, 0.9,   0
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
            const result = await request(app)
                .post('/api/v1/weather')
                .send({ lat: 51.4, lon: -0.22000003 });
                
            expect(result.status).toBe(200);

            expect(result.body).toHaveProperty('latitude', 51.4);
            expect(result.body).toHaveProperty('longitude', -0.22000003);

            expect(result.body.daily).toHaveProperty('time');
            expect(result.body.daily).toHaveProperty('temperature_2m_mean');
            expect(result.body.daily).toHaveProperty('precipitation_sum');
            expect(result.body.daily).toHaveProperty('windspeed_10m_max');

            expect(result.body.daily.time.length).toBe(7);
            expect(result.body.daily.temperature_2m_mean.length).toBe(7);
            expect(result.body.daily.precipitation_sum.length).toBe(7);
            expect(result.body.daily.windspeed_10m_max.length).toBe(7);
        });

        afterAll(() => {
            nock.cleanAll();
        });
    });
});