const saveUserEvent = async () => {

    // const {
    //     coordinates,
    //     radius,
    //     preferences
    // } = event;

    // try {
    //     const weatherResponse = await getWeatherFromOpenMateo(
    //         coordinates
    //     );
    //     const weatherResult = EventSchema.safeParse(weatherResponse.data);

    //     const venuesResponse = await getPlacesFromGooglePlacesAPI(
    //         coordinates,
    //         radius,
    //         preferences
    //     );
    //     const venuesResult = EventSchema.safeParse(venuesResponse.data);

    //     const event = {
    //         userId: event.userId,
    //         eventName: event.eventName,
    //         location: event.location,
    //         coordinates: { lat: coordinates.lat, lng: coordinates.lon },
    //         startTime: event.startTime,
    //         endTime: event.endTime,
    //         groupSize: event.groupSize,
    //         preferences: event.preferences,
    //         weather: weatherResult.data,
    //         venues: venuesResult.data,
    //         finalized: event.finalized
    //     };

    //     logger.info(`Event created.`);
    //     return { 'data': event, 'status': 200 };

    // } catch (err) {
    //     const status = err.response?.status || 500;
    //     const message = err.response?.data?.message || err.message || 'Failed to create event.';
    //     const error = new Error(message);
    //     error.statusCode = status;
    //     throw error;
    // }
}

export default saveUserEvent;
