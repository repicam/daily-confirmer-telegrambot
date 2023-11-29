import { Command } from '../models/commandModel.mjs'

export const getCommands = async () => {
  const commandsFind = await Command.find()
  let commandList = []
  commandsFind.forEach( cmd => {
    commandList.push( cmd.command )
  } )
  return commandList
}

export const findCommand = async ( command ) => {
  return await Command.find( { command } )
}

export const createCommand = async ( command ) => {
  return await Command.create( { command } )
}

export const deleteCommand = async ( command ) => {
  return await Command.deleteOne( { command } )
}