import { Schema, model } from 'mongoose'

const userSchema = new Schema( {
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

export const User = model( 'User', userSchema )