/** 
 * Referencias: 
 * https://medium.com/factory-mind/websocket-node-js-express-step-by-step-using-typescript-725114ad5fe4
 */ 

const http = require('http');
 /** Necesitamos: npm install express ws*/
const express = require('express');
const WebSocket = require('ws');

const appExpress = express();

/** 
 * Montamos un servicio HTTP.
 * 
 * Las peticiones recibidas por el servicio HTTP
 * pasarán posteriormente a Express.
 * 
 * El mismo servicio HTTP es empleado por WebSocket.
 * 
 * De este modo podemos tener en nuestra aplicación
 * nuestra API, servir plantillas y usar WebSockets.
 */
const server = http.createServer(appExpress);
const webSocketServer = new WebSocket.Server({ server });

const srvPort = 3000;

webSocketServer.on('connection', (webSocket) => {
    /**
     *  Inicio A: acciones en el establecimiento
     *  de conexión de cada cliente.
     * */
    webSocket.send('Hola. Ya estás conectad@.');
    /** Fin A*/
    webSocket.on('message', (msg) => {
        /** Inicio B: acciones recepción de cada mensaje */
        console.log(`Nuevo mensaje: ${msg}`);
        /** Fin B */
        webSocketServer.clients.forEach((cli)=>{
            /** 
             * Inicio C: Acciones emprendidas para cada uno
             * de los cliente conectados en la 
             * recepción de un mensaje 
             */
            console.log(`Reenviando mensaje a ${webSocketServer.clients.length} clientes`)
            cli.send(msg);
            /** Fin C */
        })
    });

});

/**
 * Arrancamos el servicio HTTP
 */
server.listen(srvPort, () => {
    console.log(`Server started on http://localhost:${server.address().port}`);
});