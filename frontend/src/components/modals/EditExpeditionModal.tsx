import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import Expedition from "../../models/Expedition";
import truncDate from "../../util";

function EditExpeditionModal(props: {expedition: Expedition, isVisible: boolean, handleClose: () => void, onEdit: Function}) {

    const [name, setName] = useState<string>(props.expedition.name);
    const [date, setDate] = useState<Date>(props.expedition.date);

    let saveAndClose = () => {
        props.onEdit({id: props.expedition.id,name,date});
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Editing Expedition "{props.expedition.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type={"text"} value={name} onChange={e => setName(e.target.value)}/>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type={"date"} value={truncDate(date)} onChange={e => setDate(new Date(e.target.value))}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant={"primary"} onClick={saveAndClose} type={"submit"}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditExpeditionModal;