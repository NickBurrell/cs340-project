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
        let res = await conn.query("INSERT INTO expedition_roster (exp_id, adv_id) VALUE (?,?)",
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
        let rows = await conn.query("SELECT expedition_roster.id, expedition_roster.exp_id, expedition_roster.adv_id, " +
            "expeditions.name AS exp_name, adventurers.name AS adv_name FROM expedition_roster " +
            "LEFT JOIN expeditions ON expedition_roster.exp_id = expeditions.id " +
            "LEFT JOIN adventurers ON expedition_roster.adv_id = adventurers.id " +
            "ORDER BY expedition_roster.id ASC");
        await conn.end();
        return rows.map(function(row: any, _: number) {
            return {
                id: row.id,
                expeditionId: row.exp_id,
                adventurerId: row.adv_id,
                expeditionName: row.exp_name,
                adventurerName: row.adv_name
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
        let rows = await conn.query("SELECT expedition_roster.id, expedition_roster.exp_id, expedition_roster.adv_id, " +
            "expeditions.name AS exp_name, adventurers.name AS adv_name FROM expedition_roster " +
            "LEFT JOIN expeditions ON expedition_roster.exp_id = expeditions.id " +
            "LEFT JOIN adventurers ON expedition_roster.adv_id = adventurers.id " +
            "WHERE expedition_roster.id = ?", id);
        await conn.end();
        if(rows.length == 1) {
            return {
                id: rows[0].id,
                expeditionId: rows[0].exp_id,
                adventurerId: rows[0].adv_id,
                expeditionName: rows[0].exp_name,
                adventurerName: rows[0].adv_name
            }
        } else {
            return null
        }

    } catch(err) {
        throw err;
    }
}


// Retrieve an expeditionRoster by id
let getExpeditionRosterByAdventurerName: (name: string) => Promise<[ExpeditionRosterModel]> = async function(name) {
    try {
        let conn = await getConnection();
        let rows = await conn.query(
            "SELECT expedition_roster.id, expedition_roster.exp_id, expedition_roster.adv_id, " +
            "expeditions.name AS exp_name, adventurers.name AS adv_name " +
            "FROM expedition_roster " +
            "INNER JOIN expeditions ON expedition_roster.exp_id = expeditions.id " +
            "INNER JOIN adventurers ON expedition_roster.adv_id = adventurers.id " +
            `WHERE UPPER(adventurers.name) LIKE UPPER('${name}%')`,);
        await conn.end();
        return rows.map(function(row: any, _: number) {
            return {
                id: row.id,
                expeditionId: row.exp_id,
                adventurerId: row.adv_id,
                expeditionName: row.exp_name,
                adventurerName: row.adv_name,
            }
        });

    } catch(err) {
        throw err;
    }
}

// Retrieve an expeditionRoster by id
let getExpeditionRosterByExpeditionName: (name: string) => Promise<[ExpeditionRosterModel]> = async function(name) {
    try {
        let conn = await getConnection();
        let rows = await conn.query(
            "SELECT expedition_roster.id, expedition_roster.exp_id, expedition_roster.adv_id, " +
            "expeditions.name AS exp_name, adventurers.name AS adv_name " +
            "FROM expedition_roster " +
            "INNER JOIN expeditions ON expedition_roster.exp_id = expeditions.id " +
            "INNER JOIN adventurers ON expedition_roster.adv_id = adventurers.id " +
            `WHERE UPPER(expeditions.name) LIKE UPPER('${name}%')`,);
        await conn.end();
        return rows.map(function(row: any, _: number) {
            return {
                id: row.id,
                expeditionId: row.exp_id,
                adventurerId: row.adv_id,
                expeditionName: row.exp_name,
                adventurerName: row.adv_name,
            }
        });

    } catch(err) {
        throw err;
    }
}

// Retrieve an expeditionRoster by id
let getExpeditionRosterByExpeditionAndAdventurer: (expName: string, advName: string) => Promise<[ExpeditionRosterModel]>
    = async function(expName, advName) {
    try {
        let conn = await getConnection();
        let rows = await conn.query(
            "SELECT expedition_roster.id, expedition_roster.exp_id, expedition_roster.adv_id, " +
            "expeditions.name AS exp_name, adventurers.name AS adv_name " +
            "FROM expedition_roster " +
            "INNER JOIN expeditions ON expedition_roster.exp_id = expeditions.id " +
            "INNER JOIN adventurers ON expedition_roster.adv_id = adventurers.id " +
            `WHERE UPPER(expeditions.name) LIKE UPPER('${expName}%')` +
            `AND UPPER(adventurers.name) LIKE UPPER('${advName}%')`);
        await conn.end();
        return rows.map(function(row: any, _: number) {
            return {
                id: row.id,
                expeditionId: row.exp_id,
                adventurerId: row.adv_id,
                expeditionName: row.exp_name,
                adventurerName: row.adv_name,
            }
        });

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
        let res = await conn.query("UPDATE expedition_roster SET exp_id = ?, adv_id = ? WHERE id = ?",
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

export {createExpeditionRoster, getAllExpeditionRosters, getExpeditionRosterById, updateExpeditionRosterById, deleteExpeditionRosterById, getExpeditionRosterByAdventurerName, getExpeditionRosterByExpeditionName, getExpeditionRosterByExpeditionAndAdventurer}
export default ExpeditionRosterModel;