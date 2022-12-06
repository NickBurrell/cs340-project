import Modal from "react-bootstrap/Modal";
import Adventurer from "../../models/Adventurer";
import {Button, Dropdown, DropdownButton, Form} from "react-bootstrap";
import {useState} from "react";
import truncDate from "../../util";

function CreateDisbursementModal(props: {adventurers: [Adventurer], isVisible: boolean, handleClose: () => void, onCreate: Function}) {

    const [rosterId, setRosterId] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [quantity, setQuantity] = useState<number>(0)

    const [adventurerDropdownTitle, setAdventurerDropdownTitle] = useState<string>("Please select an Adventurer" );

    const adventurerOnSelect = (id: string | null, _: any) => {
        let adv = props.adventurers.find(e => e.id == parseInt(id!));
        setRosterId(adv!.id);
        setAdventurerDropdownTitle(adv!.name);
    }
    let saveAndClose = () => {
        props.onCreate({id:0,rosterId,date,quantity});
        props.handleClose();
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