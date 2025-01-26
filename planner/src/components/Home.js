import React, { useState } from 'react';
import TaskList from './TaskList';
import useFetch from './UseFetch';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const {data: tasks, setData: setTasks} = useFetch(`http://localhost:4000/tasks?date=${selectedDate}`);

    const handleComplete = (id) => {
        const updateTasks = tasks.map(task => 
            task.id === id ? {...task, completed: !task.completed} : task
        );
        
        axios.patch(`http://localhost:4000/tasks/${id}`, {
            completed: ! tasks.find(task => task.id === id).completed
        })
        .then(() => {
            setTasks(updateTasks);
            toast.success('Task status updated');
        })
        .catch(err => {
            toast.error('Error updating task');
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            axios.delete(`http://localhost:4000/tasks/${id}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id));
                toast.success('Task deleted');
            })
            .catch(err => {
                toast.error('Error deleting task');
            });
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return ( 
        <div className="container mt-5">
        <div className="row justify-content-center mb-3">
            <div className="col-md-6 text-center">
                    <input 
                        type="date" 
                        className="form-control" 
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>
            </div>
            {tasks && tasks.length > 0 ? (
                <TaskList 
                    tasks={tasks} 
                    title={`All Tasks`}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                />
            ) : (
                <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <div className="alert alert-info text-center">
                        No tasks for this date
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
 
export default Home;