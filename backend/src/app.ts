import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import adventurerRouter from "./controllers/Adventurer.route";
import disbursementRouter from "./controllers/Disbursements.route";
import acquisitionRouter from "./controllers/Acquisitions.route";
import expeditionRosterRouter from "./controllers/ExpeditionRoster.route";
import expeditionRouter from "./controllers/Expedition.route";

dotenv.config();
const app: Express = express();
const port = process.env.SERVER_PORT;

if (process.env.DB_USER === "") {
    console.log("No Database User specified. Exiting.");
    process.exit();
}

if (process.env.DB_PASSWORD === "") {
    console.log("No Database User specified. Exiting.");
    process.exit();
}

app.use(express.json());

app.use(function(req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.use("/adventurer", adventurerRouter);
app.use("/expedition", expeditionRouter);
app.use("/expedition_roster", expeditionRosterRouter);
app.use("/acquisition", acquisitionRouter);
app.use("/disbursement", disbursementRouter);
