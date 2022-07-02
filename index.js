import express from "express";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const app = express();
app.use(express.json());
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
// const mongoUrl = process.env.MONGODB_URL;
const mongoUrl =
  "mongodb+srv://courtfinder:LpAE5thT3W33Hef7@cluster0.9hqp4.mongodb.net/?retryWrites=true&w=majority";

const CourtSchema = new Schema({
  id: String,
  lat: Number,
  lon: Number,
});

const Court = mongoose.model("Court", CourtSchema);

mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connection established");
});

// Court.create(
//   {
//     lat: 1.234,
//     long: 2.345,
//   },
//   function (err, savedDocument) {
//     if (err) console.log(err);
//     console.log(savedDocument);
//   }
// );

// const all = await Court.find()

app.get("/api/allCourts", async (req, res) => {
  const markers = await Court.find();
  res.json(markers);
});

app.post("/api/newCourt", async (req, res) => {
  const court = new Court();
  court.id = nanoid();
  court.lat = req.body.lat;
  court.lon = req.body.lon;

  console.log(court.id);
  // Court.create({
  //   lat: reqLat,
  //   lon: reqLon,
  // });
  court.save();
  res.sendStatus(200);
});

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.log(`Server listening on the port::${port} 🚀`);
});
