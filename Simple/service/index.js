//https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4

const express = require('express');
const nunjucks = require('nunjucks');

const http = require('http');
const WebSocket = require('ws');

const appExpress = express();

const templatesPath = './templates/'
nunjucks.configure( templatesPath, {
    autoescape: true,
    express: appExpress
} ) ;

/** 
 * Montamos un servicio HTTP para WebSocket.
 * Las peticiones recibidas por el servicio HTTP
 * pasarán posteriormente a Express.
 */
const server = http.createServer(appExpress);
const webSocketServer = new WebSocket.Server({ server });

const srvPort = 3000;

appExpress.get('/',(req,res)=>{
    var datos = {
        fecha: Date(),
    }
    return res.render( 'index.html', datos ) ;
})

/**
 * Definimos qué hacer para el evento de la conexión de
 * un cliente al servicio de socket.
 */ 
webSocketServer.on('connection', (webSocket) => {

    webSocket.send('Hola. Ya estás conectad@.');

    /**
     * Definimos qué hace para el evento de la recepción
     * de un mensaje.
     * - Responde al remitente con un:
     *      '*-> Tú dices: *********'
     * - Envía el mensaje a todos los clientes conectados.
     * - Responde al remitente con un:
     *      '***********************'
     */ 
    webSocket.on('message', (msg) => {
        console.log(`Mensaje: ${msg}`);
        webSocket.send('*-> Tú dices: *********');
        webSocketServer.clients.forEach((cli)=>{
            cli.send(msg);
        })
        webSocket.send('***********************');
    });

});

/**
 * Arrancamos el servicio HTTP
 */
server.listen(srvPort, () => {
    console.log(`Server started on http://localhost:${server.address().port}`);
});