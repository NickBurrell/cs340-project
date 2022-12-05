import Modal from "react-bootstrap/Modal";
import Adventurer from "../../models/Adventurer";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

function CreateAdventurerModal(props: {isVisible: boolean, handleClose: () => void, onCreate: Function}) {

    const [name, setName] = useState<string>("");
    const [job, setJob] = useState<string>("");
    const [rank, setRank] = useState<string>("");
    const [dkp, setDkp] = useState<number>(0);

    let saveAndClose = () => {
        props.onCreate({id:0,name,job,rank,dkp});
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Creating New Adventurer</Modal.Title>
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
                        Cancel
                    </Button>
                    <Button variant={"primary"} onClick={saveAndClose} type={"submit"}>
                        Add Adventurer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateAdventurerModal;