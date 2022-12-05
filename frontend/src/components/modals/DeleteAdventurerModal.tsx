import Modal from "react-bootstrap/Modal";
import Adventurer from "../../models/Adventurer";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

function DeleteAdventurerModal(props: {adventurer: Adventurer, isVisible: boolean, handleClose: () => void, onDelete: Function}) {

    let saveAndClose = () => {
        props.onDelete(props.adventurer.id);
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Delete Adventurer "{props.adventurer.name}"?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you would like to delete "{props.adventurer.name}"</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"light"} onClick={props.handleClose}>
                        No
                    </Button>
                    <Button variant={"danger"} onClick={saveAndClose} type={"submit"}>
                        Delete {props.adventurer.name}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteAdventurerModal;