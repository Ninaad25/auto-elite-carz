import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import {
  authenticateToken,
  AuthRequest,
} from "../middleware/auth.middleware.js";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "auto-elite-carz-secret";

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        passwordHash,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Failed to create account",
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Failed to login",
    });
  }
});

// UPDATE PROFILE
router.put("/profile", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        NOT: {
          id: req.user!.userId,
        },
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "This email is already being used",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user!.userId,
      },
      data: {
        name: name.trim(),
        email: normalizedEmail,
        phone: phone?.trim() || null,
      },
    });

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
});

export default router;
