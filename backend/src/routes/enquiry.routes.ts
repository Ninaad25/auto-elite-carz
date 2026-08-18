import { Router } from "express";
import prisma from "../lib/prisma.js";
import {
  authenticateToken,
  AuthRequest,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { listingId, message } = req.body;

    // userId now comes from the verified JWT
    const userId = req.user!.userId;

    if (!listingId) {
      return res.status(400).json({
        message: "Car is required",
      });
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: Number(listingId),
      },
    });

    if (!listing) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        userId,
        listingId: Number(listingId),
        message: message?.trim() || null,
      },
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
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);

    res.status(500).json({
      message: "Failed to submit enquiry",
    });
  }
});

export default router;
