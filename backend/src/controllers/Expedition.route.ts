import express from "express";
import {
    createExpedition,
    deleteExpeditionById,
    getAllExpeditions,
    updateExpeditionById
} from "../models/Expedition.model";


const expeditionRouter = express.Router();

expeditionRouter.get('/', (req, res) => {
    getAllExpeditions().then(exps => {
        res.send(exps)
    }).catch(error => {
        console.error(error);
        res.send({Error: "Request to retrieve expeditions failed"});
    });
});

expeditionRouter.post('/', (req, res) => {
    console.log(req.body);
    createExpedition(req.body.name, new Date(req.body.date))
        .then(adv => {
            res.status(201).json(Number(adv))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: 'Creation of expedition failed'});
    });
});

expeditionRouter.delete('/:_id', (req, res) => {
    deleteExpeditionById(parseInt(req.params._id))
        .then(resp => {
            res.status(204).json(Number(resp))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: `failed to delete expedition ${req.params._id}`});
    })
});

expeditionRouter.put('/:_id', (req, res) => {
    updateExpeditionById(req.body.id, req.body.name, new Date(req.body.date))
        .then(adv => {
            res.status(204).json(Number(adv))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: `Failed to update expedition ${req.body.id}`});
    })
});

export default expeditionRouter;