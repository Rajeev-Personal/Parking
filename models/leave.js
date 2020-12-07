const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  carNumber : {
    type : String,
    required:true
  },
},{timestamps: true});


const CarLeave = mongoose.model('CarLeave', leaveSchema);

module.exports = CarLeave;
