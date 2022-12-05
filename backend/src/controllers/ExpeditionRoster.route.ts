import express from "express";
import {
    createExpeditionRoster,
    deleteExpeditionRosterById,
    getAllExpeditionRosters,
    updateExpeditionRosterById
} from "../models/ExpeditionRoster.model";

const expeditionRosterRouter = express.Router();

expeditionRosterRouter.get('/', (req, res) => {
    getAllExpeditionRosters().then(advs => {
        res.send(advs)
    }).catch(error => {
        console.error(error);
        res.send({Error: "Request to retrieve expeditionRosters failed"});
    });
});


expeditionRosterRouter.post('/', (req, res) => {
    console.log(req.body);
    createExpeditionRoster(req.body.expeditionId, req.body.adventurerId)
        .then(adv => {
            res.status(201).json(Number(adv))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: 'Creation of expeditionRoster failed'});
    });
});

expeditionRosterRouter.delete('/:_id', (req, res) => {
    deleteExpeditionRosterById(parseInt(req.params._id))
        .then(resp => {
            res.status(204).json(Number(resp))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: `failed to delete expeditionRoster ${req.params._id}`});
    })
});

expeditionRosterRouter.put('/:_id', (req, res) => {
    updateExpeditionRosterById(req.body.id, req.body.expeditionId, req.body.adventurerId)
        .then(adv => {
            res.status(204).json(Number(adv))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: `Failed to update expeditionRoster ${req.body.id}`});
    })
});

export default expeditionRosterRouter;