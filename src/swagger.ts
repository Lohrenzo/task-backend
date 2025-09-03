import swaggerJSDoc from 'swagger-jsdoc';

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HMCTS Backend API',
            version: '1.0.0',
            description: 'API documentation for HMCTS Backend',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Local server'
            }
        ],
        components: {
            schemas: {
                Task: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        status: { type: 'string', enum: ['pending', 'in-progress', 'completed'] },
                        dueDateTime: { type: 'string', format: 'date-time' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time', nullable: true }
                    }
                }
            }
        }
    },
    apis: [
        `${__dirname}/routes/*.ts`,
        `${__dirname}/routes/*.js`,
        // `./routes/*.ts`,
        // `./routes/*.js`,
        // `./swagger.ts`,
        // `./swagger.js`,
    ], // Use absolute path to ensure swagger-jsdoc finds the comments
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;