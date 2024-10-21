import express from "express"
import { fetchTasks, updateTasks, createTasks, deleteTasks } from './task.js';
import serverless from "serverless-http"
import cors from "cors";
import axios from "axios";
const app = express()
const port = 3001

//add middleware
app.use(express.json());

if(process.env.DEVELOPMENT) {
    app.use(cors());
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/task', async (req, res) => {
    try {
        const tasks = await fetchTasks();

        res.send(tasks.Items)
    } catch (error) {
        res.status(400).send("error fetching tasks");
    }
});

app.post('/task', async (req, res) => {
    try {
        const tasks = req.body;

        const response = await createTasks(tasks);

        res.send(response);

    } catch (error) {
        res.status(400).send("error creating task");
    }
});

app.put('/task', async (req, res) => {
    try {
        const tasks = req.body;

        const response = await updateTasks(tasks);

        res.send(response);
    } catch (error) {
        res.status(400).send("error updating tasks");
    }
});

app.delete('/task/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const response = await deleteTasks(id);

        res.send(response);

    } catch (error) {
        res.status(400).send("error deleting tasks");
    }
});

if(process.env.DEVELOPMENT) {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    }); 
}

export const handler = serverless(app);