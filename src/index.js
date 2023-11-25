import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './config/db.js'
connectDB()

import TelegramBot from 'node-telegram-bot-api'
import { altaUsuario, buscarUsuario } from './services/userService.js'

const bot = new TelegramBot( process.env.TELEGRAM_BOT_TOKEN, { polling: true } )

bot.onText( /\/start/, async ( msg ) => {
  const { id: chatId, username } = msg.chat

  const usuario = await buscarUsuario( chatId )
  if ( usuario ) {
    bot.sendMessage( chatId, `Hola ${ username }, estás registrado` )
  } else {

    await altaUsuario( chatId, username )

    bot.sendMessage( chatId, `Bienvenido!!!` )
  }
} )

