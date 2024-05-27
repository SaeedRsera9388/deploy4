import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import programsRoute from "./routes/programs.js";
import plansRoute from "./routes/plans.js";
import ticketsRoute from "./routes/tickets.js";
import commentsRoute from "./routes/comments.js";
import inquiriesRoute from "./routes/inquiries.js";
import reviewsRoute from "./routes/reviews.js";
import photosRoute from "./routes/photos.js";
import clientsRoute from "./routes/clients.js";
import subscribesRoute from "./routes/subscribes.js";
import youtubesRoute from "./routes/youtubes.js";
import seraslingovideosRoute from "./routes/seraslingovideos.js";
import serastechvideosRoute from "./routes/serastechvideos.js";
import accountsRoute from "./routes/accounts.js";

const app = express();
dotenv.config();
// cors
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:4000',
  'http://93.127.194.128:8800',
  'http://93.127.194.128',
  'https://sera-summer.com',
  'https://admin.sera-summer.com',
  'https://www.sera-summer.com',
  'http://sera-summer.com',
  'http://admin.sera-summer.com',
  'http://www.sera-summer.com',
  'http://backend.sera-summer.com',
  'https://backend.sera-summer.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const msg = 'The CORS policy for this site does not allow access from the specified origin.';
    return callback(new Error(msg), false);
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/backend/auth", authRoute);
app.use("/backend/users", usersRoute);
app.use("/backend/programs", programsRoute);
app.use("/backend/plans", plansRoute);
app.use("/backend/tickets", ticketsRoute);
app.use("/backend/inquiries", inquiriesRoute);
app.use("/backend/comments", commentsRoute);
app.use("/backend/reviews", reviewsRoute);
app.use("/backend/photos", photosRoute);
app.use("/backend/clients", clientsRoute);
app.use("/backend/subscribes", subscribesRoute);
app.use("/backend/youtubes", youtubesRoute);
app.use("/backend/seraslingovideos", seraslingovideosRoute);
app.use("/backend/serastechvideos", serastechvideosRoute);
app.use("/backend/accounts", accountsRoute);

app.use((err, req, res, next) => {
  console.error(err);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend!");
});
