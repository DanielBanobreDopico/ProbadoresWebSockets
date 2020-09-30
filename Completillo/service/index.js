const { static } = require('express');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const appExpress = express();

const server = http.createServer(appExpress);
const webSocketServer = new WebSocket.Server({ server });

const srvPort = 3000;

appExpress.use('/',static('./public'))

const clients = [];

/**
 * Definimos qué hacer para el evento de la conexión de
 * un cliente al servicio de socket.
 */ 
webSocketServer.on('connection', (webSocket) => {

    var ownId = Date.now();

    var cli = {
        id: ownId,
        socket: webSocket,
    }

    clients.push(cli);

    webSocket.send(ownId);

    webSocket.on('message', (msg) => {
        var message = {
            from: ownId,
            content: msg,
        }
        var msgJSON = JSON.stringify(message);
        clients.forEach((cli)=>{
            cli.socket.send(msgJSON);
        })
    });
});

/**
 * Arrancamos el servicio HTTP
 */
server.listen(srvPort, () => {
    console.log(`Server started on http://localhost:${server.address().port}`);
});