const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  // timeouts (good for slow machines)
  timeout: 120000,
  expect: { timeout: 15000 },

  // Let Playwright start/stop your server
  webServer: {
    command: "npm run dev",
    
    port: 3000,
    reuseExistingServer: false,
    timeout: 120000,
  },

  use: {
    baseURL: "http://localhost:3000",

    // ✅ IMPORTANT: make CI headless, keep local headed if you want
    headless: !!process.env.CI,

    actionTimeout: 30000,
    navigationTimeout: 60000,

    screenshot: "only-on-failure",
    trace: "on-first-retry",

    launchOptions: {
      args: ["--disable-gpu"],
    },
  },
});