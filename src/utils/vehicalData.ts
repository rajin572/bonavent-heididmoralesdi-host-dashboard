export interface VehicleBrand {
  label: string;
  models: { label: string; value: string }[];
}

export interface VehicleCategoryOption {
  value: string;
  label: string;
  brands: VehicleBrand[];
}

export const vehicleOptions: VehicleCategoryOption[] = [
  {
    value: "car",
    label: "Car",
    brands: [
      {
        label: "Nissan",
        models: [
          { label: "Sentra", value: "Sentra" },
          { label: "Versa", value: "Versa" },
          { label: "Leaf", value: "Leaf" },
        ],
      },
      {
        label: "Hyundai",
        models: [
          { label: "Accent", value: "Accent" },
          { label: "Elantra", value: "Elantra" },
          { label: "Sonata", value: "Sonata" },
        ],
      },
      {
        label: "Ford",
        models: [
          { label: "Fiesta", value: "Fiesta" },
          { label: "Focus", value: "Focus" },
          { label: "Fusion", value: "Fusion" },
        ],
      },
      {
        label: "Citroën",
        models: [{ label: "C1", value: "C1" }],
      },
      {
        label: "Fiat",
        models: [{ label: "500", value: "500" }],
      },
      {
        label: "Seat",
        models: [{ label: "Leon", value: "Leon" }],
      },
      {
        label: "Toyota",
        models: [
          { label: "Corolla", value: "Corolla" },
          { label: "Avensis", value: "Avensis" },
        ],
      },
      {
        label: "Kia",
        models: [{ label: "Optima", value: "Optima" }],
      },
      {
        label: "Chevrolet",
        models: [
          { label: "Camaro Convertible", value: "Camaro Convertible" },
          { label: "Bolt", value: "Bolt" },
        ],
      },
      {
        label: "Mazda",
        models: [{ label: "MX-5 Miata", value: "MX-5 Miata" }],
      },
      {
        label: "Mini",
        models: [{ label: "Cooper Convertible", value: "Cooper Convertible" }],
      },
      {
        label: "BMW",
        models: [{ label: "4 Series", value: "4 Series" }],
      },
      {
        label: "Honda",
        models: [{ label: "Civic", value: "Civic" }],
      },
      {
        label: "Volkswagen",
        models: [{ label: "Jetta", value: "Jetta" }],
      },
      {
        label: "Mercedes-Benz",
        models: [{ label: "C-Class", value: "C-Class" }],
      },
    ],
  },
  {
    value: "suv",
    label: "SUV",
    brands: [
      {
        label: "Ford",
        models: [
          { label: "Escape", value: "Escape" },
          { label: "Tourneo", value: "Tourneo" },
        ],
      },
      {
        label: "Hyundai",
        models: [{ label: "Tucson", value: "Tucson" }],
      },
      {
        label: "Jeep",
        models: [{ label: "Wrangler", value: "Wrangler" }],
      },
      {
        label: "Suzuki",
        models: [{ label: "Jimny", value: "Jimny" }],
      },
      {
        label: "Mitsubishi",
        models: [{ label: "Outlander", value: "Outlander" }],
      },
      {
        label: "Kia",
        models: [{ label: "Carnival", value: "Carnival" }],
      },
    ],
  },
  {
    value: "mini_bus",
    label: "Mini Bus",
    brands: [
      {
        label: "Kia",
        models: [{ label: "Carnival", value: "Carnival" }],
      },
      {
        label: "Ford",
        models: [{ label: "Tourneo", value: "Tourneo" }],
      },
    ],
  },
  // {
  //   value: "truck",
  //   label: "Truck",
  //   brands: [],
  // },
  // {
  //   value: "van",
  //   label: "Van",
  //   brands: [],
  // },
  // {
  //   value: "cargo_bus",
  //   label: "Cargo Bus",
  //   brands: [],
  // },
  // {
  //   value: "box_truck",
  //   label: "Box Truck",
  //   brands: [],
  // },
  {
    value: "electric_vehicles",
    label: "Electric Vehicles",
    brands: [
      {
        label: "Tesla",
        models: [{ label: "Model 3", value: "Model 3" }],
      },
      {
        label: "Nissan",
        models: [{ label: "Leaf", value: "Leaf" }],
      },
      {
        label: "Chevrolet",
        models: [{ label: "Bolt", value: "Bolt" }],
      },
      {
        label: "Hyundai",
        models: [{ label: "Kona Electric", value: "Kona Electric" }],
      },
    ],
  },
];
