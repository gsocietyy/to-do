import React from 'react';
import { Button } from 'react-bootstrap';

const TaskList = ({tasks, title, onComplete, onDelete}) => {
    return (
        <div className="container">
            <h2>{title}</h2>
            {tasks.map((task) => (
                <div  className={`preview mb-3 ${task.completed ? 'bg-light' : ''}`} key={task.id}>
                    
                    <div>
                        <h5 style={{textDecoration: task.completed ? 'line-through' : 'none'}}>{task.task}</h5>
                       
                        <p >{task.description}</p>
                      
                        <div className="d-flex justify-content-between align-items-center">
                            <span className={`badge bg-${
                                task.priority === 'high' ? 'danger' : 
                                task.priority === 'medium' ? 'warning' : 'success'
                            }`}>
                                {task.priority} Priority
                            </span>
                            <div>
                                <Button 
                                    variant={task.completed ? 'success' : 'outline-success'}
                                    onClick={() => onComplete(task.id)}
                                    className="me-2"
                                >
                                    {task.completed ? 'Completed' : 'Mark Complete'}
                                </Button>
                                <Button 
                                    variant="danger"
                                    onClick={() => onDelete(task.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;