import express from "express";

const app = express();

app.get("/api/getAllMarkers", async (req, res) => {
  const markers = {
    markers: [
      {
        id: "0",
        long: 1.223,
        lat: 2.432,
      },
      {
        id: "1",
        long: 3.223,
        lat: 4.432,
      },
    ],
  };
  res.json(markers);
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
