import Modal from "react-bootstrap/Modal";
import Adventurer from "../../models/Adventurer";
import {Button, Dropdown, DropdownButton, Form} from "react-bootstrap";
import {useState} from "react";
import Disbursement from "../../models/Disbursement";
import disbursement from "../../models/Disbursement";
import truncDate from "../../util";

function EditDisbursementModal(props: {disbursement: Disbursement, adventurers: [Adventurer], isVisible: boolean, handleClose: () => void, onEdit: Function}) {

    const [rosterId, setRosterId] = useState<number>(props.disbursement.rosterId);
    const [date, setDate] = useState<Date>(new Date(props.disbursement.date));
    const [quantity, setQuantity] = useState<number>(props.disbursement.quantity)

    const [adventurerDropdownTitle, setAdventurerDropdownTitle] = useState<string>("Please select an Adventurer" );

    const adventurerOnSelect = (id: string | null, _: any) => {
        let adv = props.adventurers.find(e => e.id == parseInt(id!));
        setRosterId(adv!.id);
        setAdventurerDropdownTitle(adv!.name);
    }
    let saveAndClose = () => {
        props.onEdit({id:props.disbursement.id,rosterId,date,quantity});
        props.handleClose();
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit Disbursement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <DropdownButton variant={"light"} id={"acq-edit-adv-drop"} title={adventurerDropdownTitle}
                                            onSelect={adventurerOnSelect}>
                                {props.adventurers.map((adv, i) =>
                                    <Dropdown.Item eventKey={adv.id} key={i.toString()}>{adv.name}</Dropdown.Item>
                                )}
                            </DropdownButton>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type={"text"} value={truncDate(date)} onChange={e => setDate(new Date(e.target.value))}/>
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

export default EditDisbursementModal;