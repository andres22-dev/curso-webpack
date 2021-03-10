
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtracPlugin = require('mini-css-extract-plugin');
//Importamos el plugin para poder hacer uso de el 
const CopyPlugin = require('copy-webpack-plugin');
//Importamos los plugins que acabamos de instalar
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {

  entry: './src/index.js',
  output:{
    path: path.resolve(__dirname, 'dist'),
    //cambios este elemento y le pondremos tanto el name para que lo identifique
      //como la parte del contenthash para que nos muestre eso
    filename: '[name].[contenthash].js',
    //para insertar el cambio y mover las fuentes a otra carpte lo hacemos aqui
    assetModuleFilename: 'assets/image/[hash][ext][query]'
  },
  resolve:{

    extensions:['.js'],
    //Agregamos una key alias a nuestro objeto resolve
      //para ponerles nombres mas pequenos a las extensiones
        //de nuestros archivos
    alias:{
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),

    }
  },

  module:{
  
    rules :[
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {

        loader: 'babel-loader'
      }

    }, 

      {
      test: /\.css$/i, 

      use:[MiniCssExtracPlugin.loader, 'css-loader'], 

      },
      //anadimos un nuevo objeto en nuestras reglas
        //que nos servira para el manejo de imagenes
      {
        //expresion regularo con imagenes .png
        test:  /\.png/,
        //tipo de archivo
        type: 'asset/resource'

      },
      //anadimos la configuracion de las dependencias que estamos usando
      {

        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options:{

            limit:10000,
            mimetype:"application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          }
        }


      }
    ]
  },

  plugins: [
  
    new HtmlWebpackPlugin({

      inject: true,

      template: './public/index.html',

      filename: './index.html' 

    }),
    //Le anadimos una configuracion al plugin que nos permite compilar en css
    new MiniCssExtracPlugin({

      filename: 'assets/[name].[contenthash].css'

    }),
    //Instanciamos el plugin
      //Luego le pasamos por parametro la configuracion que va a tener
    new CopyPlugin({
      patterns:[
        {
          //De esta forma decimos que aqui es donde se encuentran los archivos 
            //Que vamos a mover
          from: path.resolve(__dirname, 'src','assets/images'),
          //hacia donde lo vamos a mover
          to: "assets/images"
        }
      ]
    })
  ],
  optimization:{
    minimize: true,
    minimizer: [
      //Instanciamos las dependencias que estamos importando
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }



}