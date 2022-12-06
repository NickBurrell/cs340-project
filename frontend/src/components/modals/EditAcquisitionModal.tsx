import Modal from "react-bootstrap/Modal";
import Acquisition from "../../models/Acquisition";
import {Button, Dropdown, DropdownButton, Form} from "react-bootstrap";
import {useState} from "react";
import Expedition from "../../models/Expedition";
import Adventurer from "../../models/Adventurer";
import truncDate from "../../util";

function EditAcquisitionModal(props: {acquisition: Acquisition, expeditions: [Expedition], adventurers: [Adventurer], isVisible: boolean, handleClose: () => void, onEdit: Function}) {

    const [expeditionId, setExpeditionId] = useState<number | null>(props.acquisition.expeditionId);
    const [adventurerId, setAdventurerId] = useState<number | null>(props.acquisition.adventurerId);
    const [name, setName] = useState<string>(props.acquisition.name);
    const [date, setDate] = useState<Date>(props.acquisition.date);
    const [sold, setSold] = useState<boolean>(props.acquisition.sold);
    const [price, setPrice] = useState<number | null>(props.acquisition.price);

    const [expeditionDropdownTitle, setExpeditionDropdownTitle] = useState<string>(props.expeditions
        .find(e => e.id == props.acquisition.expeditionId)?.name ?? "Please select an Expedition" );
    const [adventurerDropdownTitle, setAdventurerDropdownTitle] = useState<string>(props.adventurers
        .find(e => e.id == props.acquisition.adventurerId)?.name ?? "Please select an Adventurer" );

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
            props.onEdit({id: props.acquisition.id, expeditionId, adventurerId, name, date, sold, price});
            props.handleClose();
        }
    }

    return(
        <>
            <Modal show={props.isVisible} onHide={props.handleClose}>
                <Modal.Header>
                    <Modal.Title>Editting Acquisition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Expedition</Form.Label>
                            <DropdownButton variant={"light"} id={"acq-edit-exp-drop"} title={expeditionDropdownTitle}
                                onSelect={expeditionOnSelect}>
                                <Dropdown.Item eventKey={"NULL"}>N/A</Dropdown.Item>
                                {props.expeditions.map((exp, i) =>
                                        <Dropdown.Item eventKey={exp.id} key={i.toString()}>{exp.name}</Dropdown.Item>
                                    )}
                            </DropdownButton>
                            <Form.Label>Adventurer</Form.Label>
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
                            <Form.Control type={"number"} value={(price??"0").toString()} onChange={e => setPrice(parseFloat(e.target.value))}/>

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

export default EditAcquisitionModal;