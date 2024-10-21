import React, {useState, useEffect} from 'react';
import { AddTaskForm } from "./components/AddTaskForm";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Task } from "./components/Task";
import axios from "axios"; //tool to help us send http requests (react)
import { API_URL } from './utils';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const {data} = await axios.get(API_URL);
      setTasks(data);
    } catch (error) {
      console.log('error fetching tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  },[]);


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks = {fetchTasks}/>
      {tasks.map((task) => <Task task = {task} key = {task.id} fetchTasks = {fetchTasks}/>)}
    </ThemeProvider>
  );
}

export default App;
