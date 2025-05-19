# Vambe: Análisis transcripciones

## Enlace a la aplicación

`https://`

## Descripción general

Este proyecto consta de una aplicación web conformada principalmente por una `api` donde se reciben diversas solicitudes mediante protocolo `HTTPS`y donde se realizó una integración con un Large Lenguaje Model `LLM`. También el proyecto posee una parte `web` que es donde se desarrolló el lado del cliente de la aplicación.

La aplicación busca procesar un set de datos entregado para poder extraer información últil para Vambe mediante un `LLM` y que está pueda ser analizada en un panel interactivo. El set de datos consta con información acerca de reuniones con potenciales clientes de Vambe.

## Herramientas utilizadas

Se optó por usar `Typescript` como lenguaje de programación para construir la aplicación web. Los frameworks utilizados son `NestJS` y `Next.js`. Se eligieron estas opciones para el desarrollo por la gran cantidad de herramientas útiles que pueden brindar y por la estructura de los proyectos que facilitan la creación de código modular y escalable.

Para la base de datos se utilizó `PostgreSQL` por la gran facilidad que tiene para integrarse con `NestJS` mediante `TypeOrm`.

Por otro lado, para la integración con el `LLM` se optó por usar la api de `cohere` y en particular se usó modelo `Command R+`. Esta decisión se tomó por el gran entendimiento del español y por su gran capacidad de realizar tareas estructuradas como clasificación y extracción de campos.

También, se utilizó la versión `3.9` de `Python` para la creación de un script capaz de enviar automáticamente los datos del set entregado a la `api` para que esta los procese.

Finalmente, en lo que respecta al ambiente de desarrollo o local, se utilizó `Docker` correr la aplicación de manera fácil y coordinada. Para correr el `compose` se incluyó un contenedor que se encarga de una configuración de un proxy inverso con `Nginx` para facilitar de los distintos servicios.

## Servicios utilizados para el despliegue de la aplicación

Se utilizó `Railway` para alojar la base de datos y el servidor que consta de la `api` desarrollada. Además, se utilizó `Vercel` para alojar el cliente de la aplicación por la gran flexibilidad y facilidad que tiene este servicio con `Next.js`.

## Arquitectura

La arquitectura consta de un modelo `Cliente-Servidor`, ya que la aplicación consta de un cliente que simplemente solicita datos al servidor y este los procesa para mostrarlos en el panel dinámico. La integración con el `LLM` se realizó desde el servidor, donde se creó un servicio especial para la interacción con este.

## Ejecución local

#### 1. Clona el repositorio

```bash
git clone https://github.com/CGR0/Vambe-Prueba.git
```

#### 2. Variables de entorno

Para mayor comodidad se están incluyendo las variables de entorno necesarias para ejecutar la app en la carpeta `/env`. Sin embargo, se debe crear un archivo `.env` en la carpeta de `/data_migration` para luego correr el script de python. Este `.env` debe tener la siguiente variable:

```code
API_URL=http://localhost/api
```

#### 3. Ejecutar aplicación

Desde la raíz del proyecto se debe ejecutar el siguiente comando:

```bash
docker compose up --build
```

Posiblemente después de ejecutar ese comando y se levanten los contenedores, puede haber algún error con las dependencias. Esto se resuelve al ejecutar los siguientes comandos:

```bash
docker compose exec api npm install
```

```bash
docker compose exec web npm install
```

Finalmente, si se ejecuta por primera vez el proyecto, se debe ir a la carpeta `/data_migration` y correr el siguiente comando:

```bash
python3 main.py
```

Este último comando toma aproximadamente 30 minutos en migrar todos los datos (por limitaciones de la capa gratuita de `cohere`) y una vez terminada la migración se puede acceder a la aplicación al ingresar la siguiente ruta en un navegador:

`http://localhost`
