interface Location {
  type: "Point";
  coordinates: [number, number]; // [latitude, longitude]
}

interface GuestLocation {
  location: Location;
  address: string;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  profileImage: string;
}

interface Vehicle {
  _id: string;
  vehicleName: string;
  vehicleModel: string;
  vehicleImage: string[];
}

interface StartTimeSchedule {
  start: string; // ISO 8601 date string
  end: string; // ISO 8601 date string
}

interface ITrip {
  _id: string;
  startTimeSchedule: StartTimeSchedule;
  guestId: User;
  vehicleId: Vehicle;
  hostId: User;
  startDate: string; // ISO 8601 date string
  timezone: string;
  returnDate: string; // ISO 8601 date string
  tripStatus: "completed" | "pending" | "confirmed" | "cancelled" | "ongoing";
  netFare: number;
  adminAmount: number;
  hostAmount: number;
  chatId: string;
  guestLocation: GuestLocation;
  isCancelTrip: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  tripCustomID: string;
}
