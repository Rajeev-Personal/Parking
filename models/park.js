const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema({
  carNumber : {
    type : String,
    required:true
  },
  carColor : {
    type : String,
    required:true
  },
  carSlot : {
    type : Number,
    required:false
  },
},{timestamps: true});


const CarPark = mongoose.model('CarPark', parkSchema);

module.exports = CarPark;
