import React from 'react';
import Adventurer from "../models/Adventurer";
import AdventurerEntry from "./AdventurerEntry";
import {Table} from "react-bootstrap";

function AdventurerList( props: {adventurers: [Adventurer], onEdit: Function, onDelete: Function} ) {
    return (
        <Table>
            <caption>List of Adventurers</caption>
            <thead>
                <tr>
                    <td>Database ID</td>
                    <td>Name</td>
                    <td>Job</td>
                    <td>Rank</td>
                    <td>DKP</td>
                    <td>Delete</td>
                    <td>Edit</td>
                </tr>
            </thead>
            <tbody>
            {
                props.adventurers.map((adv: Adventurer, i: number) =>
                    <AdventurerEntry adventurer={adv} onEdit={props.onEdit} onDelete={props.onDelete} key={i.toString()}/>
            )}
            </tbody>
        </Table>
    );
}

export default AdventurerList;
