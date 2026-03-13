
// Importer le module express
import express from 'express';
import fs from 'fs';
const swaggerDocument = JSON.parse(fs.readFileSync('./src/Config/Documentation.json', 'utf8'));
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Pokemon API"
};

// Créer une application express
const app = express();
app.use(express.json());
const PORT = 3000;

import router from './src/Routes/pokemon.route.js';

app.use('/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, swaggerOptions));

app.use('/api', router);
// app.use('/api/salutations/hasard/:langue', salutationRouter);
// app.use('/api/salutations/hasard/', salutationRouter);
// app.use('/api', salutationRouter);
// app.use('/', salutationRouter);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

