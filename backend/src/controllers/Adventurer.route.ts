import express from "express";
import {
    createAdventurer,
    deleteAdventurerById, getAdventurerById,
    getAllAdventurers,
    updateAdventurerById
} from "../models/Adventurer.model";

const adventurerRouter = express.Router();

adventurerRouter.get('/', (req, res) => {
    getAllAdventurers().then(advs => {
        res.send(advs)
    }).catch(error => {
        console.error(error);
        res.send({Error: "Request to retrieve adventurers failed"});
    });
});

adventurerRouter.get('/:_id', (req, res) => {
    getAdventurerById(parseInt(req.params._id)).then(adv => {
        res.send(adv)
    }).catch(error => {
        console.error(error);
        res.send({Error: "Request to retrieve adventurers failed"});
    });
});

adventurerRouter.post('/', (req, res) => {
    
    createAdventurer(req.body.name, req.body.job, req.body.rank, req.body.dkp)
        .then(adv => {
            res.status(201).json(Number(adv))
        }).catch(err => {
            console.log(err);
            res.status(400).json({error: 'Creation of adventurer failed'});
    });
});

adventurerRouter.delete('/:_id', (req, res) => {
    deleteAdventurerById(parseInt(req.params._id))
        .then(resp => {
            res.status(204).json(Number(resp))
        }).catch(err => {
            console.log(err);
            res.status(400).json({error: `failed to delete adventurer ${req.params._id}`});
    })
});

adventurerRouter.put('/:_id', (req, res) => {
    updateAdventurerById(req.body.id, req.body.name, req.body.job, req.body.rank, req.body.dkp)
        .then(adv => {
            res.status(204).json(Number(adv))
        }).catch(err => {
            console.log(err);
            res.status(400).json({error: `Failed to update adventurer ${req.body.id}`});
    })
});

export default adventurerRouter;