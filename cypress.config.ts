import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 20000,
    viewportWidth: 1366,
    viewportHeight: 900,
    retries: {
      runMode: 2,
      openMode: 0
    },
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    }
  }
});
