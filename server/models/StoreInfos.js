const mongoose = require('mongoose')

const storeInfosSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming there's a User model
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  },
  whatsappNumber: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  storeName: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  storeBio: {
    type: String,
    maxlength: 200
  },
  storeLogo: {
    type: String // cloudinary URL or file name
  }
}, { timestamps: true });

module.exports = mongoose.model('StoreInfos', storeInfosSchema);
