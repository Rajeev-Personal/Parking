const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const op3Schema = new Schema({
  carColor : {
    type : String,
    required:true
  },
},{timestamps: true});


const CarParkOption3 = mongoose.model('CarParkOption3', op3Schema);

module.exports = CarParkOption3;
