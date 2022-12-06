import React from 'react';
import Disbursement from "../models/Disbursement";
import DisbursementEntry from "./DisbursementEntry";
import {Table} from "react-bootstrap";
import adventurer from "../models/Adventurer";
import Adventurer from "../models/Adventurer";

function DisbursementList( props: {disbursements: [Disbursement], adventurers: [Adventurer], onEdit: Function, onDelete: Function} ) {
    return (
        <Table>
            <caption>List of Disbursements</caption>
            <thead>
                <tr>
                    <td>Database ID</td>
                    <td>Expedition Name</td>
                    <td>Adventurer Name</td>
                    <td>Date</td>
                    <td>Quantity</td>
                    <td>Delete</td>
                    <td>Edit</td>
                </tr>
            </thead>
            <tbody>
            {
                props.disbursements.map((adv: Disbursement, i: number) =>
                    <DisbursementEntry disbursement={adv} adventurers={props.adventurers} onEdit={props.onEdit} onDelete={props.onDelete} key={i.toString()}/>
            )}
            </tbody>
        </Table>
    );
}

export default DisbursementList;
