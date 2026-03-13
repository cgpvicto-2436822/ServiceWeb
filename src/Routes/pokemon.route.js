
import express from 'express';

import { getPokemon } from '../Controlleurs/pokemon.controller.js';
import { getPokemons } from '../Controlleurs/pokemon.controller.js';
import { getPokemonsListe } from '../Controlleurs/pokemon.controller.js';
import { addPokemon, createUser } from '../Controlleurs/pokemon.controller.js';

const router = express.Router();    

router.get('/', (req, res) => {
    res.send("<h1>Route special de l'API des pokemon !</h1>");
});

router.get('/pokemon/add', addPokemon);

router.get("/users", createUser);

router.get('/pokemons', getPokemons);

router.get('/pokemons/liste', getPokemonsListe);

router.get('/pokemons/:id', getPokemon);

router.get('/pokemons/hasard', async (req, res) => {
    try {
        const liste = await getPokemonFromDb(); 
        if (liste.length === 0) return res.status(404).send("Aucune salutation");
        
        const randomMsg = liste[Math.floor(Math.random() * liste.length)].message;
        res.json(randomMsg);
    } catch (erreur) {
        res.status(500).send("Erreur");
    }
});

export default router;