import React, {useState} from 'react';
import { TbTrash, TbEditCircle } from 'react-icons/tb';
import ExpeditionRoster from "../models/ExpeditionRoster";
import EditExpeditionRosterModal from "./modals/EditExpeditionRosterModal";
import DeleteExpeditionRosterModal from "./modals/DeleteExpeditionRosterModal";
import Expedition from "../models/Expedition";
import Adventurer from "../models/Adventurer";

function ExpeditionRosterEntry( props: {expeditionRoster: ExpeditionRoster, expeditions: [Expedition], adventurers: [Adventurer],
    onEdit: Function, onDelete: Function} ) {

    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);

    const handleEditClose = () => setShowEdit(false);
    const handleEditShow = () => setShowEdit(true);

    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    return (
        <tr>
            <td>{props.expeditionRoster.id.toString()}</td>
            <td>{props.expeditionRoster.expeditionId.toString()}</td>
            <td>{props.expeditionRoster.adventurerId.toString()}</td>
            <td><TbTrash onClick={() => handleDeleteShow()} /></td>
            <td><TbEditCircle onClick={() => handleEditShow()} /></td>
            <EditExpeditionRosterModal expeditionRoster={props.expeditionRoster} expeditions={props.expeditions} adventurers={props.adventurers}
                                       isVisible={showEdit} handleClose={handleEditClose} onEdit={props.onEdit}/>
            <DeleteExpeditionRosterModal expeditionRoster={props.expeditionRoster} isVisible={showDelete} handleClose={handleDeleteClose} onDelete={props.onDelete}/>
        </tr>
    );
}

export default ExpeditionRosterEntry;
