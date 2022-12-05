import React, {useState} from 'react';
import { TbTrash, TbEditCircle } from 'react-icons/tb';
import Adventurer from "../models/Adventurer";
import EditAdventurerModal from "./modals/EditAdventurerModal";
import DeleteAdventurerModal from "./modals/DeleteAdventurerModal";

function AdventurerEntry( props: {adventurer: Adventurer, onEdit: Function, onDelete: Function} ) {

    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
        <tr>
            <td>{props.adventurer.id.toString()}</td>
            <td>{props.adventurer.name}</td>
            <td>{props.adventurer.job}</td>
            <td>{props.adventurer.rank ?? "N/A"}</td>
            <td>{props.adventurer.dkp.toString()}</td>
            <td><TbTrash onClick={() => handleDeleteShow()} /></td>
            <td><TbEditCircle onClick={() => handleEditShow()} /></td>
            <EditAdventurerModal adventurer={props.adventurer} isVisible={showEdit} handleClose={handleEditClose} onEdit={props.onEdit}/>
            <DeleteAdventurerModal adventurer={props.adventurer} isVisible={showDelete} handleClose={handleDeleteClose} onDelete={props.onDelete}/>
        </tr>
    );
}

export default AdventurerEntry;
