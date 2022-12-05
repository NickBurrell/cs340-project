import React from 'react';
import ExpeditionRoster from "../models/ExpeditionRoster";
import ExpeditionRosterEntry from "./ExpeditionRosterEntry";
import {Table} from "react-bootstrap";
import Expedition from "../models/Expedition";
import Adventurer from "../models/Adventurer";
import expedition from "../models/Expedition";

function ExpeditionRosterList( props: {expeditionRosters: [ExpeditionRoster], expeditions: [Expedition], adventurers: [Adventurer], onEdit: Function, onDelete: Function} ) {
    return (
        <Table>
            <caption>List of ExpeditionRosters</caption>
            <thead>
                <tr>
                    <td>Database ID</td>
                    <td>Expedition ID</td>
                    <td>Adventurer ID</td>
                </tr>
            </thead>
            <tbody>
            {
                props.expeditionRosters.map((adv: ExpeditionRoster, i: number) =>
                    <ExpeditionRosterEntry expeditionRoster={adv} expeditions={props.expeditions} adventurers={props.adventurers}
                                           onEdit={props.onEdit} onDelete={props.onDelete} key={i.toString()}/>
            )}
            </tbody>
        </Table>
    );
}

export default ExpeditionRosterList;
