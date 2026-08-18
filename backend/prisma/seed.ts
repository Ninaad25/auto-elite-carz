import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

const brands = [
  {
    name: "Hyundai",
    models: [
      { name: "Creta", bodyType: "SUV" },
      { name: "Venue", bodyType: "SUV" },
      { name: "Verna", bodyType: "Sedan" },
    ],
  },
  {
    name: "Tata",
    models: [
      { name: "Nexon", bodyType: "SUV" },
      { name: "Harrier", bodyType: "SUV" },
      { name: "Punch", bodyType: "SUV" },
    ],
  },
  {
    name: "Mahindra",
    models: [
      { name: "Thar", bodyType: "SUV" },
      { name: "XUV700", bodyType: "SUV" },
      { name: "Scorpio-N", bodyType: "SUV" },
    ],
  },
  {
    name: "Toyota",
    models: [
      { name: "Fortuner", bodyType: "SUV" },
      { name: "Innova Crysta", bodyType: "MPV" },
    ],
  },
  {
    name: "Kia",
    models: [
      { name: "Seltos", bodyType: "SUV" },
      { name: "Sonet", bodyType: "SUV" },
    ],
  },
  {
    name: "Maruti Suzuki",
    models: [
      { name: "Grand Vitara", bodyType: "SUV" },
      { name: "Brezza", bodyType: "SUV" },
    ],
  },
  {
    name: "Honda",
    models: [
      { name: "City", bodyType: "Sedan" },
      { name: "Elevate", bodyType: "SUV" },
    ],
  },
  {
    name: "Volkswagen",
    models: [
      { name: "Virtus", bodyType: "Sedan" },
      { name: "Taigun", bodyType: "SUV" },
    ],
  },
];

const features = [
  "Sunroof",
  "360 Degree Camera",
  "Reverse Camera",
  "Apple CarPlay",
  "Android Auto",
  "Cruise Control",
  "Leather Seats",
  "Alloy Wheels",
  "LED Headlights",
  "Automatic Climate Control",
  "Push Button Start",
  "Keyless Entry",
];

