import Modal from "react-bootstrap/Modal";
import Expedition from "../../models/Expedition";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

function DeleteExpeditionModal(props: {expedition: Expedition, isVisible: boolean, handleClose: () => void, onDelete: Function}) {

    let saveAndClose = () => {
        props.onDelete(props.expedition.id);
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Delete Expedition "{props.expedition.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you would like to delete "{props.expedition.name}"</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"light"} onClick={props.handleClose}>
                        No
                    </Button>
                    <Button variant={"danger"} onClick={saveAndClose} type={"submit"}>
                        Delete {props.expedition.name}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteExpeditionModal;