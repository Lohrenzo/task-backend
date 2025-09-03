// Mock swagger-jsdoc and swagger.ts file to prevent import.meta.url error
jest.mock('swagger-jsdoc', () => ({
    __esModule: true,
    default: jest.fn(() => ({})), // Return empty spec
}));
