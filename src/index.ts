import express from 'express';
import { spawn } from 'child_process';
import csv from 'csv-parser';
import fs from 'fs';
import { resolve } from 'path';
import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.get('/test', async (req, res) => {

    if (req.body == null || req.body.variables == null) {
        return res.status(400).send('Bad request');
    }

    const independents = req.body.variables.independents.join(',');
    const dependents = req.body.variables.dependents.join(',');
    console.log(['main.py', `-d=${dependents}`, `-i=${independents}`]);
    const ls = spawn('python3', ['main.py', `-d ${dependents}`, `-i ${independents}`]);
    await new Promise((resolve, reject) => {
        ls.on('close', (code) => {
            resolve();
        });
    });
    const parsed : any = fs.readFileSync('output.json');
    res.send(JSON.parse(parsed));
});

app.listen(PORT, () => {
    console.log('web server started on ' + PORT);
});