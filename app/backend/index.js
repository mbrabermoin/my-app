require('dotenv').config();
const { setupDatabase } = require("./setup-db");
const app = require("./app");

const PORT = process.env.PORT || 3001;

async function startApp() {
    console.log("⏳ Initiating startup sequence...");

    app.listen(PORT, () => {
        console.log(`🚀 Immortal Server running on port ${PORT}`);
    });

    setupDatabase().catch(() => {
        console.log("⚠️ DB setup failed!");
    });
}

startApp();