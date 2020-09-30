# Integración de Svelte con Express.

Si compruebas el fichero "client/rollup.config.js" verás que ha sido mudificado (linea 36) de modo que cuando se ejecura un "npm run build" en Svelte la aplicación resultante de la compilación se almacena en este directorio "service/public".

A su vez, si miras el fichero "service/index.js" linea 12, verás que se configura Express para servir los contenidos de este mismo direcotrio como ficheros estáticos.

De esta manera Express funciona como servicio HTTP para acceder a los ficheros generados por Svelte.