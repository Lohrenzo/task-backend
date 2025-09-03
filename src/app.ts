import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

import taskRoutes from './routes/taskRoute';
import { corsHandler, errorHandler, logger } from './middleware';
// import swaggerSpec from './swagger';

const app = express();
const theme = new SwaggerTheme();
app.use(express.json());

// Middleware
app.use(logger)
app.use(errorHandler)
app.use(corsHandler)

// Routes
/**
 * @openapi
 */
app.use(taskRoutes);



// Only mount Swagger if not in test environment
if (process.env.NODE_ENV !== 'test') {
    import('./swagger').then((swaggerModule) => {
        app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerModule.default, { customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK) }));
    });
    // app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK) }));
}



export default app;