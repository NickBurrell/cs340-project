import getConnection from "../utils/db";

class AdventurerModel {
    id: Number = 0;
    name: String = "";
    job: String = "";
    rank: String = "";
    dkp: Number = 0;
    constructor() {
    }
}

function validateAdventurer(adv: AdventurerModel) {
    return true;
}
// Begin CREATE Model **************************************************************************************************
// Create an adventurer with the following data
let createAdventurer: (name: String, job: String, rank: String, dkp: Number) => Promise<Number>
    = async function (name: String, job: String, rank: String, dkp: Number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("INSERT INTO adventurers (name, job, guild_rank, dkp) VALUE (?,?,?,?)",
            [name,job,rank,dkp]);
        await conn.commit();
        await conn.end();
        return res;
    } catch (err) {
        throw err;
    }
}

// End CREATE Model ****************************************************************************************************

// Begin RETRIEVE Models ***********************************************************************************************
// Retrieve all adventurers
let getAllAdventurers: () => Promise<[AdventurerModel]> = async function() {
    try {
        let conn = await getConnection();
        let rows = await conn.query("SELECT * from adventurers");
        await conn.end();
        return rows.map(function(row: any, _: number) {
            console.log(row);
            return {
                id: row.id,
                name: row.name,
                job: row.job,
                rank: row.guild_rank,
                dkp: row.dkp
            }
        });
    } catch (err) {
        throw err;
    }
}

// Retrieve an adventurer by id
let getAdventurerById: (id: number) => Promise<AdventurerModel|null> = async function(id: number) {
   try {
       let conn = await getConnection();
       let rows = await conn.query("SELECT * FROM adventurers WHERE id = ?", id);
       await conn.end();
       if(rows.length == 1) {
           return {
               id: rows[0].id,
               name: rows[0].name,
               job: rows[0].job,
               rank: rows[0].guild_rank,
               dkp: rows[0].dkp
           }
       } else {
           return null
       }

   } catch(err) {
       throw err;
   }
}

// END RETRIEVE Models *************************************************************************************************

// Begin UPDATE Models *************************************************************************************************
// Update an adventurer by Id, returning the number of rows affected
let updateAdventurerById: (id: Number, name: String, job: String, rank: String, dkp: Number) => Promise<Number>
    = async function (id: Number, name: String, job: String, rank: String, dkp: Number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("UPDATE adventurers SET name = ?, job = ?, guild_rank = ?, dkp = ? WHERE id = ?",
            [name, job, rank, dkp, id]);
        await conn.commit();
        await conn.end();
        return res;
    } catch (err) {
        throw err;
    }
}
// End UPDATE Models ***************************************************************************************************

// Begin DELETE Models *************************************************************************************************

// Delete an adventurer by id
let deleteAdventurerById: (id: number) => Promise<Number> = async function(id: number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("DELETE FROM adventurers WHERE id = ?", id);
        await conn.commit();
        await conn.end();
        return res;
    } catch(err) {
        throw err;
    }
}
// End DELETE Models ***************************************************************************************************

export {createAdventurer, getAllAdventurers, getAdventurerById, updateAdventurerById, deleteAdventurerById}
export default AdventurerModel;