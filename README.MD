# Simple Bull

Librería para crear Jobs super estables de forma muy simple

# Motivación

Bull.js es la librería más completa para hacer workers en node, es bastante ligera y ocupa un sistema de eventos que permite manipular un job en todas las etapas, sin embargo, programar un job de forma correcta en bull es un poco complejo, esta librería la hice con el fin de reducir esa dificultad, pero conservar al máximo las funcionalidades de bull

# Prerequisitos

Simple bull es una librería de Node que usa Redis como sistema de cola, por lo tanto, antes de comenzar asegurate de tener Redis instalado de forma local.

Debes configurar las siguientes variables de ambiente en tu proyecto:

```sh
export REDIS_HOST='your-redis-host'
export REDIS_PORT='your-redis-port'
export REDIS_PASSWORD='your-redis-pass'
```

# Instalación

Usando npm:

```
npm install --save @rokketlabs/simple-bull
```

Usando yarn:

```
yarn add @rokketlabs/simple-bull
```

# Uso

El core de todos los workers son las colas, estas se registran en redis, y a cada cola se le pueden asignar todos los workers que desees:

#### Registro de colas

```js
import { initQueue } from '@rokketlabs/simple-bull';

initQueue({
  queueName: 'email-queue',
  jobs: [sendEmail, checkEmail]
});
```

Se registra la cola `email-queue` en redis cada vez que el servidor se levanta, esta cola se encarga de orquestar los jobs `sendEmail` y `checkEmail`.

#### Recurrent Jobs

```js
import checkEmail from './checkEmail';

export default {
  name: 'checkEmail', // Nombre del job
  processor: checkEmail, // Función que se ejecuta el job
  frequency: 5000, // Recurrencia en ms del job
  delay: 1000, // Tiempo de espera
  limit: 10000 // Límite de repeticiones del job
};
```

Los jobs recurrentes ejecutan una función cada cierto tiempo, en este ejemplo, el job ejecuta una función que revisa emails, se ejecuta cada 5 segundos y espera 1 segundo antes de comenzar la ejecución.

#### Event Jobs

```js
import sendEmail from './sendEmail';

export default {
  name: 'sendEmail', // Nombre del job
  processor: sendEmail // Función que se desea ejecutar
};
```

Cuando un job no tiene el parametro `frequency`, simple-bull lo deja disponible para ser llamado de forma remota.

```js
import { fireJob } from '@rokketlabs/simple-bull';

await fireJob({
  queueName: 'email-queue',
  jobName: 'send-email',
  data: { email: 'john@doe.com', message: 'Hi' }
});
```

Para dispararlo de forma remota desde otro servidor, configurar las variables de ambiente para apuntar al mismo redis, y usar la función `fireJob` la cual deja un evento en cola.

#### Custom Hooks

En algunos casos es necesario tener control de lo que ocurre luego de la ejecución de un job, simple-bull resuelve esto en dos niveles

#### Queue Hooks

```js
import { initQueue } from '@rokketlabs/simple-bull';

initQueue({
  queueName: 'email-queue',
  onSuccess: ({ result, job, successMessage }) => {
    // execute code
  },
  onFail: ({ err, job, errorMessage }) => {
    // execute code
  },
  jobs: [sendEmail, checkEmail]
});
```

Cada vez que `sendEmail` y `checkEmail` se hayan ejecutado, alguno de los dos hooks se dispara y con esto puedes realizar acciones después de la ejecución.

#### Job Hooks

```js
import checkEmail from './checkEmail';

export default {
  name: 'checkEmail', // Nombre del job
  processor: checkEmail, // Función que se ejecuta el job
  frequency: 5000, // Recurrencia en ms del job
  delay: 1000, // Tiempo de espera
  limit: 10000, // Límite de repeticiones del job
  onSuccess: ({ result, job, successMessage }) => {
    // execute code
  },
  onFail: ({ err, job, errorMessage }) => {
    // execute code
  }
};
```

Cada vez que `checkEmail` se ejecute, alguno de los dos hooks se dispara y con esto puedes realizar acciones después de la ejecución de este job específico.

**Important Notes**:

Cada vez que utilizas alguno de los dos hooks, simple-bull dejará de mostrar los logs por defecto de exito o error en el job o la cola que hayas activado los hooks, dado que le pasa el contro a tus funciones, tu te tienes que encargar de loggear correctamente el resultado de las funciones.

#### Loggers

Las funciones `successMessage` y `errorMessage` son loggers que tienen un estilo mucho más legible para usarlas necesitan los siguientes parámetros:

```js
successMessage(job: JobObject, message: string)
errorMessage(job: JobObject, message: string)
```

## Hecho con:

- [Bull](https://github.com/OptimalBits/bull) - Libería de Jobs

## Autor

- **[Roberto Zibert](https://github.com/robertzibert)**

## License

Simple Bull lincence it's MIT, happy coding ;)
MIT © [Roberto Zibert](https://medium.com/media/b9bbc4fe57d0fcb03deb64a4d0f537af?postId=7ac01da88ab3)
