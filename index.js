import express from "express";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const app = express();
app.use(express.json());
const Schema = mongoose.Schema;
const mongoUrl = process.env.MONGODB_URL;

const CourtSchema = new Schema({
  id: String,
  name: String,
  lat: Number,
  lon: Number,
});

const Court = mongoose.model("Court", CourtSchema);

mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connection established");
});

app.get("/api/allCourts", async (req, res) => {
  const markers = await Court.find();
  res.json(markers);
});

app.post("/api/newCourt", async (req, res) => {
  const court = new Court();
  court.id = nanoid(10);
  court.name = req.body.name;
  court.id = court.lat = req.body.lat;
  court.lon = req.body.lon;

  court.save();

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ id: court.id }));
});

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.log(`Server listening on the port::${port} 🚀`);
});
