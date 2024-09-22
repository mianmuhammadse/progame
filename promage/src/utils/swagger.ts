import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Promage API', // Replace with your API title
      version: '1.0.0',               // API version
      description: 'API for managing projects, tasks, and managers', // API description
    },
    servers: [
      {
        url: 'http://localhost:3000/v1', // Replace with your server URL
      },
    ],
  },
  apis: ['./src/express/routes/**/*.ts'], // Path to the API docs (autogenerates based on JSDoc comments)
};

export const swaggerSpec = swaggerJSDoc(options);
