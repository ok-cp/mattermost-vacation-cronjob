const mongoose = require('mongoose');

// Define Schemes
const hugaSchema = new mongoose.Schema({
  huga: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  hugadate: { type: String, required: true, unique: true },
  completed: { type: String, default: false }
},
{
  timestamps: true
});

// Create new huga document
hugaSchema.statics.create = function (payload) {
  // this === Model
  const huga = new this(payload);
  // return Promise
  return huga.save();
};

// Find All
hugaSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by date
hugaSchema.statics.findOneByDate = function (hugadate) {
  return this.findOne({ hugadate });
};

// Update by Hugadate
hugaSchema.statics.updateByHugadate = function (hugadate, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ hugadate }, payload, { new: true });
};

// Delete by hugadate
hugaSchema.statics.deleteByHugadate = function (hugadate) {
  return this.remove({ hugadate });
};

// Create Model & Export
module.exports = mongoose.model('Huga', hugaSchema);
