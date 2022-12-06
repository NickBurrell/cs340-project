import getConnection from "../utils/db";

class ExpeditionModel {
    id: Number = 0;
    name: String = "";
    date: Date = new Date();
    constructor() {
    }

}

function validateExpedition(adv: ExpeditionModel) {
    return true;
}
// Begin CREATE Model **************************************************************************************************
// Create an expedition with the following data
let createExpedition: (name: string, date: Date) => Promise<Number>
    = async function (name: string, date: Date) {
    try {
        let conn = await getConnection();
        let res = await conn.query("INSERT INTO expeditions (name, date) VALUE (?,?)",
            [name,date]);
        await conn.commit();
        await conn.end();
        return res;
    } catch (err) {
        throw err;
    }
}

// End CREATE Model ****************************************************************************************************

// Begin RETRIEVE Models ***********************************************************************************************
// Retrieve all expeditions
let getAllExpeditions: () => Promise<[ExpeditionModel]> = async function() {
    try {
        let conn = await getConnection();
        let rows = await conn.query("SELECT * from expeditions");
        await conn.end();
        return rows.map(function(row: any, _: number) {
            
            return {
                id: row.id,
                name: row.name,
                date: new Date(row.date)
            }
        });
    } catch (err) {
        throw err;
    }
}

// Retrieve an expedition by id
let getExpeditionById: (id: number) => Promise<ExpeditionModel|null> = async function(id: number) {
    try {
        let conn = await getConnection();
        let rows = await conn.query("SELECT * FROM expeditions WHERE id = ?", id);
        await conn.end();
        if(rows.length == 1) {
           return {
                id: rows[0].id,
                name: rows[0].name,
                date: new Date(rows[0].date)
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
// Update an expedition by Id, returning the number of rows affected
let updateExpeditionById: (id: number, name: string, date: Date) => Promise<Number>
    = async function (id: number, name: string, date: Date) {
    try {
        let conn = await getConnection();
        let res = await conn.query("UPDATE expeditions SET name = ?, date = ? WHERE id = ?",[name, date, id]);
        await conn.commit();
        await conn.end();
        return res;
    } catch (err) {
        throw err;
    }
}
// End UPDATE Models ***************************************************************************************************

// Begin DELETE Models *************************************************************************************************

// Delete an expedition by id
let deleteExpeditionById: (id: number) => Promise<Number> = async function(id: number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("DELETE FROM expeditions WHERE id = ?", id);
        await conn.end();
        await conn.end
        return res;
    } catch(err) {
        throw err;
    }
}
// End DELETE Models ***************************************************************************************************

export {createExpedition, getAllExpeditions, getExpeditionById, updateExpeditionById, deleteExpeditionById}
export default ExpeditionModel;