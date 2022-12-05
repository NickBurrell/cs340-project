import React from 'react';
import AdventurerList from '../components/AdventurerList';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Adventurer from "../models/Adventurer";
import {Button, Container, Row} from "react-bootstrap";
import CreateAdventurerModal from "../components/modals/CreateAdventurerModal";
import {FaJediOrder} from "react-icons/all";
import BACKEND_ENDPOINT from "../constants";

function AdventurerPage(props: {}) {
    // Use the history for updating
    const navigation = useNavigate();

    // Use state to bring in the data
    const [adventurers, setAdventurers] = useState<[Adventurer]>([] as unknown as [Adventurer]);
    const [show, setShow] = useState<boolean>(false);

    const handleOpen  = () => setShow(true);
    const handleClose = () => setShow(false);

    // RETRIEVE the list of adventurers
    const loadAdventurers = async () => {
        const response = await fetch(`${BACKEND_ENDPOINT}/adventurer`);
        const adventurers = await response.json();
        console.log(response);
        setAdventurers(adventurers);
    }

    const onAdventurerCreate = async (adventurer: Adventurer) => {
        const resp = await fetch(`${BACKEND_ENDPOINT}/adventurer`, {
            method: 'post',
            body: JSON.stringify(adventurer),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (resp.status === 201) {
            navigation('/adventurers');
            const resp = await fetch(`${BACKEND_ENDPOINT}/adventurer`);
            const json = await resp.json();
            setAdventurers(json);
        } else {
            alert("Failure!");
        }
        console.log(adventurer);
    }

    // UPDATE a adventurer
    const onEditAdventurers = async (adventurer: Adventurer) => {
        const resp = await fetch(`${BACKEND_ENDPOINT}/adventurer/${adventurer.id}`, {
            method: 'PUT',
            body: JSON.stringify(adventurer),
            headers: {'Content-Type': 'application/json'},
        });

        if(resp.status === 204) {
            const getResponse = await fetch(`${BACKEND_ENDPOINT}/adventurer`);
            const adventurer = await getResponse.json();
            setAdventurers(adventurer);
        } else {
            const err = await resp.json();
            alert(`Failed to update document. Status ${resp.status}: ${err.error}`);
        }
        navigation('/adventurers');
    }

    // DELETE a adventurer
    const onAdventurerDelete = async (_id: number) => {
        const response = await fetch(`${BACKEND_ENDPOINT}/adventurer/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch(`${BACKEND_ENDPOINT}/adventurer`);
            const adventurer = await getResponse.json();
            setAdventurers(adventurer);
        } else {
            console.error(`Failed to delete adventurer with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the adventurers
    useEffect(() => {
        loadAdventurers();
    }, []);

    // DISPLAY the adventurers
    return (
        <>
            <Container>
            <article>
                <Row><h2>Manage Adventurers</h2></Row>
                <Row><p>Welcome to the Adventurer Management page.

                    Here, you can create and remove guild members, as well as manually edit
                    values like their job, guild rank, and DKP.</p></Row>
                <Row><Button variant={"success"} onClick={_ => handleOpen()}> Create New Adventurer</Button></Row>
                <Row>
                    <AdventurerList
                    adventurers={adventurers as [Adventurer]}
                    onEdit={onEditAdventurers}
                    onDelete={onAdventurerDelete}
                />
                </Row>
            </article>
            </Container>
            <CreateAdventurerModal isVisible={show} handleClose={handleClose} onCreate={onAdventurerCreate}/>
        </>
    );
}

export default AdventurerPage;