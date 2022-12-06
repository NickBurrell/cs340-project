import Modal from "react-bootstrap/Modal";
import Adventurer from "../../models/Adventurer";
import {Button, Dropdown, DropdownButton, Form} from "react-bootstrap";
import {useState} from "react";
import truncDate from "../../util";
import Expedition from "../../models/Expedition";
import BACKEND_ENDPOINT from "../../constants";
import expedition from "../../models/Expedition";

function CreateDisbursementModal(props: {expeditions: [Expedition], adventurers: [Adventurer], isVisible: boolean, handleClose: () => void, onCreate: Function}) {

    const [rosterId, setRosterId] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [quantity, setQuantity] = useState<number>(0)

    const [expeditionId, setExpeditionId] = useState<number | null>(0);
    const [adventurerId, setAdventurerId] = useState<number | null>(0);

    const [expeditionDropdownTitle, setExpeditionDropdownTitle] = useState<string>("Please select an Expedition" );
    const [adventurerDropdownTitle, setAdventurerDropdownTitle] = useState<string>("Please select an Adventurer" );

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
        if(expeditionDropdownTitle === "Please select an Expedition") {
            if (adventurerDropdownTitle === "Please select an Adventurer") {
                alert("Please select an Expedition and an Adventurer");
            } else {
                alert("Please select an Expedition");
            }
        } else if (adventurerDropdownTitle === "Please select an Adventurer") {
            alert("Please select an Adventurer");
        } else {
            const response = await fetch(
                `${BACKEND_ENDPOINT}/expedition_roster/expedition_roster?${new URLSearchParams({
                    exp_name: expeditionDropdownTitle,
                    adv_name: adventurerDropdownTitle
                })}`);
            const expeditionRoster = await response.json();
            console.log(expeditionRoster);
            if (expeditionRoster.length >= 1) {
                props.onCreate({id: 0, rosterId: expeditionRoster[0].id, date, quantity});
                props.handleClose();
            } else {
                alert(`The Adventurer "${adventurerDropdownTitle}" did not go on the expedition "${expeditionDropdownTitle}"`)
            }
        }
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Creating New Disbursement</Modal.Title>
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
                        Add Adventurer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateDisbursementModal;