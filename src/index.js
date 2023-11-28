const dotenv = require( 'dotenv' )
dotenv.config()

const { connectDB } = require( './config/db.js' )
connectDB()

const TelegramBot = require( 'node-telegram-bot-api' )
const { altaUsuario, buscarUsuario, listaUsuarios } = require( './services/userService.js' )
const { getStartMessage } = require( './services/chatService.js' )
const { createCommand, deleteCommand, findCommand, getCommands } = require( './services/commandService.js' )

const bot = new TelegramBot( process.env.TELEGRAM_BOT_TOKEN, { polling: true } )

let listaComandos = []
const whiteList = [ 'new', 'start', 'delete', 'help' ]

bot.onText( /\/new (.+)/, async ( msg, match ) => {
  const chatId = msg.chat.id
  const text = match[ 1 ].split( ' ' )[ 0 ].toLowerCase()
  if ( text !== undefined && text !== null ) {
    const commandExist = await findCommand( text )
    if ( commandExist.length === 0 ) {
      await createCommand( text )
      listaComandos = await getCommands()
      bot.sendMessage( chatId, `Creado comando ${ text }` )
    }
  }
} )

bot.onText( /\/delete (.+)/, async ( msg, match ) => {
  const chatId = msg.chat.id
  const text = match[ 1 ].split( ' ' )[ 0 ].toLowerCase()
  if ( text !== undefined && text !== null ) {
    const commandExist = await findCommand( text )
    if ( commandExist.length !== 0 ) {
      await deleteCommand( text )
      listaComandos = await getCommands()
      bot.sendMessage( chatId, `Eliminando comando ${ text }` )
    }
  }
} )

bot.on( 'message', async ( msg ) => {
  const { id: chatId, username } = msg.chat
  const command = msg.text.toLowerCase()
  let text = command.slice( 1 )
  if ( text.includes( ' ' ) )
    text = text.split( ' ' )[ 0 ]

  if ( !command.startsWith( '/' ) || !listaComandos.includes( text ) && !whiteList.includes( text ) ) {
    bot.sendMessage( chatId, `No es un comando válido` )
  } else if ( text === 'start' || text === 'help' ) {
    const usuario = await buscarUsuario( chatId )
    if ( !usuario )
      await altaUsuario( chatId, username )

    listaComandos = await getCommands()
    const message = getStartMessage( username, listaComandos )
    bot.sendMessage( chatId, message )
  } else if ( listaComandos.includes( text ) ) {
    if ( text === 'vitamina' ) {
      const usuariosList = await listaUsuarios()
      usuariosList.forEach( user => {
        bot.sendMessage( user.chatId, `${ username } ha dado ${ text }` )
      } )
    } else {
      bot.sendMessage( chatId, `Has ejecutado ${ text }` )
    }
  }
} )