
function setPokemonCard(identifier, pokemon){
    var image = document.getElementById(`pokemon_img${identifier}`)
    var name = document.getElementById(`pokemon_name${identifier}`).toLowerCase()
    var height = document.getElementById(`pokemon_height${identifier}`)
    var weight = document.getElementById(`pokemon_weight${identifier}`)
    var abilities = document.getElementById(`pokemon_abilities${identifier}`)
    image.setAttribute("src", pokemon.sprites.other.dream_world.front_default)
    name.innerText =  pokemon.name
    height.innerText =  pokemon.height
    weight.innerText =  pokemon.weight
    abilities.innerText =  pokemon.abilities.length
}

function consultarPokemon(identifier){      
    fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`)
    .then( function(response){
        response.json()
        .then(function (pokemon){
            setPokemonCard(identifier, pokemon)
        })
    })
}

function buscaPokemon(){
    var panel = document.getElementsByClassName("panel")[0]
    panel.innerHTML = ""
    var identifier = document.getElementById("pesquisa").value
    var card = document.createElement("div")
    card.className = "pokemon_card"
    card.innerHTML = criaCardPokemon(identifier)
    consultarPokemon(identifier)
    panel.appendChild(card)
}

document.getElementById("pesquisa").addEventListener("keyup", function(event){
    if (event.keyCode === 13) {
        buscaPokemon()
    }
}); 

document.getElementById("pesquisa").addEventListener("focusout", function(event){
    var panel = document.getElementsByClassName("panel")[0]
    panel.innerHTML = ""
    $id = gerarCards(1)
}); 


function criaCardPokemon(id){
    var card = `
        <div class="img_card">
            <img id="pokemon_img${id}" src="">
        </div>

        <p class="pokemon_id">ID: #${id}</p>
        <p class="pokemon_name" id="pokemon_name${id}"></p>

        <div class="pokemon_attributes">
            <div class="attribute">
                <p class="pokemon_height" id="pokemon_height${id}"></p>
                <p>height</p>
            </div>
            <div class="attribute">
                <p class="pokemon_weight" id="pokemon_weight${id}"></p>
                <p>weight</p>
            </div>
            <div class="attribute">
                <p class="pokemon_abilities" id="pokemon_abilities${id}"></p>
                <p>abilities</p>
            </div>
        </div>
    `
    return card
}


function gerarCards(id = 1){
    if(id < 650){
        var panel = document.getElementsByClassName("panel")[0]
        
        for(var i = id; i<id+30 && i<650; i++){
            var card = document.createElement("div")
            card.className = "pokemon_card"
            card.innerHTML = criaCardPokemon(i)
            consultarPokemon(i)
            panel.appendChild(card)
        }

        return i
    }
    return id
}

window.addEventListener("scroll", function(event) {
    var top = this.scrollY
    
    if((top > $scroll) && $id < 650){
        $scroll+=2000
        $id = gerarCards($id)
    }

}, false);


var $id = gerarCards($id)
var $scroll = 2000
