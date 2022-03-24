// https://editor.swagger.io/
const authDocs = require('../routers/auth.doc');
const WorkingDays = require('../routers/working-days.doc');
const WishesDoc = require('../routers/wishes.doc');

const swaggerDocumentation = {
    openapi: '3.0.0',
    info: {
        title: 'MEVN',
        version: '0.0.1'
    },
    servers: [
        {
            url: 'http://localhost:5000/api/',
            description: 'Local Dev'
        },
        {
            url: 'production',
            description: 'Production Dev'
        },
    ],
    tages: [
        {
            name: 'Auth',
            description: "Auth routes"
        }
    ],
    paths: {
        ...authDocs,
        ...WorkingDays,
        ...WishesDoc,
    }
}

module.exports = swaggerDocumentation;
