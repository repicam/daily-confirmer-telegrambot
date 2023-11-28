import { Schema, model } from 'mongoose'

const commandSchema = new Schema( {
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

export const Command = model( 'Command', commandSchema )