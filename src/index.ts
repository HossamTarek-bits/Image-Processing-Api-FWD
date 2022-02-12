import { Request, Response } from 'express';
import app from './app';

const port = 3000;
app.get('/', (req: Request, res: Response): void => {
    res.send('Hello World!!');
});

app.listen(port, (): void => {
    // eslint-disable-next-line no-console
    console.log(`Connect on port ${port}`);
});
