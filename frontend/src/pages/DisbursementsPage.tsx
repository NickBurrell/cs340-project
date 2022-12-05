import React from 'react';
import DisbursementList from '../components/DisbursementList';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Disbursement from "../models/Disbursement";
import {Button, Container, Row} from "react-bootstrap";
import CreateDisbursementModal from "../components/modals/CreateDisbursementModal";
import Adventurer from "../models/Adventurer";
import BACKEND_ENDPOINT from "../constants";

function DisbursementsPage(props: {}) {
    // Use the history for updating
    const navigation = useNavigate();

    // Use state to bring in the data
    const [disbursements, setDisbursements] = useState<[Disbursement]>([] as unknown as [Disbursement]);
    const [adventurers, setAdventurers] = useState<[Adventurer]>([] as unknown as [Adventurer]);

    const [show, setShow] = useState<boolean>(false);

    const handleOpen  = () => setShow(true);
    const handleClose = () => setShow(false);

    // RETRIEVE the list of disbursements
    const loadDisbursements = async () => {
        const response = await fetch(`${BACKEND_ENDPOINT}/disbursement`);
        const disbursements = await response.json();
        setDisbursements(disbursements);
    }

    // RETRIEVE the list of acquisitions
    const loadAdventurers = async () => {
        const response = await fetch(`${BACKEND_ENDPOINT}/adventurer`);
        const adventurers = await response.json();
        setAdventurers(adventurers);
    }

    const onDisbursementCreate = async (disbursement: Disbursement) => {
        const resp = await fetch(`${BACKEND_ENDPOINT}/disbursement`, {
            method: 'POST',
            body: JSON.stringify(disbursement),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (resp.status === 201) {

            const resp = await fetch(`${BACKEND_ENDPOINT}/adventurer/${disbursement.rosterId}`);
            const adv = await resp.json();
            adv.dkp += disbursement.quantity;
            console.log(adv);
            const updateResp = await fetch(`${BACKEND_ENDPOINT}/adventurer/${disbursement.rosterId}`, {
                method: 'PUT',
                body: JSON.stringify(adv),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(updateResp.status === 204) {
                const resp = await fetch(`${BACKEND_ENDPOINT}/disbursement`);
                const json = await resp.json();
                navigation('/disbursements');
                setDisbursements(json);
            } else {
                alert("Failed to update DKP");
            }
        } else {
            alert("Failure!");
        }
        console.log(disbursement);
    }

    // UPDATE a disbursement
    const onEditDisbursements = async (disbursement: Disbursement) => {
        const resp = await fetch(`${BACKEND_ENDPOINT}/disbursement/${disbursement.id}`, {
            method: 'PUT',
            body: JSON.stringify(disbursement),
            headers: {'Content-Type': 'application/json'},
        });

        if(resp.status === 204) {
            const getResponse = await fetch(`${BACKEND_ENDPOINT}/disbursement`);
            const disbursement = await getResponse.json();
            setDisbursements(disbursement);
        } else {
            const err = await resp.json();
            alert(`Failed to update document. Status ${resp.status}: ${err.error}`);
        }
        navigation('/disbursements');
    }

    // DELETE a disbursement
    const onDisbursementDelete = async (_id: number) => {
        const response = await fetch(`${BACKEND_ENDPOINT}/disbursement/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch(`${BACKEND_ENDPOINT}/disbursement`);
            const disbursement = await getResponse.json();
            setDisbursements(disbursement);
        } else {
            console.error(`Failed to delete disbursement with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the disbursements
    useEffect(() => {
        loadAdventurers();
        loadDisbursements();
    }, []);

    // DISPLAY the disbursements
    return (
        <>
            <Container>
                <article>
                    <Row><h2>Manage Disbursements</h2></Row>
                    <Row><p>Welcome to the Disbursement Management page.

                        Here, you can add and remove disbursements to a given adventurer, with the changes propogating to
                        their corresponding "DKP" field in the database.
                    </p></Row>
                    <Row><Button variant={"success"} onClick={_ => handleOpen()}> Create New Disbursement</Button></Row>
                    <Row>
                        <DisbursementList
                            disbursements={disbursements}
                            adventurers={adventurers}
                            onEdit={onEditDisbursements}
                            onDelete={onDisbursementDelete}/>
                    </Row>
                </article>
            </Container>
            <CreateDisbursementModal isVisible={show} handleClose={handleClose} onCreate={onDisbursementCreate} adventurers={adventurers}/>
        </>
    );
}

export default DisbursementsPage;