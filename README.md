## API REST con Node, Express, PostgreSQL y AWS

El siguiente proyecto sirve como ejemplo de una API Rest para una web de subida y bajada de archivos.
La API es capaz de:
* Login y Registro
* Recupero de contraseña por Mail
* Almacenar usuarios con contraseña encriptada en una base de datos (Postgres)
* Servicio de subida y bajada de archivos a un Bucket S3
* Buscador de imagenes con la API de Unsplash y subir una imagen al Bucket directamente desde el resultado de busqueda
* Sistema de autenticacion con JSON Web Token
* Implementacion de Docker

### Instrucciones:

Clonar repositorio:
```
$ git clone https://github.com/irf98/node-api-rest

$ cd node-api-rest

$ npm install
```

A continuacion, asegurate de establecer las variables de entorno en un archivo `.env` y usar como guia el archivo `.env.template`

Para probar que el servidor funcione correctamente:
```
$ npm run dev
```

Por ultimo, es posible generar una imagen Docker, para eso utilizar los siguientes comandos:
```
$ docker build --tag node-docker .
```

Para ver la imagen generada:
```
$ docker images
```

Correr la imagen:
```
$ docker run --rm node-docker
```
