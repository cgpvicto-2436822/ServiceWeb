import pool from '../Config/db_pg.js';

const getPokemonWithId = async (id) => {
    const requete = `SELECT nom, type_primaire, type_secondaire, pv, attaque, defense
     FROM pokemon
      WHERE id = $1`;
    const params = [id];

    try {
        const resultats = await pool.query(requete, params);
        return resultats.rows[0] ?? null;
    } catch (erreur) {
        console.error(`Erreur PostgreSQL : ${erreur.message}`);
        throw erreur;
    }
};

const getPokemonsListeDb = async (page = 1, type = null) => {
    const elementsParPage = 25;
    const pageActuelle = Math.max(1, parseInt(page));
    const offset = (pageActuelle - 1) * elementsParPage;
    
    let requete = `SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon`;
    let params = [];

    if (type) {
        requete += ` WHERE type_primaire = $1 OR type_secondaire = $2`;
        params.push(type, type); 
    }

    requete += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(Number(elementsParPage), Number(offset));

    try {
        const resultats = await pool.query(requete, params);
        return resultats.rows; 
    } catch (erreur) {
        console.error(`Erreur SQL [getPokemonsListeDb]: ${erreur.message}`);
        throw erreur;
    }
};

async function addPokemonDb(nom, type_primaire, type_secondaire, attaque, defense, pv) {
    const requete = `INSERT INTO pokemon (nom, type_primaire, type_secondaire, attaque, defense, pv) VALUES ($1, $2, $3, $4, $5, $6)`;
    const params = [nom, type_primaire, type_secondaire, attaque, defense, pv];
    await pool.query(requete, params);
}

async function addUserDb(nom, email, mdp, uuid) {
    const requete = `INSERT INTO users (nom, email, mot_de_passe, uuid) VALUES ($1, $2, $3, $4)`;
    const params = [nom, email, mdp, uuid];
    await pool.query(requete, params);
}

const getPokemonsFromDb = async () => {
    const requete = `SELECT nom FROM public.pokemon`;
    try {
        const resultats = await pool.query(requete);
        // Utilisation de .map pour plus de clarté
        const liste = resultats.rows.map(row => ({
            nom: row.nom
        }));
        
        console.log("Liste des pokémons récupérés de la BD : OK");
        return liste;
    } 
    catch (erreur) {
        console.error(`Erreur PostgreSQL : ${erreur.message}`);
        throw erreur;
    }
};

export {
    addPokemonDb,
    getPokemonsFromDb,
    getPokemonWithId,
    getPokemonsListeDb,
    addUserDb
};