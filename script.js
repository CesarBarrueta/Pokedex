const pokeDatos = document.querySelector('[datos-pokemon]');
const pokeName = document.querySelector('[datos-pokemon-nombre]');
const pokeImg = document.querySelector('[datos-pokemon-pokefoto]');
const pokeId = document.querySelector('[datos-pokemon-id]');
const pokeType = document.querySelector('[datos-pokemon-tipo]');
const pokeStats = document.querySelector('[datos-pokemon-estadisticas]');

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
    dragon: '#FF3B3B',
    steel: '#797979',
    fighting: '#FFA780',
    dark: '#373737',
    fairy: '#FF84F4',
    default: '#FFFFFF',
};

document.body.onload = function() {
    recargarPokemon();
  }

function buscarPokemon(){
    
    const value = numRandom();
    console.log("https://pokeapi.co/api/v2/pokemon/"+value+"/")
    fetch('https://pokeapi.co/api/v2/pokemon/'+value+'/')
        .then(data => data.json())
        .then(response => analizarPokeDatos(response))
}

function recargarPokemon(){
    setInterval('buscarPokemon()', 30000);

}

const analizarPokeDatos = data =>{
    const img = data.sprites.front_default;
    const {stats, types} = data;
    console.log(data);

pokeName.textContent = data.name;
pokeImg.setAttribute('src', img);
pokeId.textContent = "No. "+data.id;
setColorFondo(types);
analizarPokeTipos(types);
analizarPokeEstadisticas(stats);
}

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

function analizarPokeTipos(types){
    pokeType.innerHTML = '';
    types.forEach(type => {
        const tipo = document.createElement("div");
        tipo.style.backgroundColor = typeColors[type.type.name];
        tipo.textContent = type.type.name;
        pokeType.appendChild(tipo);
    });
}

function setColorFondo(types){
    const color1 = typeColors[types[0].type.name];
    const color2 = typeColors.default;
    try{
    const color2 = typeColors[types[1].type.name];
    }catch(e){
        console.log("Error de color")
    }

    pokeImg.style.background = "radial-gradient("+color2+","+color1+")";

    //Pendiente utilizar de mejor manera el  color 2

    pokeImg.style.border = "3px solid "+color2+"!important;";
    pokeImg.style.backgroundSize = "5 px 5 px";
}

function numRandom(){
    return Math.floor(Math.random() * (807 - 1) + 1);
}