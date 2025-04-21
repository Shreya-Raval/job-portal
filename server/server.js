const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UserRoutes");
const jobRoutes = require("./routes/JobRoutes");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true  
}
));
app.use(express.json());

//db connection
const MONGO_URI = process.env.MONGO_URL;
mongoose.connect(MONGO_URI).then( 
    () => { console.log("MongoDB connected successfully") }
).catch( (err) => {
    console.log(`Connection failed ${err}`);
    process.exit(1);
});

app.use(cookieParser());

//router
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);
//server connection on port
const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
    console.log(`Server is listening on port: ${PORT}`);
});