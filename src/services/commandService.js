const Command = require( '../models/commandModel.js' )

const getCommands = async () => {
  const commandsFind = await Command.find()
  let commandList = []
  commandsFind.forEach( cmd => {
    commandList.push( cmd.command )
  } )
  return commandList
}

const findCommand = async ( command ) => {
  return await Command.find( { command } )
}

const createCommand = async ( command ) => {
  return await Command.create( { command } )
}

const deleteCommand = async ( command ) => {
  return await Command.deleteOne( { command } )
}

module.exports = {
  getCommands,
  findCommand,
  createCommand,
  deleteCommand
}