const cars = [
  {
    brand: "Hyundai",
    model: "Creta",
    variant: "SX",
    year: 2023,
    price: 1325000,
    kmDriven: 32000,
    fuelType: "PETROL" as const,
    transmission: "AUTOMATIC" as const,
    ownerCount: 1,
    color: "White",
    registrationCity: "Mumbai",
    engine: "1.5L",
    mileage: "17.4 km/l",
    seatingCapacity: 5,
    description:
      "Well maintained Hyundai Creta SX with excellent condition and complete service history.",
    features: ["Sunroof", "Apple CarPlay", "Android Auto", "Cruise Control"],
  },

  {
    brand: "Hyundai",
    model: "Venue",
    variant: "SX Turbo",
    year: 2022,
    price: 985000,
    kmDriven: 28000,
    fuelType: "PETROL" as const,
    transmission: "DCT" as const,
    ownerCount: 1,
    color: "Blue",
    registrationCity: "Pune",
    engine: "1.0L Turbo",
    mileage: "18.1 km/l",
    seatingCapacity: 5,
    description:
      "Sporty Hyundai Venue with turbo petrol engine and automatic transmission.",
    features: ["Sunroof", "Apple CarPlay", "Android Auto"],
  },

  {
    brand: "Hyundai",
    model: "Verna",
    variant: "SX",
    year: 2023,
    price: 1185000,
    kmDriven: 19000,
    fuelType: "PETROL" as const,
    transmission: "CVT" as const,
    ownerCount: 1,
    color: "Black",
    registrationCity: "Mumbai",
    engine: "1.5L",
    mileage: "19.0 km/l",
    seatingCapacity: 5,
    description: "Premium sedan with excellent condition and low kilometres.",
    features: ["Sunroof", "Cruise Control", "LED Headlights"],
  },

  {
    brand: "Tata",
    model: "Nexon",
    variant: "XZ+",
    year: 2023,
    price: 925000,
    kmDriven: 25000,
    fuelType: "PETROL" as const,
    transmission: "MANUAL" as const,
    ownerCount: 1,
    color: "Grey",
    registrationCity: "Kolhapur",
    engine: "1.2L Turbo",
    mileage: "17.4 km/l",
    seatingCapacity: 5,
    description: "Well maintained Tata Nexon with strong safety features.",
    features: ["Apple CarPlay", "Android Auto", "Reverse Camera"],
  },

  {
    brand: "Tata",
    model: "Harrier",
    variant: "XZA+",
    year: 2022,
    price: 1685000,
    kmDriven: 36000,
    fuelType: "DIESEL" as const,
    transmission: "AUTOMATIC" as const,
    ownerCount: 1,
    color: "White",
    registrationCity: "Pune",
    engine: "2.0L Diesel",
    mileage: "16.3 km/l",
    seatingCapacity: 5,
    description:
      "Powerful Harrier XZA+ with automatic transmission and premium features.",
    features: ["Panoramic Sunroof", "360 Degree Camera", "Cruise Control"],
  },

  {
    brand: "Mahindra",
    model: "Thar",
    variant: "LX",
    year: 2023,
    price: 1450000,
    kmDriven: 18000,
    fuelType: "DIESEL" as const,
    transmission: "MANUAL" as const,
    ownerCount: 1,
    color: "Red",
    registrationCity: "Mumbai",
    engine: "2.2L Diesel",
    mileage: "15.2 km/l",
    seatingCapacity: 4,
    description:
      "Iconic Mahindra Thar in excellent condition with low kilometres.",
    features: ["Alloy Wheels", "Apple CarPlay", "Android Auto"],
  },

  {
    brand: "Mahindra",
    model: "XUV700",
    variant: "AX7",
    year: 2022,
    price: 1850000,
    kmDriven: 30000,
    fuelType: "PETROL" as const,
    transmission: "AUTOMATIC" as const,
    ownerCount: 1,
    color: "Black",
    registrationCity: "Pune",
    engine: "2.0L Turbo",
    mileage: "13.0 km/l",
    seatingCapacity: 7,
    description:
      "Feature-packed XUV700 AX7 with premium interior and automatic transmission.",
    features: ["Panoramic Sunroof", "360 Degree Camera", "Cruise Control"],
  },

  {
    brand: "Toyota",
    model: "Fortuner",
    variant: "4x4",
    year: 2021,
    price: 3150000,
    kmDriven: 42000,
    fuelType: "DIESEL" as const,
    transmission: "AUTOMATIC" as const,
    ownerCount: 1,
    color: "White",
    registrationCity: "Mumbai",
    engine: "2.8L Diesel",
    mileage: "14.4 km/l",
    seatingCapacity: 7,
    description:
      "Toyota Fortuner 4x4 with excellent service history and premium condition.",
    features: ["Leather Seats", "Cruise Control", "LED Headlights"],
  },

  {
    brand: "Kia",
    model: "Seltos",
    variant: "GTX+",
    year: 2023,
    price: 1725000,
    kmDriven: 21000,
    fuelType: "PETROL" as const,
    transmission: "DCT" as const,
    ownerCount: 1,
    color: "Grey",
    registrationCity: "Pune",
    engine: "1.5L Turbo",
    mileage: "17.9 km/l",
    seatingCapacity: 5,
    description: "Premium Kia Seltos GTX+ with turbo petrol engine.",
    features: ["Panoramic Sunroof", "360 Degree Camera", "Bose Audio"],
  },

  {
    brand: "Maruti Suzuki",
    model: "Grand Vitara",
    variant: "Alpha",
    year: 2023,
    price: 1485000,
    kmDriven: 24000,
    fuelType: "PETROL" as const,
    transmission: "AUTOMATIC" as const,
    ownerCount: 1,
    color: "Silver",
    registrationCity: "Mumbai",
    engine: "1.5L",
    mileage: "20.5 km/l",
    seatingCapacity: 5,
    description:
      "Efficient and premium Grand Vitara Alpha in excellent condition.",
    features: ["Panoramic Sunroof", "360 Degree Camera", "Cruise Control"],
  },

  {
    brand: "Honda",
    model: "City",
    variant: "ZX",
    year: 2022,
    price: 1125000,
    kmDriven: 27000,
    fuelType: "PETROL" as const,
    transmission: "CVT" as const,
    ownerCount: 1,
    color: "White",
    registrationCity: "Kolhapur",
    engine: "1.5L",
    mileage: "18.4 km/l",
    seatingCapacity: 5,
    description: "Reliable Honda City ZX with smooth CVT transmission.",
    features: ["Sunroof", "Cruise Control", "Leather Seats"],
  },

  {
    brand: "Volkswagen",
    model: "Virtus",
    variant: "GT",
    year: 2023,
    price: 1450000,
    kmDriven: 17000,
    fuelType: "PETROL" as const,
    transmission: "AUTOMATIC" as const,
    ownerCount: 1,
    color: "Red",
    registrationCity: "Pune",
    engine: "1.5L Turbo",
    mileage: "18.0 km/l",
    seatingCapacity: 5,
    description:
      "Performance-oriented Volkswagen Virtus GT with low kilometres.",
    features: ["Sunroof", "Cruise Control", "LED Headlights"],
  },
];

