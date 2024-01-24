/*Los procesos asíncronos son indispensables en cualquier lenguaje de programación para la ejecución 
de cualquier tarea avanzada, la cual siempre tendrá la necesidad de realizar peticiones de datos
o recursos externos que generarán esa asincronía de la ejecución de los programas.*/


/*ASINCRONÍA EN JavaScript.*/

/*La asincronía en JavaScript es uno de los retos que los desarrolladores de este lenguaje deben tener en cuenta.
Su particularidad radica en que la ejecución de los programas se lleva a cabo en un solo subproceso o hilo. 
Esto podría suponer, como desventaja, que las tareas que necesitan una respuesta bloqueen el resto del programa;
pero, a cambio, la gestión de la concurrencia de procesos es más sencilla.

En todo caso, los entonrnos de ejecución modernos de JavaScript resuelven el problema del bloque de un programa
mediante la incorporación de un event loop, es decir, un mecanismo que permite seguir ejecutnado el resto
del programa mientras las instrucciones que nevesitan una respuesta más lenta se quedan en el event loop 
hasta que puedan ser procesadas.
Por lo tanto, el entorno de ejecución resuelve el bloqueo y es un proceso transparente para el dessarrollador
que sólo tendrá que preocuparse de implementar correctamente la asincronía de sus tareas.
Estas instrucciones estarán relacionadas casi siempre con la petición de datos a un servidor externo
probablemente una API, que retrasará la ejecución de ese bloque del programa justo el tiempo en que 
la petición HTTP retorne la respuesta.*/
//La forma de gestionar estos procesos asíncronos en JavaScript se basa en tres funcionalidades:

//FUNCIONES CALLBACK
/*Se basan en la particularidad de JavaScript por la cual una función, que es considerada objeto de alto nivel
se puede pasar como argumento a otra función para que pueda ser invocada dentro del cuerpo de esta.*/
//Ejemplo:
const login = (name, printMessage) => {//Usamos la función callback printMessage() usada como parámetro
    printMessage(name);          //la invocamos en el cuerpo de la función con el parámetro name
}
login('Laura', (name) =>{        //Permite en las dos invocaciones de la función login(), pasar como argumento
    console.log('Hola ' + name); //del parámetro printMessage una función anónima que ejcute dentro de su 
})                               //cuerpo una tarea con parámetro name con el objetivo de poder escribir la tarea
login('Laura', (name) => {       //de la función callback printMessage en el momento que se ejecute la función que la recibe.
    console.log('Hello ' + name);
})
/*En el anterior ejemplo no usamos asincronía, puesto que todas las istrucciones se ejecutan secuencialmente; pero si
incorporamos un método setTimeout para retrasar la ejecución de un bloque, podremos comprobar que la función callback
evita bloquear el programa mientras transcurre el lapso de tiempo definido.*/
const wellcomeMessage = (user, printMessage) => {
    setTimeout(()=>{                                //Retrasamos la ejecución del bloque 2 segundos
        printMessage(user);                         //para simular el proceso asíncrono, la siguiente 
    }, 2000);                                       //instrucción definida en el console.log() se ejecutará
}
console.log('Bienvenid@ a nuestra web');        //antes que la callback.
login('Manuel', (user) => {
    console.log('Hola ' + user);
})
login('Manuel', (user) => {
    console.log('Hello ' + user);
})