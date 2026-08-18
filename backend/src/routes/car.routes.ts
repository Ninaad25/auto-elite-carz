import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const cars = await prisma.listing.findMany({
      where: {
        status: "AVAILABLE",
      },
      include: {
        model: {
          include: {
            brand: true,
          },
        },
        images: true,
        features: {
          include: {
            feature: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("FIRST CAR FROM BACKEND:", JSON.stringify(cars[0], null, 2));

    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);

    res.status(500).json({
      message: "Failed to fetch cars",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        message: "Invalid car ID",
      });
    }

    const car = await prisma.listing.findUnique({
      where: {
        id,
      },
      include: {
        model: {
          include: {
            brand: true,
          },
        },
        images: true,
        features: {
          include: {
            feature: true,
          },
        },
      },
    });

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);

    res.status(500).json({
      message: "Failed to fetch car",
    });
  }
});

export default router;
