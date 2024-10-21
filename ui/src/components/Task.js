import { Checkbox, Typography } from '@mui/material';
import React, {useState} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateTaskForm } from './UpdateTaskForm';
import classnames from 'classnames';
import { Button } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../utils';
import { fetchTasks } from '../../../api/task';

export const Task = ({task}) => {

  const {id, name, completed} = task;
  const [isComplete, setisComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTask = async({ task, fetchTasks }) => {
    try {
      await axios.put(API_URL, {
        id, name, completed: !isComplete
      });

      setisComplete((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }
  const handleCheckboxChange = (e) => {
    setisComplete((prev) => !prev)
  }

  const handleDeleteTask = async () => {
    try {
      axios.delete(`${API_URL}/${task.id}`);
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='task'>
        <div className={classnames("flex", {
            done: isComplete
        })}>
            <Checkbox checked={isComplete} onChange = {handleCheckboxChange} />
            <Typography variant = 'h4'>{name}</Typography>
        </div>
        <div className='taskButtons'>
            <Button variant='contained' onClick = {() => setIsDialogOpen(true)}>
                <EditIcon />
            </Button>
            <Button color = 'error' variant='contained' onClick = {handleDeleteTask}> 
                <DeleteIcon />
            </Button>
        </div>
        <UpdateTaskForm isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} task = {task} fetchTasks = {fetchTasks}/>
    </div>
  )
}
