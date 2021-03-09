
//Creamos una constante y utilizamos un requiere para traer
 //Este elemento, esto ya esta disponible en node asi que no
  //Necesitamos instalar nada

const path = require('path');
//traemos esta dependencia que la instalamos con un comando de npm previamente
const HtmlWebpackPlugin = require('html-webpack-plugin');

//Creamos un modulo que vamos a exportar con un objeto que va a tener
 // La configuracion deseada de nuestro proyecto

module.exports = {
  //la primera configuracion que anadimos es entry la cual nos va a permitir
    //establecer el punto de entrada de nuestra aplicacion
      // apartir de aqui todo se va conectando
  entry: './src/index.js',

  //Es hacia donde enviamos lo que va a preparar webpack en este caso podremos
   //establecer un nombre de carpeta o nombre de archivo y entre otros 
    //es importante establecer un nombre especifico para esto que es la carpeta
      //dist que es un diminutivo de distribution

  //En un objeto dentro de output vamos a anadir los elementos internos para trabajar
    //lo primero es path que es lo que trajimos al inicio para hacer el uso de resolve 
      // que nos va a permitir saber donde se encuentra nuestro proyecto en que
        //directorio y poderlo utilizar  de esta forma no tendremos un problema con el 
          //nombre de la carpeta, o donde estoy posicionado.

    //Asi cuando enviemos nuestro proyecto a un servidor en la nube va a preparar
      //nuestro proyecto va a utilizar el directorio que esta encontrandoce este 
        // repositorio o este proyecto con eso garantizamos que siempre encontrara
          // La carpeta donde se ubica este proyecto.
    //Podremos utilizar el nombre que queramos por en este caso es recomendado 
      // utilizar dist ya que es un estandar de la compilacion de estos proyectos
  output:{
    path: path.resolve(__dirname, 'dist'),
    //podremos ponerle un nombre al archivo resultante del js que se va a unificar
      //podremos encontrarlo como bundel o hash pero por el momento utilizamos main
    filename: 'main.js',
  },

  //extensiones con las que trabajaremos
  resolve:{

    //En un arreglo pasaremos las extensiones que vamos a utilizar
      //normalmente lo que utilizamos .js 
       // pero si estamos trabajando con svelte o react vamos a tener 
        // que establecer que tipo de extensiones va a tener que
          //identificar webpack para leer los archivos que hay dentro de
            // nuestro proyecto
    extensions:['.js'],
  },
//modulo que tiene un objeto
  module:{
    //que tiene unas reglas pra establecer  un arreglo donde voy a tener
      //distintas configuraciones dependiendo de lo que le agregue a esas variables
    rules :[
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {

        loader: 'babel-loader'
      }

    }
  ]
  },

  plugins: [
    //hacemos una instancia de lo que definimos en el inicio del archivo
      // le anadimos por parametro un objeto donde vamos a tener las 
        //configuraciones que le vamos anadir a nuestro plugin
    new HtmlWebpackPlugin({

      //inyecta el bundle al template html
      inject: true,
      //la ruta al template html
      template: './public/index.html',
      //nombre final del archivo
      filename: './index.html' 

    })
  ]



}