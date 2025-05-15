import express, { Application } from 'express';
import { connectToDatabase } from './config/db';
import apiRouter from './routes/api';
import { initPostCollection, initCommentCollection } from './models';
import { initUserCollection } from './models/userModel'; // Make sure this import exists
const app: Application = express();

app.use(express.json());

// Initialize database connection and collections
(async () => {
  try {
    const db = await connectToDatabase();
    initUserCollection(db);
    initPostCollection(db);
    initCommentCollection(db);
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
})();

// API routes
app.use('/api', apiRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;