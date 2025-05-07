import mongoose from "mongoose";

const CoordinatesSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { _id: false });

const WeatherSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  utc_offset_seconds: Number,
  timezone: String,
  timezone_abbreviation: String,
  elevation: Number,
  daily_units: {
    time: String,
    temperature_2m_mean: String,
    precipitation_sum: String,
    windspeed_10m_max: String
  },
  daily: {
    time: [String],
    temperature_2m_mean: [Number],
    precipitation_sum: [Number],
    windspeed_10m_max: [Number]
  }
}, { _id: false });

const VenueSchema = new mongoose.Schema({
  business_status: String,
  geometry: {
    location: {
      lat: Number,
      lng: Number
    }
  },
  name: String,
  vicinity: String,
  place_id: String,
  opening_hours: {
    open_now: Boolean
  },
  rating: Number,
  user_ratings_total: Number,
  photos: [{
    photo_reference: String
  }]
}, { _id: false });

const EventSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  eventName: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: { type: CoordinatesSchema, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  groupSize: { type: Number, required: true },
  preferences: [{ type: String, enum: ["bar", "pub", "club", "restaurant"], required: true }],
  weather: { type: WeatherSchema, required: true },
  venues: { type: [VenueSchema], required: true },
  cacheKey: { type: String, required: false },
  finalized: { type: Boolean, default: false }
}, { timestamps: true });

export const EventModel = mongoose.model("Event", EventSchema);
