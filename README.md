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

### Uso basico de los endpoints:

Crear usuario:
```
POST request: /api/users/signup

body:
  
  {
    "email": "john@doe.com",
    "password": "password"
  }
 
```

Iniciar sesion:
```
POST request: /api/users/signin

body:
  
  {
    "email": "john@doe.com",
    "password": "password"
  }
 ```

Actualizar contraseña:
```
PUT request: /api/users/recovery

body:
  
  {
    "email": "john@doe.com",
    "password": "newpassword"
  }
  
  POST request /api/users/request-recovery (si el envio de email esta activado)
  
  body:
  
  {
    "email": "john@doe.com"
  }
 ```
 
Checkear si el token del usuario esta activo:
```
GET request: /api/users/protected

 ```

Subir imagen desde el dispositivo a Bucket S3:
```
POST request: /api/files/upload

body:
  
  {
    "file": test-file.txt
  }
 ```
 
Descargar archivo del Bucket S3:
```
GET request: /api/files/download/:key

param: ID del archivo en el Bucket
 ```


Subir imagen al Bucket S3 desde una URL:
```
POST request: /api/files/image-upload

body:
  
  {
    "url": "https://example-link.com/image-123"
  }
 ```


Buscar imagenes en Unsplash:
```
GET request: /api/images?title=query

query: resultado de busqueda (ejemplo: perros)

 ```



