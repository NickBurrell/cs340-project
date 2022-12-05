import Modal from "react-bootstrap/Modal";
import Adventurer from "../../models/Adventurer";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

function EditAdventurerModal(props: {adventurer: Adventurer, isVisible: boolean, handleClose: () => void, onEdit: Function}) {

    const [name, setName] = useState<string>(props.adventurer.name);
    const [job, setJob] = useState<string>(props.adventurer.job);
    const [rank, setRank] = useState<string>(props.adventurer.rank??"");
    const [dkp, setDkp] = useState<number>(props.adventurer.dkp);

    let saveAndClose = () => {
        props.onEdit({id: props.adventurer.id,name,job,rank,dkp});
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit Adventurer "{props.adventurer.name}"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type={"text"} value={name} onChange={e => setName(e.target.value)}/>
                            <Form.Label>Job</Form.Label>
                            <Form.Control type={"text"} value={job} onChange={e => setJob(e.target.value)}/>
                            <Form.Label>Rank</Form.Label>
                            <Form.Control type={"text"} value={rank} onChange={e => setRank(e.target.value)}/>
                            <Form.Label>DKP</Form.Label>
                            <Form.Control type={"number"} value={dkp.toString()} onChange={e => setDkp(parseInt(e.target.value))}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant={"primary"} onClick={saveAndClose} type={"submit"}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditAdventurerModal;