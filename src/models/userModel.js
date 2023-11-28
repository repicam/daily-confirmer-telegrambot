const mongoose = require( 'mongoose' )

const userSchema = new mongoose.Schema( {
  chatId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
} )

module.exports = mongoose.model( 'User', userSchema )