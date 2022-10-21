/*
Se crean variables para obtener los objetos del DOM y ser capaces de modificarlos de manera
rapida posteriormente.
*/
const pokeDatos = document.querySelector('[datos-pokemon]');
const pokeName = document.querySelector('[datos-pokemon-nombre]');
const pokeImg = document.querySelector('[datos-pokemon-pokefoto]');
const pokeId = document.querySelector('[datos-pokemon-id]');
const pokeType = document.querySelector('[datos-pokemon-tipo]');
const pokeStats = document.querySelector('[datos-pokemon-estadisticas]');

/*
Se asignan colores específicos para los tipos de pokemones de la API para poder
representarlos de mejor manera en la pokedex.
*/

const typeColors = {
    electric: '#FFE533',
    normal: '#C8C8C8',
    fire: '#CD1414',
    water: '#1F6CF3',
    ice: '#1FD2F3',
    rock: '#ABABAB',
    flying: '#B4FFFA',
    grass: '#64FF3F',
    psychic: '#D1C200',
    ghost: '#C800D1',
    bug: '#5EE644',
    poison: '#7144E6',
    ground: '#B37B7B',
    dragon: '#FF762D',
    steel: '#797979',
    fighting: '#FFA780',
    dark: '#373737',
    fairy: '#FF84F4',
    default: '#FFFFFF',
};

/*
Se utiliza el evento onload para ejecutar recargarPokemon() al terminar de cargar la página.
*/

document.body.onload = function() {
    recargarPokemon();
  }

 /*
 recargarPokemon()
    • Ejecuta la función buscarPokemon() cada 30 segundos.
    • Se busca un pokemón sin necesidad de presionar el botón.
 */ 

  function recargarPokemon(){
    setInterval('buscarPokemon()', 30000);

}

/*
    buscarPokemon()
    • Utiliza un número random y consulta un pokemon de la API según el número obtenido.
    • Retorna una promesa de un archivo JSON con los datos del pokemon. 
*/  

function buscarPokemon(){
    const value = numRandom();
    fetch('https://pokeapi.co/api/v2/pokemon/'+value+'/')
        .then(data => data.json())
        .then(response => analizarPokeDatos(response))
}

/*
    analizarPokeDatos
    • Recibe el JSON con los datos del pokemon 
    • Obtiene las partes que se requieren para la pokedex (imagen, estadísticas, tipos)
*/

const analizarPokeDatos = data =>{
    const img = data.sprites.front_default; //Se obtiene la imagen del pokemon
    const {stats, types} = data; //Se obtienen los arrays de estadisticas y de tipos
    //console.log(data);
    //Creación de la tarjeta del pokemon
    pokeName.textContent = data.name; //Nombre
    pokeImg.setAttribute('src', img); //Imagen
    pokeId.textContent = "No. "+data.id; //Número de Pokemon
    setColorFondo(types); //Fondo de la imagen del pokemon
    analizarPokeTipos(types); //Tarjetas de tipos
    analizarPokeEstadisticas(stats); //Estadisticas
}

/*
    AnalizarPokeEstadisticas()
    • Recibe el array de estadísticas
    • Analiza cada elemento del array y lo separa en los datos que se requieren
    • Agrega los elementos al DOM
*/

function analizarPokeEstadisticas(stats){
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statNombre = document.createElement("div");
        const statNum = document.createElement("div");
        statNombre.textContent = stat.stat.name;
        statNum.textContent = stat.base_stat;
        statElement.appendChild(statNombre);
        statElement.appendChild(statNum);
        pokeStats.appendChild(statElement);
    });
}

/*
    AnalizarPokeTipos()
    • Recibe el array de tipos
    • Analiza los campos de los arreglos
    • Le asigna un color de fondo a la tarjeta que se mostrará con color dependiendo del tipo
    • Crea una o dos tarjetas (según el pokemon)
*/

function analizarPokeTipos(types){
    pokeType.innerHTML = '';
    types.forEach(type => {
        const tipo = document.createElement("div");
        tipo.style.backgroundColor = typeColors[type.type.name];
        tipo.textContent = type.type.name;
        pokeType.appendChild(tipo);
    });
}

/*
    setColorFondo()
    • Recibe el arreglo de tipos
    • Le agrega un color de fondo a la imagen de la tarjeta
    • Según el pokemon se agregan 1 o 2 colores al fondo
*/

function setColorFondo(types){
    const color1 = typeColors[types[0].type.name];
    const color2 = typeColors.default;
    try{
    const color2 = typeColors[types[1].type.name];
    }catch(e){

    }
    pokeImg.style.background = "radial-gradient("+color2+","+color1+")";
    pokeImg.style.backgroundSize = "5 px 5 px";
}

/*
    numRandom()
    • Retorna un número al azar 
*/

function numRandom(){
    return Math.floor(Math.random() * (807 - 1) + 1);
}