import React from 'react';
import ExpeditionRosterList from '../components/ExpeditionRosterList';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import ExpeditionRoster from "../models/ExpeditionRoster";
import {Button, Container, Row} from "react-bootstrap";
import CreateExpeditionRosterModal from "../components/modals/CreateExpeditionRosterModal";
import Expedition from "../models/Expedition";
import Adventurer from "../models/Adventurer";
import expedition from "../models/Expedition";
import BACKEND_ENDPOINT from "../constants";

function ExpeditionRostersPage(props: {}) {
    // Use the history for updating
    const navigation = useNavigate();

    // Use state to bring in the data
    const [expeditionRoster, setExpeditionRosters] = useState<[ExpeditionRoster]>([] as unknown as [ExpeditionRoster]);
    const [expeditions, setExpeditions] = useState<[Expedition]>([] as unknown as [Expedition]);
    const [adventurers, setAdventurers] = useState<[Adventurer]>([] as unknown as [Adventurer]);
    const [show, setShow] = useState<boolean>(false);

    const handleOpen  = () => setShow(true);
    const handleClose = () => setShow(false);

    // RETRIEVE the list of expeditionRoster
    const loadExpeditionRosters = async () => {
        const response = await fetch(`${BACKEND_ENDPOINT}/expedition_roster`);
        const expeditionRoster = await response.json();
        setExpeditionRosters(expeditionRoster);
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

    const onExpeditionRosterCreate = async (expeditionRoster: ExpeditionRoster) => {
        const resp = await fetch(`${BACKEND_ENDPOINT}/expeditionRoster`, {
            method: 'post',
            body: JSON.stringify(expeditionRoster),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (resp.status === 201) {
            navigation('/expeditionRosters');
            const resp = await fetch(`${BACKEND_ENDPOINT}/expeditionRoster`);
            const json = await resp.json();
            setExpeditionRosters(json);
        } else {
            alert("Failure!");
        }
        console.log(expeditionRoster);
    }

    // UPDATE a expeditionRoster
    const onEditExpeditionRosters = async (expeditionRoster: ExpeditionRoster) => {
        const resp = await fetch(`${BACKEND_ENDPOINT}/expeditionRoster/${expeditionRoster.id}`, {
            method: 'PUT',
            body: JSON.stringify(expeditionRoster),
            headers: {'Content-Type': 'application/json'},
        });

        if(resp.status === 204) {
            const getResponse = await fetch(`${BACKEND_ENDPOINT}/expeditionRoster`);
            const expeditionRoster = await getResponse.json();
            setExpeditionRosters(expeditionRoster);
        } else {
            const err = await resp.json();
            alert(`Failed to update document. Status ${resp.status}: ${err.error}`);
        }
        navigation('/expeditionRosters');
    }

    // DELETE a expeditionRoster
    const onExpeditionRosterDelete = async (_id: number) => {
        const response = await fetch(`${BACKEND_ENDPOINT}/expeditionRoster/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch(`${BACKEND_ENDPOINT}/expeditionRoster`);
            const expeditionRoster = await getResponse.json();
            setExpeditionRosters(expeditionRoster);
        } else {
            console.error(`Failed to delete expeditionRoster with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the expeditionRoster
    useEffect(() => {
        loadExpeditions();
        loadAdventurers();
        loadExpeditionRosters();
    }, []);

    // DISPLAY the expeditionRoster
    return (
        <>
            <Container>
                <article>
                    <Row><h2>Manage Expedition Rosters</h2></Row>
                    <Row><p>Welcome to the Expedition Roster Management page.

                        Here, you can adjust whether a given adventurer was present at a given expedition.
                    </p></Row>
                    <Row><Button variant={"success"} onClick={_ => handleOpen()}> Create New Expedition Roster</Button></Row>
                    <Row><ExpeditionRosterList
                        expeditionRosters={expeditionRoster}
                        expeditions={expeditions}
                        adventurers={adventurers}
                        onEdit={onEditExpeditionRosters}
                        onDelete={onExpeditionRosterDelete}/>
                    </Row>
                </article>
            </Container>
            <CreateExpeditionRosterModal isVisible={show} expeditions={expeditions} adventurers={adventurers}
                                         handleClose={handleClose} onCreate={onExpeditionRosterCreate}/>
        </>
    );
}

export default ExpeditionRostersPage;