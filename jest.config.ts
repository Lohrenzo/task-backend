import type { Config } from 'jest'

const config: Config = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Use your setup file
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: false, // Important: ts-jest works best with CommonJS in Jest
            },
        ],
    },
    moduleNameMapper: {
        // Redirect imports of swagger.ts to a mock
        '^./swagger': '<rootDir>/__mocks__/swagger.ts', // or direct path
        // Or directly mock the file
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/swagger.ts', // 👈 Exclude swagger from coverage
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'src/swagger.ts', // 👈 Ignore swagger file in coverage
    ],
    // ...createDefaultPreset(),
}

export default config;