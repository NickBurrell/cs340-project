import Modal from "react-bootstrap/Modal";
import ExpeditionRoster from "../../models/ExpeditionRoster";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

function DeleteExpeditionRosterModal(props: {expeditionRoster: ExpeditionRoster, isVisible: boolean, handleClose: () => void, onDelete: Function}) {

    let saveAndClose = () => {
        props.onDelete(props.expeditionRoster.id);
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Delete ExpeditionRoster "{props.expeditionRoster.id}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you would like to delete "{props.expeditionRoster.id}"</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"light"} onClick={props.handleClose}>
                        No
                    </Button>
                    <Button variant={"danger"} onClick={saveAndClose} type={"submit"}>
                        Delete {props.expeditionRoster.id}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteExpeditionRosterModal;