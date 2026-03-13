import pool from '../Config/db_pg.js';

const getPokemonWithId = async (id) => {

    const requete = `SELECT nom, type_primaire, type_secondaire, pv, attaque, defense
     FROM pokemon
      WHERE id = ?`;
    const params = [id]

    try {
        const [resultats] = await pool.query(requete, params);
        return resultats[0] ?? null;
    } catch (erreur) {
        console.log(`Erreur, code: ${erreur.code} sqlState ${erreur.sqlState} : 
                    ${erreur.sqlMessage}`);
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
        requete += ` WHERE type_primaire = ? OR type_secondaire = ?`;
        params.push(type, type); 
    }

    requete += ` LIMIT ? OFFSET ?`;
    params.push(Number(elementsParPage), Number(offset));

    try {
        const [resultats] = await pool.query(requete, params);

        return resultats; 
    } catch (erreur) {
        console.error(`Erreur SQL [getPokemonsListeDb]: ${erreur.sqlMessage}`);
        console.log("DÉBUG ERREUR :", erreur);
        throw erreur;
    }
};

function addPokemonDb(nom, type_primaire, type_secondaire, attaque, defense, pv) {
    const requete = `INSERT INTO pokemon (nom, type_primaire, type_secondaire, attaque, defense, pv) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [nom, type_primaire, type_secondaire, attaque, defense, pv];
    pool.query(requete, params);
}

function addUserDb(nom, email, mdp, uuid) {
    const requete = `INSERT INTO users (nom, email, mot_de_passe, uuid) VALUES (?, ?, ?, ?)`;
    const params = [nom, email, mdp, uuid];
    pool.query(requete, params);
}

const getPokemonsFromDb = async () => {
    const requete = `SELECT nom FROM public.pokemon`;
    try {
        var liste = [];
        const resultats = await pool.query(requete);
        resultats.forEach(resultat => {
            liste.push({
                nom: resultat.nom
            });
        });
        console.log("Liste des salutations récupérées de la BD : OK");
        
        return liste;
    } 
    catch (erreur) {
        console.log(`Erreur, code: ${erreur.code} sqlState ${erreur.sqlState} : 
                    ${erreur.sqlMessage}`);
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