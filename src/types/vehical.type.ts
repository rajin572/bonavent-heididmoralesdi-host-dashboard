export interface IVehicleInformation {
  _id: string;
  hostId: string;
  vinNumber: string;
  isCarModel1981: boolean;
  vehicleType: string;
  vehicleName: string; // Vehicle brand
  vehicleModel: string; // Vehicle model
  trimLevel: string;
  seatingCapacity: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // You can adjust as per your enum
  fuelType: "Gas" | "Diesel" | "Electric" | "Hybrid"; // Based on the FuelType enum
  transmission: "Auto" | "Manual"; // Transmission type
  milagePerGallon: number;
  fuelEfficiency: number;
  driveType: string; // Drive type options
  bodyType: string; // Body types
  color: string;
  comfortConvenience: string[]; // Array of comfort & convenience features
  deviceConnectivity: string[]; // Array of device connectivity features
  safetyFeature: string[]; // Array of safety features
  extras: string[]; // Array of additional extras
  vehicleImage: string[]; // Array of image URLs
  cleanFee: number;
  perDayPrice: number;
  licenseCountry: string;
  licenseFirstName: string;
  licenseLastName: string;
  licenseNumber: string;
  licenseDOB: string; // ISO string format for date
  licenseExpiryDate: string; // ISO string format for expiry date
  licenseImage: string[]; // Array of license image URLs
  deliveryLocationId: string;
  weeklyAvailabilityId: string;
  isAvailable: boolean;
  createdAt: string; // ISO string format for created date
  updatedAt: string; // ISO string format for last updated date
  __v: number;
  totalTrips: number;
  rentedThisMonth: boolean;
  averageRating: number;
}
