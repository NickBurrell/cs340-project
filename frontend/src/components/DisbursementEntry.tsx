import React, {useState} from 'react';
import { TbTrash, TbEditCircle } from 'react-icons/tb';
import Disbursement from "../models/Disbursement";
import EditDisbursementModal from "./modals/EditDisbursementModal";
import DeleteDisbursementModal from "./modals/DeleteDisbursementModal";
import Adventurer from "../models/Adventurer";
import truncDate from "../util";

function DisbursementEntry( props: {disbursement: Disbursement, adventurers: [Adventurer], onEdit: Function, onDelete: Function} ) {

    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
        <tr>
            <td>{props.disbursement.id.toString()}</td>
            <td>{props.disbursement.rosterId.toString()}</td>
            <td>{truncDate(props.disbursement.date)}</td>
            <td>{props.disbursement.quantity.toString()}</td>
            <td><TbTrash onClick={() => handleDeleteShow()} /></td>
            <td><TbEditCircle onClick={() => handleEditShow()} /></td>
            <EditDisbursementModal disbursement={props.disbursement} adventurers={props.adventurers} isVisible={showEdit} handleClose={handleEditClose} onEdit={props.onEdit}/>
            <DeleteDisbursementModal disbursement={props.disbursement} isVisible={showDelete} handleClose={handleDeleteClose} onDelete={props.onDelete}/>
        </tr>
    );
}

export default DisbursementEntry;
