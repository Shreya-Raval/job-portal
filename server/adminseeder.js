const dotenv =  require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/userModel.js");
const {hashPassword} = require("./helpers/AuthHelper.js");


//db connection
const MONGO_URI = process.env.MONGO_URL;
mongoose.connect(MONGO_URI).then( 
    () => { console.log("MongoDB connected successfully") }
).catch( (err) => {
    console.log(`Connection failed ${err}`);
    process.exit(1);
});
dotenv.config();

const createAdmin = async () => {
  const hashedPassword = await hashPassword('admin@02');
  await User.create({
    firstName: "Pihu",
    lastName: "Raval",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "admin"
  });
  console.log("Seeder run success");
  process.exit();
};

createAdmin();
