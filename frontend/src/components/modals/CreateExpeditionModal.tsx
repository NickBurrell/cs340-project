import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import truncDate from "../../util";

function CreateExpeditionModal(props: {isVisible: boolean, handleClose: () => void, onCreate: Function}) {

    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());

    let saveAndClose = () => {
        if (name === "NULL" || name === "N/A") {
            alert(`Name cannot be "NULL" or "N/A"`);
        } else {
            props.onCreate({id: 0, name, date});
            props.handleClose();
        }
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Creating New Expedition</Modal.Title>
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
                        Add Expedition
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateExpeditionModal;