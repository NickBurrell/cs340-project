import React from 'react';
import Acquisition from "../models/Acquisition";
import AcquisitionEntry from "./AcquisitionEntry";
import {Table} from "react-bootstrap";
import Expedition from "../models/Expedition";
import Adventurer from "../models/Adventurer";

function AcquisitionList( props: {acquisitions: [Acquisition], expeditions:[Expedition], adventurers: [Adventurer], onEdit: Function, onDelete: Function} ) {
    return (
        <Table>
            <caption>List of Acquisitions</caption>
            <thead>
                <tr>
                    <td>Database ID</td>
                    <td>Expedition ID</td>
                    <td>Adventurer ID</td>
                    <td>Name</td>
                    <td>Date</td>
                    <td>Sold</td>
                    <td>Price</td>
                    <td>Delete</td>
                    <td>Edit</td>
                </tr>
            </thead>
            <tbody>
            {
                props.acquisitions.map((adv: Acquisition, i: number) =>
                    <AcquisitionEntry acquisition={adv} expeditions={props.expeditions} adventurers={props.adventurers}
                                      onEdit={props.onEdit} onDelete={props.onDelete} key={i.toString()}/>
            )}
            </tbody>
        </Table>
    );
}

export default AcquisitionList;
