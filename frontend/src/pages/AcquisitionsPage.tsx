import React from 'react';
import AcquisitionList from '../components/AcquisitionList';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Acquisition from "../models/Acquisition";
import Adventurer from "../models/Adventurer";
import Expedition from "../models/Expedition";
import {Alert, Button, Container, Row} from "react-bootstrap";
import CreateAcquisitionModal from "../components/modals/CreateAcquisitionModal";
import BACKEND_ENDPOINT from "../constants";

function AcquisitionsPage(props: {}) {
    // Use the history for updating
    const navigation = useNavigate();

    // Use state to bring in the data
    const [acquisitions, setAcquisitions] = useState<[Acquisition]>([] as unknown as [Acquisition]);
    const [expeditions, setExpeditions] = useState<[Expedition]>([] as unknown as [Expedition]);
    const [adventurers, setAdventurers] = useState<[Adventurer]>([] as unknown as [Adventurer]);
    const [show, setShow] = useState<boolean>(false);

    const handleOpen  = () => setShow(true);
    const handleClose = () => setShow(false);

    // RETRIEVE the list of acquisitions
    const loadAcquisitions = async () => {
        const response = await fetch(`${BACKEND_ENDPOINT}/acquisition`);
        const acquisitions = await response.json();
        setAcquisitions(acquisitions);
    }

    // RETRIEVE the list of acquisitions
    const loadExpeditions = async () => {
        const response = await fetch(`${BACKEND_ENDPOINT}/expedition`);
        const expeditions = await response.json();
        setExpeditions(expeditions);
    }
    // RETRIEVE the list of acquisitions
    const loadAdventurers = async () => {
        const response = await fetch(`${BACKEND_ENDPOINT}/adventurer`);
        const adventurers = await response.json();
        setAdventurers(adventurers);
    }

    const onAcquisitionCreate = async (acquisition: Acquisition) => {
        const resp = await fetch(`${BACKEND_ENDPOINT}/acquisition`, {
            method: 'post',
            body: JSON.stringify(acquisition),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (resp.status === 201) {
            navigation('/acquisitions');
            const resp = await fetch(`${BACKEND_ENDPOINT}/acquisition`);
            const json = await resp.json();
            setAcquisitions(json);
        } else {
            alert("Failure!");
        }
    }

    // UPDATE a acquisition
    const onEditAcquisitions = async (acquisition: Acquisition) => {
        const resp = await fetch(`${BACKEND_ENDPOINT}/acquisition/${acquisition.id}`, {
            method: 'PUT',
            body: JSON.stringify(acquisition),
            headers: {'Content-Type': 'application/json'},
        });

        if(resp.status === 204) {
            const getResponse = await fetch(`${BACKEND_ENDPOINT}/acquisition`);
            const acquisition = await getResponse.json();
            setAcquisitions(acquisition);
        } else {
            const err = await resp.json();
            alert(`Failed to update document. Status ${resp.status}: ${err.error}`);
        }
        navigation('/acquisitions');
    }

    // DELETE a acquisition
    const onAcquisitionDelete = async (_id: number) => {
        const response = await fetch(`${BACKEND_ENDPOINT}/acquisition/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            const getResponse = await fetch(`${BACKEND_ENDPOINT}/acquisition`);
            const acquisition = await getResponse.json();
            setAcquisitions(acquisition);
        } else {
            console.error(`Failed to delete acquisition with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the acquisitions
    useEffect(() => {
        loadExpeditions();
        loadAdventurers();
        loadAcquisitions();
    }, []);

    // DISPLAY the acquisitions
    return (
        <>
            <Container>
                <article>
                    <Row><h2>Manage Acquisitions</h2></Row>
                    <Row><p>Welcome to the Acquisition Management page.

                        Here, you can add and remove acquisitions, as well as re-associate an acquisition with a given user,
                        or remove the association, or adjust the status of the acquisition, such as price and if it has sold.
                    </p></Row>
                    <Row><Button variant={"success"} onClick={_ => handleOpen()}> Create New Acquisition</Button></Row>
                    <Row>
                        <AcquisitionList
                            acquisitions={acquisitions}
                            expeditions={expeditions}
                            adventurers={adventurers}
                            onEdit={onEditAcquisitions}
                            onDelete={onAcquisitionDelete}
                        />
                    </Row>
                </article>
                <Row><Alert variant={"warning"}>This is is in very early alpha stages. The application works in its entirety, but there are many more planned features. Note that this site does not work on Internet Explorer. Please use Firefox or Google Chrome. </Alert></Row>
            </Container>
            <CreateAcquisitionModal isVisible={show} handleClose={handleClose}
                                    onCreate={onAcquisitionCreate} adventurers={adventurers} expeditions={expeditions}/>
        </>
    );
}

export default AcquisitionsPage;