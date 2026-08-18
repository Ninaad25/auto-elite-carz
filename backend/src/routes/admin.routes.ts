import { Router } from "express";
import prisma from "../lib/prisma.js";
import upload from "../middleware/upload.js";
import {
  authenticateToken,
  AuthRequest,
} from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

const router = Router();

// All admin routes require login + ADMIN role
router.use(authenticateToken);
router.use(requireAdmin);

router.post("/cars", upload.array("images", 10), async (req, res) => {
  try {
    const files = (req.files || []) as Express.Multer.File[];

    const {
      modelId,
      variant,
      year,
      price,
      kmDriven,
      fuelType,
      transmission,
      ownerCount,
      color,
      registrationCity,
      registrationNumber,
      engine,
      mileage,
      seatingCapacity,
      description,
      features,
    } = req.body;

    if (
      !modelId ||
      !variant ||
      !year ||
      !price ||
      kmDriven === undefined ||
      !fuelType ||
      !transmission
    ) {
      return res.status(400).json({
        message: "Required car information is missing",
      });
    }

    const model = await prisma.model.findUnique({
      where: {
        id: Number(modelId),
      },
    });

    if (!model) {
      return res.status(404).json({
        message: "Model not found",
      });
    }

    let featureIds: number[] = [];

    if (features) {
      featureIds = Array.isArray(features)
        ? features.map(Number)
        : [Number(features)];
    }

    const imageData = files.map((file, index) => ({
      imageUrl: `/uploads/cars/${file.filename}`,
      isPrimary: index === 0,
      sortOrder: index,
    }));

    const listing = await prisma.listing.create({
      data: {
        modelId: Number(modelId),
        variant,
        year: Number(year),
        price: Number(price),
        kmDriven: Number(kmDriven),

        fuelType,
        transmission,

        ownerCount:
          ownerCount !== undefined && ownerCount !== ""
            ? Number(ownerCount)
            : null,

        color: color || null,
        registrationCity: registrationCity || null,
        registrationNumber: registrationNumber || null,

        engine: engine || null,
        mileage: mileage || null,

        seatingCapacity:
          seatingCapacity !== undefined && seatingCapacity !== ""
            ? Number(seatingCapacity)
            : null,

        description: description || null,

        images: {
          create: imageData,
        },

        features: {
          create: featureIds.map((featureId) => ({
            featureId,
          })),
        },
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

    res.status(201).json({
      message: "Car added successfully",
      car: listing,
    });
  } catch (error) {
    console.error("Admin create car error:", error);

    res.status(500).json({
      message: "Failed to create car",
    });
  }
});

// Dashboard statistics
router.get("/stats", async (_req, res) => {
  try {
    const [
      totalCars,
      availableCars,
      soldCars,
      reservedCars,
      totalUsers,
      newEnquiries,
    ] = await Promise.all([
      prisma.listing.count(),

      prisma.listing.count({
        where: { status: "AVAILABLE" },
      }),

      prisma.listing.count({
        where: { status: "SOLD" },
      }),

      prisma.listing.count({
        where: { status: "RESERVED" },
      }),

      prisma.user.count(),

      prisma.enquiry.count({
        where: { status: "NEW" },
      }),
    ]);

    res.json({
      totalCars,
      availableCars,
      soldCars,
      reservedCars,
      totalUsers,
      newEnquiries,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard statistics",
    });
  }
});

// Get all cars
router.get("/cars", async (_req, res) => {
  try {
    const cars = await prisma.listing.findMany({
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

    res.json(cars);
  } catch (error) {
    console.error("Error fetching admin cars:", error);

    res.status(500).json({
      message: "Failed to fetch cars",
    });
  }
});

// Update car status
router.patch("/cars/:id/status", async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const validStatuses = ["AVAILABLE", "SOLD", "RESERVED"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid listing status",
      });
    }

    const car = await prisma.listing.update({
      where: { id },
      data: { status },
    });

    res.json({
      message: "Car status updated successfully",
      car,
    });
  } catch (error) {
    console.error("Error updating car status:", error);

    res.status(500).json({
      message: "Failed to update car status",
    });
  }
});

// Delete car
router.delete("/cars/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingCar = await prisma.listing.findUnique({
      where: { id },
    });

    if (!existingCar) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    await prisma.listing.delete({
      where: { id },
    });

    res.json({
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting car:", error);

    res.status(500).json({
      message: "Failed to delete car",
    });
  }
});

// Get all enquiries
router.get("/enquiries", async (_req, res) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        listing: {
          include: {
            model: {
              include: {
                brand: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);

    res.status(500).json({
      message: "Failed to fetch enquiries",
    });
  }
});

// Update enquiry status
router.patch("/enquiries/:id/status", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const validStatuses = ["NEW", "CONTACTED", "CLOSED"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid enquiry status",
      });
    }

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });

    res.json({
      message: "Enquiry status updated successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Error updating enquiry status:", error);

    res.status(500).json({
      message: "Failed to update enquiry status",
    });
  }
});

router.delete("/cars/images/:imageId", async (req, res) => {
  try {
    const imageId = Number(req.params.imageId);

    if (Number.isNaN(imageId)) {
      return res.status(400).json({
        message: "Invalid image ID",
      });
    }

    const image = await prisma.carImage.findUnique({
      where: {
        id: imageId,
      },
    });

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    await prisma.carImage.delete({
      where: {
        id: imageId,
      },
    });

    res.json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete image error:", error);

    res.status(500).json({
      message: "Failed to delete image",
    });
  }
});

export default router;
