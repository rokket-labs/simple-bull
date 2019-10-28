# Simple Bull

Librería para crear Jobs estables de forma muy simple

### Prerequisitos

Simple bull es una librería de Node que usa Redis como sistema de cola, por lo tanto, antes de comenzar asegurate de tener Redis instalado de forma local.

### Instalación

Usando npm:

```
npm install --save @rokketlabs/simple-bull
```

Usando yarn:

```
yarn add @rokketlabs/simple-bull
```

### Uso

Simple Bull es una librería que permite que te permite hacer workers de forma sencilla para que solo te preocupes de tu código, y no de que los jobs se ejecuten de forma correcta.

La parte central de todos los workers son las colas, estas se registran en redis, y a cada cola se le pueden asignar todos los workers que desees:

#### Registro de colas

```js
import { initQueue } from '@rokketlabs/simple-bull'

initQueue({
	queueName: 'email-queue'
	jobs:[sendEmail, checkEmail]
})
```

En este caso la cola `email-queue` se registra en redis cuando se levante el servidor, y asociada a esta cola se encuentra los jobs sendEmail y checkEmail.

#### Jobs Recurrentes

```js
import checkEmail from './checkEmail'

export default {
	name: 'checkEmail',    // Nombre del job
	processor: checkEmail, // Función que se desea ejecutar
	frequency: 5000        // Recurrencia del job
	delay: 1000			   // Tiempo de espera
	limit: 10000           // Duración máxima del job
	onSuccess: (currentJob, logger) => {
		logger(`${currentJob.name} success !!`)
	}
}
```

Los jobs recurrentes se usan cuando se desea ejecutar una función cada cierto tiempo, en este ejemplo, el job para revisar emails se ejecuta cada 5 segundos, esperando 1 segundo para comenzar la ejecución, y cuando este tome más de 10 segundos simple-bull mata el proceso ya que le pusimos un límite de 10000 ms.

Además existen dos hooks que permiten ejecutar más funciones de acuerdo al resultado del job, en este caso si se ejecuta de forma correcta lanza un mensaje personalizado.

#### Jobs de Eventos

```js
import sendEmail from './sendEmail';

export default {
  name: 'sendEmail', // Nombre del job
  processor: sendEmail, // Función que se desea ejecutar
  onSuccess: (currentJob, logger) => {
    logger(`${currentJob.name} success !!`);
  }
};
```

Para dejar Jobs disponibles de forma remota, solamente debes remover el atributo frequency, de esta forma simple-bull asume que es un job que solamente se puede activar a través de eventos, para dispararlo de forma remota solamente debes apuntar al mismo redis que el job y llamar la siguiente funcion

```js
import {fireJob} from '@rokketlabs/simple-bull'

await fireJob({
	queueName: 'email-queue',
	jobName: 'send-email'
	data: {email: 'x@x.x', message: 'Hi'}
})
```

En este caso otro servidor activa el job send-email, con el mensaje que desea enviar.

## Hecho con:

- [Bull](https://github.com/OptimalBits/bull) - Libería de Jobs

## Autor

- **[Roberto Zibert](https://github.com/robertzibert)**

## License

Simple Bull lincence it's MIT, happy coding ;)
MIT © [Roberto Zibert](https://medium.com/media/b9bbc4fe57d0fcb03deb64a4d0f537af?postId=7ac01da88ab3)
