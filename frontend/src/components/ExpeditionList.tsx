import React from 'react';
import Expedition from "../models/Expedition";
import ExpeditionEntry from "./ExpeditionEntry";
import {Table} from "react-bootstrap";

function ExpeditionList( props: {expeditions: [Expedition], onEdit: Function, onDelete: Function} ) {
    return (
        <Table>
            <caption>List of Expeditions</caption>
            <thead>
                <tr>
                    <td>Database ID</td>
                    <td>Name</td>
                    <td>Date</td>
                    <td>Delete</td>
                    <td>Edit</td>
                </tr>
            </thead>
            <tbody>
            {
                props.expeditions.map((adv: Expedition, i: number) =>
                    <ExpeditionEntry expedition={adv} onEdit={props.onEdit} onDelete={props.onDelete} key={i.toString()}/>
            )}
            </tbody>
        </Table>
    );
}

export default ExpeditionList;
