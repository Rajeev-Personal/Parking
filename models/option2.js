const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const op2Schema = new Schema({
  carNumber : {
    type : String,
    required:true
  },
},{timestamps: true});


const CarParkOption2 = mongoose.model('CarParkOption2', op2Schema);

module.exports = CarParkOption2;
