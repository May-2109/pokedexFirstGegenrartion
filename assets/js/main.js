const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecord = 151
const limit = 10
let offset = 0


function loadPokeonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtlm = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}"">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')

        pokemonList.innerHTML += newHtlm
    })
}

loadPokeonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNexPage = offset + limit

    if (qtdRecordNexPage >= maxRecord) {
        const newlimite = maxRecord - offset
        loadPokeonItens(offset, newlimite)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokeonItens(offset, limit)
    }
})

