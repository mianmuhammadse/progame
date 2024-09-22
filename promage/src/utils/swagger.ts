import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Promage API',
      version: '1.0.0',               
      description: 'API for managing projects, tasks, and managers',
    },
    servers: [
      {
        url: 'http://localhost:3000/v1',
      },
    ],
  },
  apis: ['./src/express/routes/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
