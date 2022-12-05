import React, {useState} from 'react';
import { TbTrash, TbEditCircle } from 'react-icons/tb';
import Expedition from "../models/Expedition";
import EditExpeditionModal from "./modals/EditExpeditionModal";
import DeleteExpeditionModal from "./modals/DeleteExpeditionModal";
import truncDate from "../util";

function ExpeditionEntry( props: {expedition: Expedition, onEdit: Function, onDelete: Function} ) {

    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
        <tr>
            <td>{props.expedition.id.toString()}</td>
            <td>{props.expedition.name}</td>
            <td>{truncDate(props.expedition.date)}</td>
            <td><TbTrash onClick={() => handleDeleteShow()} /></td>
            <td><TbEditCircle onClick={() => handleEditShow()} /></td>
            <EditExpeditionModal expedition={props.expedition} isVisible={showEdit} handleClose={handleEditClose} onEdit={props.onEdit}/>
            <DeleteExpeditionModal expedition={props.expedition} isVisible={showDelete} handleClose={handleDeleteClose} onDelete={props.onDelete}/>
        </tr>
    );
}

export default ExpeditionEntry;
