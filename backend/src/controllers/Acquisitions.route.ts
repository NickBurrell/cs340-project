import express from "express";
import {
    createAcquisition,
    deleteAcquisitionById,
    getAllAcquisitions,
    updateAcquisitionById
} from "../models/Acquisition.model";

const acquisitionRouter = express.Router();

acquisitionRouter.get('/', (req, res) => {
    getAllAcquisitions().then(acqs => {
        res.send(acqs)
    }).catch(error => {
        console.error(error);
        res.send({Error: "Request to retrieve acquisitions failed"});
    });
});

acquisitionRouter.post('/', (req, res) => {
    console.log(req.body);
    createAcquisition(req.body.expeditionId, req.body.adventurerId, req.body.name, new Date(req.body.date), req.body.sold, req.body.price)
        .then(adv => {
            res.status(201).json(Number(adv))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: 'Creation of acquisition failed'});
    });
});

acquisitionRouter.delete('/:_id', (req, res) => {
    deleteAcquisitionById(parseInt(req.params._id))
        .then(resp => {
            res.status(204).json(Number(resp))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: `failed to delete acquisition ${req.params._id}`});
    })
});

acquisitionRouter.put('/:_id', (req, res) => {
    updateAcquisitionById(req.body.id, req.body.expeditionId, req.body.adventurerId, req.body.name, new Date(req.body.date), req.body.sold, req.body.price)
        .then(adv => {
            res.status(204).json(Number(adv))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: `Failed to update acquisition ${req.body.id}`});
    })
})

export default acquisitionRouter;