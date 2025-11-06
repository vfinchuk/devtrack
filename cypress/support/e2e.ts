import '@testing-library/cypress/add-commands';
import './commands';

Cypress.on('uncaught:exception', () => false);
