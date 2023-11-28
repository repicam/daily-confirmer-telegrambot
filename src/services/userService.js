const User = require( '../models/userModel.js' )

const altaUsuario = async ( chatId, username ) => {
  return await User.create( { chatId, username } )
}

const buscarUsuario = async ( chatId ) => {
  return await User.findOne( { chatId } )
}

const listaUsuarios = async () => {
  return await User.find()
}

module.exports = {
  altaUsuario,
  buscarUsuario,
  listaUsuarios
}