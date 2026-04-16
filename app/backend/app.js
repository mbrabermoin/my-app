require('dotenv').config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
const corsOptions = require("./config/cors");
const corsMiddleware = require("./middleware/corsMiddleware");
const userRoutes = require("./routes/userRoutes");
const { importSheet } = require("./importSheet");

const app = express();

let isImporting = false;

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(corsMiddleware);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Sync Google Sheets
app.post("/api/admin/sync-sheets", async (req, res) => {
    if (isImporting) {
        return res.status(429).json({
            success: false,
            message: "Synchronization already in progress. Please try again later.",
        });
    }

    isImporting = true;
    try {
        console.log("🔄 Initiating sheet synchronization...");
        const summary = await importSheet();
        res.json({
            success: true,
            message: "¡Success! 🚀",
            data: summary,
        });
    } catch (error) {
        console.error("❌ Error in synchronization:", error.message);
        res.status(500).json({
            success: false,
            message: `Error in sheet synchronization: ${error.message}`,
            error: error.message,
        });
    } finally {
        isImporting = false;
    }
});

// Routes
app.use("/api", userRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        service: "Backend API",
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
        path: req.originalUrl,
    });
});

module.exports = app;
