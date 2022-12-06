import React, {useState} from 'react';
import { TbTrash, TbEditCircle } from 'react-icons/tb';
import Acquisition from "../models/Acquisition";
import EditAcquisitionModal from "./modals/EditAcquisitionModal";
import DeleteAcquisitionModal from "./modals/DeleteAcquisitionModal";
import Expedition from "../models/Expedition";
import Adventurer from "../models/Adventurer";
import truncDate from "../util";
import acquisition from "../models/Acquisition";

function AcquisitionEntry( props: {acquisition: Acquisition, expeditions: [Expedition], adventurers: [Adventurer], onEdit: Function, onDelete: Function} ) {

    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
        <tr>
            <td>{props.acquisition.id.toString()}</td>
            <td>{props.acquisition.expeditionName??"N/A"}</td>
            <td>{props.acquisition.adventurerName??"N/A"}</td>
            <td>{props.acquisition.name}</td>
            <td>{truncDate((props.acquisition.date??new Date()))}</td>
            <td>{props.acquisition.sold ? 'Yes' : 'No'}</td>
            <td>{props.acquisition.price??"Not Listed"}</td>

            <td><TbTrash onClick={() => handleDeleteShow()} /></td>
            <td><TbEditCircle onClick={() => handleEditShow()} /></td>
            <EditAcquisitionModal acquisition={props.acquisition} expeditions={props.expeditions} adventurers={props.adventurers} isVisible={showEdit} handleClose={handleEditClose} onEdit={props.onEdit}/>
            <DeleteAcquisitionModal acquisition={props.acquisition} isVisible={showDelete} handleClose={handleDeleteClose} onDelete={props.onDelete}/>
        </tr>
    );
}

export default AcquisitionEntry;
