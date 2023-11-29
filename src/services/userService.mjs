import { User } from '../models/userModel.mjs'

export const altaUsuario = async ( chatId, username ) => {
  return await User.create( { chatId, username } )
}

export const buscarUsuario = async ( chatId ) => {
  return await User.findOne( { chatId } )
}

export const listaUsuarios = async () => {
  return await User.find()
}