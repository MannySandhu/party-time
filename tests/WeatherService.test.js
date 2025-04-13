import { getWeatherFromOpenMateo } from "../src/services/WeatherService";

describe('/api/v1/weather', () => {
    describe('GET', () => {
        beforeAll(() => {
            nock('https://api.open-meteo.com')
            .get('v1/forcast')
            .query(true)
            .reply(200, {
                
            })
        });

        test('Retrieves open mateo weather with status 200', ()=>{

        })

        afterAll(() => {

        });
    });
});