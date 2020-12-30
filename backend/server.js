import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Messages from "./schema.js";
import Pusher from "pusher";
import cors from "cors";

//App Config
dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1130616",
  key: "8842032136cb0213f716",
  secret: "a20600487738653a44c2",
  cluster: "ap2",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});

//DB CONFIG
//mongodb+srv://admin:<password>@cluster0.utbj2.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
  `mongodb+srv://admin:${process.env.DBPASS}@cluster0.utbj2.mongodb.net/${
    process.env.DBNAME || "whatsapp"
  }?retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.once("open", () => {
  console.log("Database Connected");
  const messageCollection = db.collection("messageschemas");
  const changeStream = messageCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
        _id: messageDetails._id,
      });
    } else {
      console.log("Error in PUSHER");
    }
  });
});

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
//POSTS
app.post("/api/v1/messages/new", (req, res) => {
  const dbMsg = req.body;

  Messages.create(dbMsg, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

//GET

app.get("/api/v1/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data);
  });
});
app.get("/", (req, res) => {
  res.status(200).send("hey");
});

//Listeners

app.listen(port, () => console.log(`server running on port: ${port}`));
