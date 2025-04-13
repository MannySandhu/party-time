import axios from "axios";

export const getLocationFromGeoService =  async (req, res) => {
    try {
        const res = await axios.post(process.env.LOCATION_API_PLACEHOLDER, {
            latitude: lat, 
            longitude: long
        })
        return res.data;
    } catch (err) {
        throw err;
    }
}
