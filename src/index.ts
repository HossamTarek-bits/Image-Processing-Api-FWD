import express from 'express';
import apiRoute from './api/apiRoute';

const app = express();
const port = 3000;

app.use('/api', apiRoute);

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Connect on port ${port}`);
});
