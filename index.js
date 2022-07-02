import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const mongoUrl = process.env.MONGODB_URL;

const CourtSchema = new Schema({
  id: ObjectId,
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
  console.log(req.body);
  // const reqLat = req.body.lat;
  // const reqLon = req.body.lon;
  const court = new Court();
  court.lat = req.body.lat;
  court.lon = req.body.lon;
  // Court.create({
  //   lat: reqLat,
  //   lon: reqLon,
  // });
  court.save(function (err, c) {
    console.log(c.id);
  });
  res.sendStatus(200);
});

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.log(`Server listening on the port::${port} 🚀`);
});
