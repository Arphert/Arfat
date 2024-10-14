import React, { useState, useEffect, useContext } from "react";
import { AppContext } from './App';
import { default as axios } from 'axios';

export const Task = () => {
    const { Userdata } = useContext(AppContext);  
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const[get_task_error,set_get_task_error]= useState("")
    const[add_task_error,set_add_task_error]=useState("")
    const[update_task_error,set_update_task_error]=useState("")
    const[delete_task_error,set_delete_task_error]=useState("")

    useEffect(() => {
        if (Userdata) {
            axios.get(`http://localhost:5000/Tasks/${Userdata.id}`)
                .then(res => setTasks(res.data))
                .catch(err => set_get_task_error(err.message));
        }
    }, [Userdata]);

    const addTask = () => {
        axios.post('http://localhost:5000/Tasks', {
            user_id: Userdata.id,
            task: newTask
        }).then(res => {
            setTasks([...tasks, res.data]);
            setNewTask("");
        }).catch(err => set_add_task_error(err.message));
    };

    const updateTaskStatus = (id, status) => {
        axios.put(`http://localhost:5000/Tasks/${id}`, { status })
            .then(res => {
                setTasks(tasks.map(task => task.id === id ? res.data : task));
            }).catch(err => set_update_task_error(err.message));
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/Tasks/${id}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id));
            }).catch(err => set_delete_task_error(err.message));
    };

    return (
        <div>
            <h2>To-Do List</h2>
            <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="New Task"
            />
            <button onClick={addTask}>Add Task</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.task} - {task.status}
                        <button onClick={() => updateTaskStatus(task.id, 'completed')}>Complete</button>
                        {update_task_error}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        {delete_task_error}
                    </li>
                ))}
            </ul>
        </div>
    );
};















// import { useState } from "react"
// import {default as axios} from 'axios'
// import { useState,useEffect,useContext } from "react"
// import { AppContext } from "./App"

// export const Task = ()=>{
//     const {Userdata} =useContext(AppContext)
//     const [tasks,settasks] = useEffect([])
//     const[newTask,setnewTask]
//     const [get_task_error,set_get_task_error]=useState("")

// useEffect(()=>{
//     if (Userdata){
//         axios.get(`http://127.0.0.1:5000/Tasks/${Userdata.id}`)
//         .then(res=>settasks(res.data))
//         .catch(err=> set_get_task_error(err.message))
        
//     }
// }

// )
// const add_tasks=()=>{
//     axios.post("http://127.0.0.1:5000/Tasks",
//         {
//             user_id:Userdata.id,
//             task:newTask
//         }
//     ).then()

// }

//     return(
//         <div className="Task">
            

//         </div>
//     )
// }