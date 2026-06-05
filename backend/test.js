const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://tjchitekwe_db_user:ThxnderStorm@ac-sw5kuch-shard-00-00.mvax0d5.mongodb.net:27017,ac-sw5kuch-shard-00-01.mvax0d5.mongodb.net:27017,ac-sw5kuch-shard-00-02.mvax0d5.mongodb.net:27017/fullstackBlog?ssl=true&replicaSet=atlas-mnfwuf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("CONNECTED");
    process.exit(0);
  })
  .catch((err) => {
    console.log("ERROR:", err);
    process.exit(1);
  });