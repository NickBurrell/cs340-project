import express from "express";
import {
    createDisbursement,
    deleteDisbursementById,
    getAllDisbursements,
    updateDisbursementById
} from "../models/Disbursement.model";
const disbursementRouter = express.Router();

disbursementRouter.get('/', (req, res) => {
    getAllDisbursements().then(advs => {
        res.send(advs)
    }).catch(error => {
        console.error(error);
        res.send({Error: "Request to retrieve disbursements failed"});
    });
});

disbursementRouter.post('/', (req, res) => {
    console.log(req.body);
    createDisbursement(req.body.rosterId, new Date(req.body.date), req.body.quantity)
        .then(adv => {
            res.status(201).json(Number(adv))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: 'Creation of disbursement failed'});
    });
});

disbursementRouter.delete('/:_id', (req, res) => {
    deleteDisbursementById(parseInt(req.params._id))
        .then(resp => {
            res.status(204).json(Number(resp))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: `failed to delete disbursement ${req.params._id}`});
    })
});

disbursementRouter.put('/:_id', (req, res) => {
    updateDisbursementById(req.body.id, req.body.rosterId, new Date(req.body.date), req.body.quantity)
        .then(adv => {
            res.status(204).json(Number(adv))
        }).catch(err => {
        console.log(err);
        res.status(400).json({error: `Failed to update disbursement ${req.body.id}`});
    })
});

export default disbursementRouter;