# Simple Bull 🐂

Create jobs stably, quickly and easily

# Motivation

Bull.js is a great library to programming jobs on NodeJS, it is quite light and occupies an event system that allows manipulating a job in all its stages. But, properly programming a job in Bull is a bit complex.

I made this library in order to reduce this difficulty, but to preserve the bull's functionality and good practices as much as possible.


# Why use Simple Bull?

🌟 Very easy to implement
🔄 Stables recurrent jobs
🛰 Remote event jobs 
🔎 Great log system

# Install

Versions < 1.4.x

```
npm install --save @rokketlabs/simple-bull
```

Usando yarn:

```
yarn add @rokketlabs/simple-bull
```

<!-- Versions > 1.4.x

```
npm install --save simple-bull
```

Usando yarn:

```
yarn add simple-bull
``` -->

# Usage

Simple Bull trabaja con colas, las cuales se registran y subscriben en redis, cada Job es una función de Node que se dispara de forma recurrente o remota.

####  Redis Connection
Simple Bull es muy flexible a la hora de configurar la conexión a redis. Además reusa y deja cerrada las conexiones para garantizar un uso correcto del Redis.

#####  Configuración con Variables de Ambiente
Puedes configurar por medio de variables de ambiente o archivos .env los parámetros de conexión de tu Redis.
```sh
# You have 2 ways to stablish connection with your redis

# Redis connection params without SSL
export REDIS_HOST='localhost'
export REDIS_PORT='13376'
export REDIS_PASSWORD='youpass'  [optional]
export REDIS_USERNAME='username' [optional]

# Or, Redis url without ssl
export REDIS_STRING_URL='redis://username:password@host:port'

# If your connection uses SSL you can use the two previous ways
export REDIS_HOST='localhost'
export REDIS_PORT='13376'
export REDIS_PASSWORD='youpass'  
export REDIS_USERNAME='username' 
export REDIS_SSL=true

# Redis connection params with SSL
export REDIS_STRING_URL='rediss://username:password@host:port'
```
#####  Configuración desde el código
Alternativamente también puedes configurar los parámetros de conexión al Redis al momento de inicializar una cola de la siguiente forma:
```js
import { initQueue } from '@rokketlabs/simple-bull';

initQueue({
  queueName: 'email-queue',
  jobs: [sendEmail, checkEmail],
  redis: {
    host: 'your-redis-host',
    port: 'your-redis-url',
    username: 'username',
    password: 'username',
    ssl: true || false
  }
});

initQueue({
  queueName: 'email-queue',
  jobs: [sendEmail, checkEmail],
  redis: {
    url: 'redis://username:password@host:port',
  }
});
```


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
  name: 'checkEmail',    // Nombre del job
  processor: checkEmail, // Función que se ejecuta el job
  frequency: 5000,       // Recurrencia en ms del job
  delay: 1000,           // Tiempo de espera
  limit: 10000           // Límite de repeticiones del job
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

const onSuccess = ({ result, job, successMessage }) => {}
const onFail =  ({ err, job, errorMessage }) => {}

initQueue({
  queueName: 'email-queue',
  onSuccess,
  onFail,
  jobs: [sendEmail, checkEmail]
});
```

Cada vez que `sendEmail` y `checkEmail` se hayan ejecutado, alguno de los dos hooks se dispara y con esto puedes realizar acciones después de la ejecución.

#### Job Hooks

```js
import checkEmail from './checkEmail';

const onSuccess = ({ result, job, successMessage }) => {}
const onFail =  ({ err, job, errorMessage }) => {}

export default {
  name: 'checkEmail',    // Nombre del job
  processor: checkEmail, // Función que se ejecuta el job
  frequency: 5000,       // Recurrencia en ms del job
  delay: 1000,           // Tiempo de espera
  limit: 10000,          // Límite de repeticiones del job
  onSuccess,
  onFail
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

# TODO:
- [x] Reuse Redis connections.
- [ ] Test Implementation.
- [ ] Test Coverage.
- [ ] English Documentation [WIP].
- [ ] Redis Cluster connection.
- [ ] Concurrent Jobs.
- [ ] timeLimit implementation.
- [ ] onProgress Hook.

# Hecho con:

- [Bull](https://github.com/OptimalBits/bull) - Bull jobs library

# Autor

- **[Roberto Zibert](https://github.com/robertzibert)**

# License

Simple Bull lincence it's MIT, happy coding ;)
[Roberto Zibert](https://github.com/rokket-labs/simple-bull/blob/master/LICENCE) ©
