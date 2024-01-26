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
//Ahora, como rerasamos 2 segundos la ejecución de la instrucción de la función callback para simular un proceso asíncrono, 
//la siguiente instrucción definida en el console.log se ejecuará antes que la callback.



//PROMESAS.
/*Las funciones callback son una forma sencilla y muy utilizada para el manejo de asincronía en JavaScript,
pero presentan un problema cuando se tiene que realizar una sucesión de tareas que se ejecutan en el orden de las respuestas
asíncronas de peticiones, ya que, en estos casos, se tienen que ir anidando las funciones callback unas dentro de otras.*/
/*Para estos casos, el anidado de funciones supone una complejidad excesiva; constituye lo que se denomina callback hell
y crea un bloque difícil de mantener y evolucionar. Para evitar esto, ECMAScript2015 incorpora una nueva manera de manejar
la asincronía: las promesas.*/
//Una promesa es un objeto instanciado de la calse global Promise que dispone de una serie de métodos para gestionar los valores 
//que recibirá en un futuro,es decir, cuando se reciba el valor de una respuesta en una tarea asíncrona.
let pilots = ['Alex Crivillé', 'Valentino rossi', 'Marc Márquez', 'Max Viaggi']; //Array fuente de datos.
const getPilot = (position, seconds) => { //La funcion getPilot
    return new Promise((resolve, reject) => { //objeto instanciado Promise
        if (position < 1 || position >= pilots.length+1){ // condicional que no permite posiciones inexistentes
            reject({mensaje:'Posición no válida.'}) //Método que detecta irregularidades y arroja mensaje de error
        }
        setTimeout(() =>{//establece un delay en la ejecución 
            resolve({pilot: pilots[position-1]}) //Método que resuelve el callback si es correcto
        },seconds * 1000) // establecemos el parametro delay en milisegundos recibiendo la entrada y multiplicandolo por 1000
    })
}
/*La primera parte del uso de promesas está lista, pero necesitamos llamar a la función que devuelve una promesa para completar su uso.*/
getPilot(4, 3)
    .then(data => {
        console.log(data);
        return data.pilot;
    })
    .then(data => {
        console.log('Hola ' + data);
    })
    .catch(error => console.error(error));