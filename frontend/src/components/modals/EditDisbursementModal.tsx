import Modal from "react-bootstrap/Modal";
import Adventurer from "../../models/Adventurer";
import {Button, Dropdown, DropdownButton, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import Disbursement from "../../models/Disbursement";
import disbursement from "../../models/Disbursement";
import truncDate from "../../util";
import Expedition from "../../models/Expedition";
import BACKEND_ENDPOINT from "../../constants";
import ExpeditionRoster from "../../models/ExpeditionRoster";

function EditDisbursementModal(props: {disbursement: Disbursement, expeditions: [Expedition], adventurers: [Adventurer], isVisible: boolean, handleClose: () => void, onEdit: Function}) {

    const [rosterId, setRosterId] = useState<number>(props.disbursement.rosterId);
    const [date, setDate] = useState<Date>(new Date(props.disbursement.date));
    const [quantity, setQuantity] = useState<number>(props.disbursement.quantity)

    const [expeditionId, setExpeditionId] = useState<number | null>(0);
    const [adventurerId, setAdventurerId] = useState<number | null>(0);

    const [expeditionRoster, setExpeditionRoster] = useState<ExpeditionRoster|null>(null);

    const [expeditionDropdownTitle, setExpeditionDropdownTitle] = useState<string>("Please select an Expedition" );
    const [adventurerDropdownTitle, setAdventurerDropdownTitle] = useState<string>("Please select an Adventurer" );

    const loadExpeditionRoster = async () => {
        const response = await fetch(
            `${BACKEND_ENDPOINT}/expedition_roster/${props.disbursement.rosterId}`);
        const expeditionRoster = await response.json();
        setExpeditionRoster(expeditionRoster);
        setExpeditionDropdownTitle(expeditionRoster.expeditionName);
        setAdventurerDropdownTitle(expeditionRoster.adventurerName);
    }

    const expeditionOnSelect = (id: string | null, _: any) => {
        let exp = props.expeditions.find(e => e.id == parseInt(id!));
        setExpeditionId(exp!.id);
        setExpeditionDropdownTitle(exp!.name);
    }

    const adventurerOnSelect = (id: string | null, _: any) => {
        let adv = props.adventurers.find(e => e.id == parseInt(id!));
        setAdventurerId(adv!.id);
        setAdventurerDropdownTitle(adv!.name);
    }

    let saveAndClose = async () => {
        const response = await fetch(
            `${BACKEND_ENDPOINT}/expedition_roster/expedition_roster?${new URLSearchParams({exp_name: expeditionDropdownTitle, adv_name: adventurerDropdownTitle})}`);
        const roster = await response.json();
        console.log(roster);
        if (roster.length >= 1) {
            props.onEdit({id: props.disbursement.id, rosterId: roster[0].id, date, quantity});
            props.handleClose();
        } else {
            alert(`The Adventurer "${adventurerDropdownTitle}" did not go on the expedition "${expeditionDropdownTitle}"`)
        }
    }

    useEffect(() => {
        loadExpeditionRoster();
    }, []);
    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title> Editing Disbursement</Modal.Title>
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
                            <Form.Label>Date</Form.Label>
                            <Form.Control type={"date"} value={truncDate(date)} onChange={e => setDate(new Date(e.target.value))}/>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type={"number"} value={quantity.toString()} onChange={e => setQuantity(parseInt(e.target.value))}/>
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

export default EditDisbursementModal;