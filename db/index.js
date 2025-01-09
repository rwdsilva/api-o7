const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rwdsilva:Vehwes123@n@cluster0.hcp4c.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
