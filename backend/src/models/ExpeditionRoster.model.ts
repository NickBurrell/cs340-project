import getConnection from "../utils/db";

class ExpeditionRosterModel {
    id: Number = 0;
    expeditionId: Number = 0;
    adventurerId: Number = 0;
    constructor() {
    }

}


function validateExpeditionRoster(adv: ExpeditionRosterModel) {
    return true;
}
// Begin CREATE Model **************************************************************************************************
// Create an expeditionRoster with the following data
let createExpeditionRoster: (expeditionId: number, adventurerId: number) => Promise<Number>
    = async function (expeditionId: number, adventurerId: number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("INSERT INTO expeditionRosters (exp_id, adv_id) VALUE (?,?)",
            [expeditionId, adventurerId]);
        await conn.commit();
        await conn.end();
        return res;
    } catch (err) {
        throw err;
    }
}

// End CREATE Model ****************************************************************************************************

// Begin RETRIEVE Models ***********************************************************************************************
// Retrieve all expeditionRosters
let getAllExpeditionRosters: () => Promise<[ExpeditionRosterModel]> = async function() {
    try {
        let conn = await getConnection();
        let rows = await conn.query("SELECT * from expedition_roster");
        await conn.end();
        return rows.map(function(row: any, _: number) {
            console.log(row);
            return {
                id: row.id,
                expeditionId: row.exp_id,
                adventurerId: row.adv_id
            }
        });
    } catch (err) {
        throw err;
    }
}

// Retrieve an expeditionRoster by id
let getExpeditionRosterById: (id: number) => Promise<ExpeditionRosterModel|null> = async function(id: number) {
    try {
        let conn = await getConnection();
        let rows = await conn.query("SELECT * FROM expedition_rosters WHERE id = ?", id);
        await conn.end();
        if(rows.length == 1) {
            return {
                id: rows[0].id,
                expeditionId: rows[0].exp_id,
                adventurerId: rows[0].adv_id
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
// Update an expeditionRoster by Id, returning the number of rows affected
let updateExpeditionRosterById: (id: number, expeditionId: number, adventurerId: number) => Promise<Number>
    = async function (id: number, expeditionId: number, adventurerId: number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("UPDATE expedition_rosters SET exp_id = ?, adv_id = ? WHERE id = ?",
            [expeditionId, adventurerId, id]);
        await conn.commit();
        await conn.end();
        return res;
    } catch (err) {
        throw err;
    }
}
// End UPDATE Models ***************************************************************************************************

// Begin DELETE Models *************************************************************************************************

// Delete an expeditionRoster by id
let deleteExpeditionRosterById: (id: number) => Promise<Number> = async function(id: number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("DELETE FROM expedition_roster WHERE id = ?", id);
        await conn.end();
        await conn.end
        return res;
    } catch(err) {
        throw err;
    }
}
// End DELETE Models ***************************************************************************************************

export {createExpeditionRoster, getAllExpeditionRosters, getExpeditionRosterById, updateExpeditionRosterById, deleteExpeditionRosterById}
export default ExpeditionRosterModel;