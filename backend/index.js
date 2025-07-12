import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

import DB from './db/db.js';
import courseRoutes from './routes/course.route.js';
import userRoutes from './routes/user.router.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allowed CORS origins
const allowedOrigins = [
  process.env.FRONTEND_URL,       // e.g., https://newcourse-1.onrender.com
  'http://localhost:5173'         // dev environment
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
};

// ✅ Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

// ✅ Database Connection
DB();

// ✅ API Routes
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
