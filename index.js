import express from 'express';
import bodyParser from 'body-parser'; //body-parser enables us to send post requests.
import mongoose from 'mongoose';
import cors from 'cors'; //cors enables cross origin requests
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true })); //30mb because we would be sending some images too
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// ROUTES
app.use('/posts', postRoutes); //always specify your routes after cors() to avoid errors

// DATABASE
const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    })
  )
  .catch((error) => console.log('DB Error: ' + error.message));
