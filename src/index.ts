import express from 'express';
import { spawn } from 'child_process';
import csv from 'csv-parser';
import fs from 'fs';
import { resolve } from 'path';

const PORT = 3000;
const app = express();

app.get('/test', async (req, res) => {
    const ls = spawn('python3', ['main.py']);
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