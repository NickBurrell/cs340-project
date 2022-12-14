import React from 'react';
import ExpeditionList from '../components/ExpeditionList';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Expedition from "../models/Expedition";
import {Alert, Button, Container, Row} from "react-bootstrap";
import CreateExpeditionModal from "../components/modals/CreateExpeditionModal";
import BACKEND_ENDPOINT from "../constants";

function ExpeditionsPage(props: {}) {
    // Use the history for updating
    const navigation = useNavigate();

    // Use state to bring in the data
    const [expeditions, setExpeditions] = useState<[Expedition]>([] as unknown as [Expedition]);
    const [show, setShow] = useState<boolean>(false);

    const handleOpen  = () => setShow(true);
    const handleClose = () => setShow(false);
    // RETRIEVE the list of expeditions
    const loadExpeditions = async () => {
        const response = await fetch(`${BACKEND_ENDPOINT}/expedition`);
        const expeditions = await response.json();
        setExpeditions(expeditions);
    }

    const onExpeditionCreate = async (expedition: Expedition) => {
        const resp = await fetch(`${BACKEND_ENDPOINT}/expedition`, {
            method: 'post',
            body: JSON.stringify(expedition),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (resp.status === 201) {
            navigation('/expeditions');
            const resp = await fetch(`${BACKEND_ENDPOINT}/expedition`);
            const json = await resp.json();
            setExpeditions(json);
        } else {
            alert("Failure!");
        }
    }

    // UPDATE a expedition
    const onEditExpeditions = async (expedition: Expedition) => {
        const resp = await fetch(`${BACKEND_ENDPOINT}/expedition/${expedition.id}`, {
            method: 'PUT',
            body: JSON.stringify(expedition),
            headers: {'Content-Type': 'application/json'},
        });

        if(resp.status === 204) {
            const getResponse = await fetch(`${BACKEND_ENDPOINT}/expedition`);
            const expedition = await getResponse.json();
            setExpeditions(expedition);
        } else {
            const err = await resp.json();
            alert(`Failed to update document. Status ${resp.status}: ${err.error}`);
        }
        navigation('/expeditions');
    }

    // DELETE a expedition
    const onExpeditionDelete = async (_id: number) => {
        const response = await fetch(`${BACKEND_ENDPOINT}/expedition/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch(`${BACKEND_ENDPOINT}/expedition`);
            const expedition = await getResponse.json();
            setExpeditions(expedition);
        } else {
            console.error(`Failed to delete expedition with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the expeditions
    useEffect(() => {
        loadExpeditions();
    }, []);

    // DISPLAY the expeditions
    return (
        <>
            <Container>
                <article>
                    <Row><h2>Manage Expeditions</h2></Row>
                    <Row><p>Welcome to the Expedition Management page.

                        Here, you can create and remove expeditions, as well as rename them.
                    </p></Row>
                    <Row><Button variant={"success"} onClick={_ => handleOpen()}> Create New Expedition</Button></Row>
                    <Row>
                        <ExpeditionList
                            expeditions={expeditions}
                            onEdit={onEditExpeditions}
                            onDelete={onExpeditionDelete}/>
                    </Row>
                </article>
                <Row><Alert variant={"warning"}>This is is in very early alpha stages. The application works in its entirety, but there are many more planned features. Note that this site does not work on Internet Explorer. Please use Firefox or Google Chrome. </Alert></Row>
            </Container>
            <CreateExpeditionModal isVisible={show} handleClose={handleClose} onCreate={onExpeditionCreate}/>
        </>
    );
}

export default ExpeditionsPage;