const mongoose = require( 'mongoose' )

const commandSchema = new mongoose.Schema( {
  command: {
    type: String,
    required: true
  }/*,
  chatId: {
    type: String,
    required: true
  }*/
}, {
  versionKey: false,
  timestamps: true
} )

module.exports = mongoose.model( 'Command', commandSchema )