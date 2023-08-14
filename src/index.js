const express = require("express");
const dotenv = require("dotenv");
const routerVideo = require("./routes/video.routes");
const routerUser = require("./routes/user.routes");
const routerComment = require("./routes/comment.routes");
const routerProduct = require("./routes/product.routes");
const errorHandler = require("./middleware/error.handler");
const connectMongoDb = require("../src/config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { createServer } = require("http");
const { Server } = require("socket.io");

dotenv.config();

connectMongoDb();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
      origin: process.env.ALLOWED_ORIGIN
  }
});

const PORT = process.env.PORT || 7001;

app.use(
  cors({
    origin: process.env.ALLOWEDORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/comment", routerComment);
app.use("/product", routerProduct);
app.use("/user", routerUser);
app.use("/videos", routerVideo);

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Meng-handle event "chat message" dari client
  socket.on("chat message", (msg) => {
    console.log("Message: " + msg);
    io.emit("chat message", msg); // Mengirim pesan ke semua client yang terhubung
  });

  // Meng-handle event disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Mengganti app.listen() dengan httpServer.listen()
httpServer.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
