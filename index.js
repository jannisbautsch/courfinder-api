import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const mongoUrl = proces.env.MONGODB_URL;

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
  const reqLat = req.body.lat;
  const reqLon = req.body.lon;
  Court.create({
    lat: reqLat,
    lon: reqLon,
  });
  res.sendStatus(200);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.log(`Server listening on the port::${port} 🚀`);
});
