import Modal from "react-bootstrap/Modal";
import Disbursement from "../../models/Disbursement";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

function DeleteDisbursementModal(props: {disbursement: Disbursement, isVisible: boolean, handleClose: () => void, onDelete: Function}) {

    let saveAndClose = () => {
        props.onDelete(props.disbursement.id);
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Delete Disbursement for "{props.disbursement.adventurerName}"?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you would like to delete disbursement for "{props.disbursement.adventurerName}"</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"light"} onClick={props.handleClose}>
                        No
                    </Button>
                    <Button variant={"danger"} onClick={saveAndClose} type={"submit"}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteDisbursementModal;