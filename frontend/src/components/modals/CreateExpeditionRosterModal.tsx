import Modal from "react-bootstrap/Modal";
import ExpeditionRoster from "../../models/ExpeditionRoster";
import {Button, Dropdown, DropdownButton, Form} from "react-bootstrap";
import {useState} from "react";
import Adventurer from "../../models/Adventurer";
import Expedition from "../../models/Expedition";

function CreateExpeditionRosterModal(props: {expeditions: [Expedition], adventurers: [Adventurer], isVisible: boolean, handleClose: () => void, onCreate: Function}) {

    const [expeditionId, setExpeditionId] = useState<number>(0);
    const [adventurerId, setAdventurerId] = useState<number>(0);

    const [expeditionDropdownTitle, setExpeditionDropdownTitle] = useState<string>("Please select an Expedition" );
    const [adventurerDropdownTitle, setAdventurerDropdownTitle] = useState<string>("Please select an Adventurer" );

    const expeditionOnSelect = (id: string | null, _: any) => {
        console.log(id);
        let exp = props.expeditions.find(e => e.id == parseInt(id!));
        setExpeditionId(exp!.id);
        setExpeditionDropdownTitle(exp!.name);
    }

    const adventurerOnSelect = (id: string | null, _: any) => {
        let exp = props.adventurers.find(e => e.id == parseInt(id!));
        setAdventurerId(exp!.id);
        setAdventurerDropdownTitle(exp!.name);
    }
    let saveAndClose = () => {
        props.onCreate({id:0, expeditionId, adventurerId});
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Creating New Expedition-Roster Association</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Expedition</Form.Label>
                            <DropdownButton variant={"light"} id={"acq-edit-exp-drop"} title={expeditionDropdownTitle}
                                            onSelect={expeditionOnSelect}>
                                {props.expeditions.map((exp, i) =>
                                    <Dropdown.Item eventKey={exp.id} key={i.toString()}>{exp.name}</Dropdown.Item>
                                )}
                            </DropdownButton>
                            <Form.Label>Adventurer</Form.Label>
                            <DropdownButton variant={"light"} id={"acq-edit-adv-drop"} title={adventurerDropdownTitle}
                                            onSelect={adventurerOnSelect}>
                                {props.adventurers.map((adv, i) =>
                                    <Dropdown.Item eventKey={adv.id} key={i.toString()}>{adv.name}</Dropdown.Item>
                                )}
                            </DropdownButton>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant={"primary"} onClick={saveAndClose} type={"submit"}>
                        Add Expedition Roster
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateExpeditionRosterModal;