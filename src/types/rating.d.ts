interface IRater {
  _id: string;
  fullName: string;
  profileImage: string;
}

interface IRating {
  _id: string;
  tripId: {
    _id: string;
    vehicleId: {
      _id: string;
      vehicleName: string;
      vehicleModel: string;
    };
  };
  rater: IRater;
  ratee: string;
  vehicleId: string;
  RaterRole: "guest" | "host" | "admin" | string;
  RateeRole: "guest" | "host" | "admin" | string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
