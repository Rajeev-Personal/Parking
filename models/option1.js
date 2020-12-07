const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const op1Schema = new Schema({
  carColor : {
    type : String,
    required:true
  },
},{timestamps: true});


const CarParkOption1 = mongoose.model('CarParkOption1', op1Schema);

module.exports = CarParkOption1;
