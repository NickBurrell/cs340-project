import getConnection from "../utils/db";

class DisbursementModel {
    id: Number = 0;
    rosterId: Number = 0;
    date: Date = new Date();
    quantity: Number = 0;
    constructor() {
    }

}


function validateDisbursement(adv: DisbursementModel) {
    return true;
}
// Begin CREATE Model **************************************************************************************************
// Create an disbursement with the following data
let createDisbursement: (rosterId: number, date: Date, quantity: Number) => Promise<Number>
    = async function (rosterId: number, date: Date, quantity: Number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("INSERT INTO disbursements (roster_id, date, quantity) VALUE (?,?,?)",
            [rosterId, date, quantity]);
        await conn.commit();
        await conn.end();
        return res;
    } catch (err) {
        throw err;
    }
}

// End CREATE Model ****************************************************************************************************

// Begin RETRIEVE Models ***********************************************************************************************
// Retrieve all disbursements
let getAllDisbursements: () => Promise<[DisbursementModel]> = async function() {
    try {
        let conn = await getConnection();
        let rows = await conn.query("SELECT * from disbursements");
        await conn.end();
        return rows.map(function(row: any, _: number) {
            console.log(row);
            return {
                id: row.id,
                rosterId: row.roster_id,
                date: row.date,
                quantity: row.quantity
            }
        });
    } catch (err) {
        throw err;
    }
}

// Retrieve an disbursement by id
let getDisbursementById: (id: number) => Promise<DisbursementModel> = async function(id: number) {
    try {
        let conn = await getConnection();
        let rows = await conn.query("SELECT * FROM disbursements WHERE id = ?", id);
        await conn.end();
        if(rows.length == 1) {
            return rows[0];
        } else {
            // TODO
        }

    } catch(err) {
        throw err;
    }
}

// END RETRIEVE Models *************************************************************************************************

// Begin UPDATE Models *************************************************************************************************
// Update an disbursement by Id, returning the number of rows affected
let updateDisbursementById: (id: number, rosterId: number, date: Date, quantity: Number) => Promise<Number>
    = async function (id: number, rosterId: number, date: Date, quantity: Number)  {
    try {
        let conn = await getConnection();
        let res = await conn.query("UPDATE disbursements SET roster_id = ?, date = ?, quantity = ? WHERE id = ?",
            [rosterId, date, quantity, id]);
        await conn.commit();
        await conn.end();
        return res;
    } catch (err) {
        throw err;
    }
}
// End UPDATE Models ***************************************************************************************************

// Begin DELETE Models *************************************************************************************************

// Delete an disbursement by id
let deleteDisbursementById: (id: number) => Promise<Number> = async function(id: number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("DELETE FROM disbursements WHERE id = ?", id);
        await conn.end();
        await conn.end
        return res;
    } catch(err) {
        throw err;
    }
}
// End DELETE Models ***************************************************************************************************

export {createDisbursement, getAllDisbursements, getDisbursementById, updateDisbursementById, deleteDisbursementById}

export default DisbursementModel;