async function main() {
  console.log("🌱 Starting Auto Elite Carz seed...\n");

  // Create brands and models
  for (const brandData of brands) {
    const brand = await prisma.brand.upsert({
      where: {
        name: brandData.name,
      },
      update: {},
      create: {
        name: brandData.name,
      },
    });

    for (const modelData of brandData.models) {
      await prisma.model.upsert({
        where: {
          brandId_name: {
            brandId: brand.id,
            name: modelData.name,
          },
        },
        update: {
          bodyType: modelData.bodyType,
        },
        create: {
          name: modelData.name,
          bodyType: modelData.bodyType,
          brandId: brand.id,
        },
      });
    }
  }

  console.log("✅ Brands and models created");

  // Create features
  for (const feature of features) {
    await prisma.feature.upsert({
      where: {
        name: feature,
      },
      update: {},
      create: {
        name: feature,
      },
    });
  }

  console.log("✅ Features created");

  // Create listings
  for (const car of cars) {
    const brand = await prisma.brand.findUnique({
      where: {
        name: car.brand,
      },
    });

    if (!brand) {
      throw new Error(`Brand not found: ${car.brand}`);
    }

    const model = await prisma.model.findUnique({
      where: {
        brandId_name: {
          brandId: brand.id,
          name: car.model,
        },
      },
    });

    if (!model) {
      throw new Error(`Model not found: ${car.model}`);
    }

    const existing = await prisma.listing.findFirst({
      where: {
        modelId: model.id,
        variant: car.variant,
        year: car.year,
        kmDriven: car.kmDriven,
      },
    });

    if (existing) {
      console.log(
        `⏭️  Skipping existing car: ${car.brand} ${car.model} ${car.variant}`,
      );
      continue;
    }

    const listing = await prisma.listing.create({
      data: {
        modelId: model.id,
        variant: car.variant,
        year: car.year,
        price: car.price,
        kmDriven: car.kmDriven,
        fuelType: car.fuelType,
        transmission: car.transmission,
        ownerCount: car.ownerCount,
        color: car.color,
        registrationCity: car.registrationCity,
        engine: car.engine,
        mileage: car.mileage,
        seatingCapacity: car.seatingCapacity,
        description: car.description,

        features: {
          create: [],
        },
      },
    });

    // Add features
    for (const featureName of car.features) {
      const feature = await prisma.feature.findUnique({
        where: {
          name: featureName,
        },
      });

      if (feature) {
        await prisma.listingFeature.create({
          data: {
            listingId: listing.id,
            featureId: feature.id,
          },
        });
      }
    }

    console.log(`🚗 Added: ${car.brand} ${car.model} ${car.variant}`);
  }

  console.log("\n🎉 Auto Elite Carz seed completed!");
}

main()
  .catch((error) => {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
