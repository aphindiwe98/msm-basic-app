const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  // Give slow Windows machines enough time
  timeout: 120000,
  expect: { timeout: 15000 },

  // Ensure Playwright always has a server to talk to
  webServer: {
    command: "npm run dev",
    cwd: "./app",              // IMPORTANT: your server is inside /app
    port: 3000,
    reuseExistingServer: true,
    timeout: 120000,
  },

  use: {
    baseURL: "http://localhost:3000",
    headless: false,
    actionTimeout: 30000,
    navigationTimeout: 60000,

    // Debug artifacts
    screenshot: "only-on-failure",
    trace: "on-first-retry",

    launchOptions: {
      args: ["--disable-gpu"],
    },
  },
});
