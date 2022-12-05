import Modal from "react-bootstrap/Modal";
import Acquisition from "../../models/Acquisition";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

function DeleteAcquisitionModal(props: {acquisition: Acquisition, isVisible: boolean, handleClose: () => void, onDelete: Function}) {

    let saveAndClose = () => {
        props.onDelete(props.acquisition.id);
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Delete Acquisition "{props.acquisition.name}"?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you would like to delete "{props.acquisition.name}"</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"light"} onClick={props.handleClose}>
                        No
                    </Button>
                    <Button variant={"danger"} onClick={saveAndClose} type={"submit"}>
                        Delete {props.acquisition.name}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteAcquisitionModal;