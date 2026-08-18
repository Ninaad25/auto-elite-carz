
import { Router } from "express";
import prisma from "../lib/prisma.js";
import { authenticateToken, AuthRequest } from "../middleware/auth.middleware.js";

const router = Router();

/*
 * GET /api/favourites
 * Get all favourites for the logged-in user
 */
router.get("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const favourites = await prisma.favourite.findMany({
      where: {
        userId: req.user!.userId,
      },
      include: {
        listing: {
          include: {
            model: {
              include: {
                brand: true,
              },
            },
            images: {
              orderBy: {
                sortOrder: "asc",
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(favourites);
  } catch (error) {
    console.error("Error fetching favourites:", error);

    res.status(500).json({
      message: "Failed to fetch favourites",
    });
  }
});


/*
 * POST /api/favourites/:listingId
 * Add a car to favourites
 */
router.post(
  "/:listingId",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const listingId = Number(req.params.listingId);

      if (Number.isNaN(listingId)) {
        return res.status(400).json({
          message: "Invalid car ID",
        });
      }

      const listing = await prisma.listing.findUnique({
        where: {
          id: listingId,
        },
      });

      if (!listing) {
        return res.status(404).json({
          message: "Car not found",
        });
      }

      const existingFavourite =
        await prisma.favourite.findUnique({
          where: {
            userId_listingId: {
              userId: req.user!.userId,
              listingId,
            },
          },
        });

      if (existingFavourite) {
        return res.status(200).json({
          message: "Car is already in favourites",
          favourite: existingFavourite,
        });
      }

      const favourite = await prisma.favourite.create({
        data: {
          userId: req.user!.userId,
          listingId,
        },
      });

      res.status(201).json({
        message: "Car added to favourites",
        favourite,
      });
    } catch (error) {
      console.error("Error adding favourite:", error);

      res.status(500).json({
        message: "Failed to add favourite",
      });
    }
  },
);


/*
 * DELETE /api/favourites/:listingId
 * Remove a car from favourites
 */
router.delete(
  "/:listingId",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const listingId = Number(req.params.listingId);

      if (Number.isNaN(listingId)) {
        return res.status(400).json({
          message: "Invalid car ID",
        });
      }

      await prisma.favourite.delete({
        where: {
          userId_listingId: {
            userId: req.user!.userId,
            listingId,
          },
        },
      });

      res.json({
        message: "Car removed from favourites",
      });
    } catch (error) {
      console.error("Error removing favourite:", error);

      res.status(500).json({
        message: "Failed to remove favourite",
      });
    }
  },
);


/*
 * GET /api/favourites/:listingId
 * Check whether the logged-in user has favourited a car
 */
router.get(
  "/:listingId",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const listingId = Number(req.params.listingId);

      if (Number.isNaN(listingId)) {
        return res.status(400).json({
          message: "Invalid car ID",
        });
      }

      const favourite =
        await prisma.favourite.findUnique({
          where: {
            userId_listingId: {
              userId: req.user!.userId,
              listingId,
            },
          },
        });

      res.json({
        isFavourite: !!favourite,
      });
    } catch (error) {
      console.error(
        "Error checking favourite:",
        error,
      );

      res.status(500).json({
        message: "Failed to check favourite",
      });
    }
  },
);

export default router;
;
