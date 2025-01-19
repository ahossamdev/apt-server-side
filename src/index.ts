import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import connectToDatabase from "./config/db";
import apartmentRoutes from "./routes/apartment.routes";
import { apartmentDocs } from "./docs/swagger/apartments.docs";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors policy for cross-origin resource sharing
app.use(cors());

// rate limit (100 request per 15 minutes)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Apartments API",
      version: "1.0.0",
      description: "API documentation for the Apartments application",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
    paths: {
      ...apartmentDocs,
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add this middleware before your routes
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.use("/api/apartments", apartmentRoutes);

// Catch-all route for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found", success: false });
});

// Start Server
const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
