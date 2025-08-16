import app from "./app.js";

function startServer() {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

startServer();
