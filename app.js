
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport"
import mongoose from "mongoose";
import session from "express-session"
import MongoStore from "connect-mongo";

import {localMiddleware} from "./middlewares";
import routes from "./routes";

import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


import "./db"

dotenv.config();
import "./models/Video";
import "./models/User";
import "./models/Comments";

import "./passport"
const app = express();

console.log(process.env.COOKIE_SECRET);

const CokieStore = MongoStore(session);

app.use(helmet());
app.set("view engine","pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

const PORT=process.env.PORT || 4000; 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: false,
      store: new CokieStore({ mongooseConnection: mongoose.connection })
    })
  );
  app.use(passport.initialize());
  app.use(passport.session())
  

app.use(localMiddleware)


app.use(routes.home,globalRouter)
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);






app.listen(PORT,()=>{
    console.log(`✅  Listening on: http://localhost:${PORT}`)
    }
);