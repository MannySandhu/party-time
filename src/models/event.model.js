import mongoose from 'mongoose';

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

const CollaboratorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['guest', 'viewer', 'collaborator'], default: 'guest' },
  editable: { type: Boolean, default: false },
  collab: { type: Boolean, default: false }
}, { _id: false });

const TokenAccessSchema = new mongoose.Schema({
  tokenId: { type: String },
  role: { type: String, enum: ['guest', 'viewer'] },
  collab: { type: Boolean },
  editable: { type: Boolean }
}, { _id: false });

const EventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventName: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: { type: CoordinatesSchema, required: true },
  radius: { type: Number, required: true },
  groupSize: { type: Number, required: true },
  preferences: [{ type: String, enum: ["bar", "pub", "club", "restaurant"], required: true }],
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  finalized: { type: Boolean, default: false },
  weather: { type: WeatherSchema },
  venues: { type: [VenueSchema] },

  editableByGuests: { type: Boolean, default: false },
  collaborators: [CollaboratorSchema],
  sharedViaLink: { type: Boolean, default: false },
  tokenAccess: [TokenAccessSchema]
}, { timestamps: true });

export const EventModel = mongoose.model('Event', EventSchema);
