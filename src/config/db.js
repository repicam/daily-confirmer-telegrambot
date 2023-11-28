import { connect } from 'mongoose'

export const connectDB = () => {
  connect(
    process.env.MONGODB_URI
  ).then( () => {
    console.log( 'Conectado a MongoDB' )
  } ).catch( ( error ) => {
    console.log( `Error conectando a MongoDB: ${ error }` )
  } )
}