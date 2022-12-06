import Modal from "react-bootstrap/Modal";
import ExpeditionRoster from "../../models/ExpeditionRoster";
import {Button, Dropdown, DropdownButton, Form} from "react-bootstrap";
import {useState} from "react";
import Adventurer from "../../models/Adventurer";
import Expedition from "../../models/Expedition";

function EditExpeditionRosterModal(props: {expeditionRoster: ExpeditionRoster, expeditions: [Expedition], adventurers: [Adventurer],
    isVisible: boolean, handleClose: () => void, onEdit: Function}) {

    const [expeditionId, setExpeditionId] = useState<number>(props.expeditionRoster.expeditionId);
    const [adventurerId, setAdventurerId] = useState<number>(props.expeditionRoster.adventurerId);

    const [expeditionDropdownTitle, setExpeditionDropdownTitle] = useState<string>(props.expeditions
        .find(e => e.id == props.expeditionRoster.expeditionId)?.name ?? "Please select an Expedition" );
    const [adventurerDropdownTitle, setAdventurerDropdownTitle] = useState<string>(props.adventurers
        .find(e => e.id == props.expeditionRoster.adventurerId)?.name ?? "Please select an Adventurer" );

    const expeditionOnSelect = (id: string | null, _: any) => {
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
        props.onEdit({id:props.expeditionRoster.id, expeditionId, adventurerId});
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Editing Expedition-Roster Association</Modal.Title>
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
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditExpeditionRosterModal;