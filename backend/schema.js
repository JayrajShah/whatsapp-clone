import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  email: String,
});

export default mongoose.model("messageschemas", messageSchema);
