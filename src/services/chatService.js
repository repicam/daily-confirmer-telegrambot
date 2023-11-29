export const getStartMessage = ( username, commandsList ) => {
  let commandsStr = ''
  commandsList.forEach( command => {
    commandsStr += '\n/'.concat( command )
  } )
  return `Hola ${ username }. Esta es la lista de comandos disponible:${ commandsStr }`
}