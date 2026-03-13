
import { getPokemonsFromDb } from '../Models/OperationsBd.js';
import {getPokemonWithId} from '../Models/OperationsBd.js';
import {getPokemonsListeDb} from '../Models/OperationsBd.js';
import {addPokemonDb, addUserDb} from '../Models/OperationsBd.js';


export const getPokemon = async (req, res) => {
    const id = req.params.id;

    if (id >=0)
    {
        try {
            const pokemon = await getPokemonWithId(id);
            res.status(200).json({pokemon});
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération"});
        }
    }
    else{
        res.status(500).json({error: "L'id est mauvais, id: " + id + ". L'id doit etre un chiffre positif"})
    }
};

export const getPokemons = async (req, res) => {
    try {
        const listePokemon = await getPokemonsFromDb();
            res.status(200).json({listePokemon});
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération" });
    }
};

export const getPokemonsListe = async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const type = req.query.type || null;
        try {
        const listePokemon = await getPokemonsListeDb(page, type);
            res.status(200).json({listePokemon});
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération" + page + ". " + type});
        console.log("DÉBUG ERREUR :", error);
    }
};
    
export const addPokemon = (req, res) => {
    // Logique pour créer une salutation
    const newData = req.body;
    if(newData.nom && newData.type_primaire &&newData.type_secondaire &&newData.attaque && newData.defense && newData.pv) {
    addPokemonDb(newData.nom, newData.type_primaire, newData.type_secondaire, newData.attaque, newData.defense, newData.pv);
    res.status(200).json(newData);
    }
    else{
        res.send("Erreur, le controlleur a pas valider");
        res.status(400).send({ error: "Données de salutation invalides" });
    }
};

export const createUser = (req, res) => {
    // Logique pour créer une salutation
    const newData = req.body;
    const uuid = crypto.randomUUID() 
    if(newData.nom && newData.email &&newData.mdp &&uuid) {
    addUserDb(newData.nom, newData.email, newData.mdp, uuid);
    res.status(200).json(newData);
    }
    else{
        res.send("Erreur, le controlleur a pas valider");
        res.status(400).send({ error: "Données de salutation invalides" });
    }
};