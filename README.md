# Mi ToDo-list
Es una SPA que permite tener una lista de tareas por hacer

## Técnico
- Monorepositorio con código backend en `api` y el código backend `front` 
- ReactJS V.17 (usando [Create React App](https://github.com/facebook/create-react-app))
- Node js - Express
- MongoDB
- Testing Library con Jest para UI Test
- Docker para correr local

## Iniciar proyecto en local
El proyecto contiene imágenes de Docker para construir contenedores que correrán en paralelo y así funcionará localmente sin tener dependencias locales.

```sh
docker-compose up
```


Si por otro lado se desea ejecutar el proyecto sin usar Docker, se debe descargar las dependencias, inicialmente debes tener node instalado en la máquina local:

```sh
cd api
npm i

cd ../front
npm i
```

Asegúrate de tener las variables de ambiente seteadas, para el caso de mongoDB se generó un cluster gratuito generada desde la [página oficial de MongoDB](https://www.mongodb.com/cloud/atlas/), para probar local, solicitar el string de conexión.