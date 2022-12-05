import getConnection from "../utils/db";

class AcquisitionModel {
    id: Number = 0;
    expeditionId: Number | null = null;
    adventurerId: Number | null = null;
    name: string = "";
    date: Date = new Date();
    sold: Boolean = false;
    price: Number | null = null;
    constructor() {
    }
}

function validateAcquisition(adv: AcquisitionModel) {
    return true;
}
// Begin CREATE Model **************************************************************************************************
// Create an acquisition with the following data
let createAcquisition: (expeditionId: number|null, adventurerId: number|null, name: string, date: Date, sold: boolean, price: number) => Promise<Number>
    = async function  (expeditionId: number|null, adventurerId: number|null, name: string, date: Date, sold: boolean, price: number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("INSERT INTO acquisitions (exp_id, adv_id, name, date, sold, price) VALUE (?,?,?,?,?,?)",
            [expeditionId, adventurerId, name, date, sold, price]);
        await conn.commit();
        await conn.end();
        return res;
    } catch (err) {
        throw err;
    }
}

// End CREATE Model ****************************************************************************************************

// Begin RETRIEVE Models ***********************************************************************************************
// Retrieve all acquisitions
let getAllAcquisitions: () => Promise<[AcquisitionModel]> = async function() {
    try {
        let conn = await getConnection();
        let rows = await conn.query("SELECT * from acquisitions");
        await conn.end();
        return rows.map(function(row: any, _: number) {
            console.log(row);
            return {
                id: row.id,
                expeditionId: row.exp_id,
                adventurerId: row.adv_id,
                name: row.name,
                date: new Date(row.date),
                sold: row.sold,
                price: row.price
            }
        });
    } catch (err) {
        throw err;
    }
}

// Retrieve an acquisition by id
let getAcquisitionById: (id: number) => Promise<AcquisitionModel|null> = async function(id: number) {
    try {
        let conn = await getConnection();
        let rows = await conn.query("SELECT * FROM acquisitions WHERE id = ?", id);
        await conn.end();
        if(rows.length == 1) {
            return {
                id: rows[0].id,
                expeditionId: rows[0].exp_id,
                adventurerId: rows[0].adv_id,
                name: rows[0].name,
                date: new Date(rows[0].date),
                sold: rows[0].sold,
                price: rows[0].price
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
// Update an acquisition by Id, returning the number of rows affected
let updateAcquisitionById: (id: number, expeditionId: number|null, adventurerId: number|null, name: string, date: Date, sold: boolean, price: number) => Promise<Number>
    = async function  (id: number, expeditionId: number|null, adventurerId: number|null, name: string, date: Date, sold: boolean, price: number)
{
    try {
        let conn = await getConnection();
        let res = await conn.query("UPDATE acquisitions SET exp_id = ?, adv_id = ?, name = ?, date = ?, sold = ?, price = ? WHERE id = ?",
            [expeditionId, adventurerId, name, date, sold, price, id]);
        await conn.commit();
        await conn.end();
        return res;
    } catch (err) {
        throw err;
    }
}
// End UPDATE Models ***************************************************************************************************

// Begin DELETE Models *************************************************************************************************

// Delete an acquisition by id
let deleteAcquisitionById: (id: number) => Promise<Number> = async function(id: number) {
    try {
        let conn = await getConnection();
        let res = await conn.query("DELETE FROM acquisitions WHERE id = ?", id);
        await conn.end();
        await conn.end
        return res;
    } catch(err) {
        throw err;
    }
}
// End DELETE Models ***************************************************************************************************

export {createAcquisition, getAllAcquisitions, getAcquisitionById, updateAcquisitionById, deleteAcquisitionById}

export default AcquisitionModel;