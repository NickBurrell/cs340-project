import Modal from "react-bootstrap/Modal";
import Acquisition from "../../models/Acquisition";
import {Button, Dropdown, DropdownButton, Form} from "react-bootstrap";
import {useState} from "react";
import Expedition from "../../models/Expedition";
import Adventurer from "../../models/Adventurer";
import truncDate from "../../util";

function CreateAcquisitionModal(props: {expeditions: [Expedition], adventurers: [Adventurer], isVisible: boolean, handleClose: () => void, onCreate: Function}) {

    const [expeditionId, setExpeditionId] = useState<number | null>(0);
    const [adventurerId, setAdventurerId] = useState<number | null>(0);
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [sold, setSold] = useState<boolean>(false);
    const [price, setPrice] = useState<number | null>(null);

    const [expeditionDropdownTitle, setExpeditionDropdownTitle] = useState<string>("Please select an Expedition" );
    const [adventurerDropdownTitle, setAdventurerDropdownTitle] = useState<string>("Please select an Adventurer" );

    const expeditionOnSelect = (id: string | null, _: any) => {
        if (id === "NULL") {
            setExpeditionId(null);
            setExpeditionDropdownTitle("N/A");
        } else {
            let exp = props.expeditions.find(e => e.id == parseInt(id!));
            setExpeditionId(exp!.id);
            setExpeditionDropdownTitle(exp!.name);
        }
    }

    const adventurerOnSelect = (id: string | null, _: any) => {
        if(id === "NULL") {
            setAdventurerId(null);
            setAdventurerDropdownTitle("N/A");
        } else {
            let exp = props.adventurers.find(e => e.id == parseInt(id!));
            setAdventurerId(exp!.id);
            setAdventurerDropdownTitle(exp!.name);
        }
    }

    let saveAndClose = () => {
        if (name === "NULL") {
            alert(`Name cannot be "NULL"`);
        } else {
            props.onCreate({id: 0, expeditionId, adventurerId, name, date, sold, price});
            props.handleClose();
        }
    }


    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Creating New Acquisition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Expedition (Choosing N/A Nullifies the relation)</Form.Label>
                            <DropdownButton variant={"light"} id={"acq-edit-exp-drop"} title={expeditionDropdownTitle}
                                            onSelect={expeditionOnSelect}>
                                    <Dropdown.Item eventKey={"NULL"}>N/A</Dropdown.Item>
                                {props.expeditions.map((exp, i) =>
                                    <Dropdown.Item eventKey={exp.id} key={i.toString()}>{exp.name}</Dropdown.Item>
                                )}
                            </DropdownButton>
                            <Form.Label>Adventurer (Choosing N/A Nullifies the relation)</Form.Label>
                            <DropdownButton variant={"light"} id={"acq-edit-adv-drop"} title={adventurerDropdownTitle}
                                            onSelect={adventurerOnSelect}>
                                <Dropdown.Item eventKey={"NULL"}>N/A</Dropdown.Item>
                                {props.adventurers.map((adv, i) =>
                                    <Dropdown.Item eventKey={adv.id} key={i.toString()}>{adv.name}</Dropdown.Item>
                                )}
                            </DropdownButton>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type={"text"} value={name} onChange={e => setName(e.target.value)}/>
                            <Form.Label>Date</Form.Label>
                            <Form.Control type={"date"} value={truncDate(date)} onChange={e => setDate(new Date(e.target.value))}/>
                            <Form.Check type={'checkbox'} defaultChecked={sold} onChange={e => setSold(e.target.value === 'true')} label={"Sold"}/>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type={"number"} value={price?.toString()} onChange={e => parseInt(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"secondary"} onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant={"primary"} onClick={saveAndClose} type={"submit"}>
                        Add Acquisition
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateAcquisitionModal;