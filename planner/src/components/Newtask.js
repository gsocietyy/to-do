import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

function NewTask() {
  const [data, setData] = useState({
    task: '',
    date: '', // Default to today's date
    description: '',
    priority: 'medium',
    completed: false
  });

  const history = useHistory();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.task.trim() || !data.date.trim()) {
      toast.error('Task and date are required', {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }   

    axios.post('http://localhost:4000/tasks', data)
    .then(res => {
      toast.success('Task added successfully', {
        position: "top-right",  
        autoClose: 3000
      });
      history.push('/');
    })
    .catch(err => {
      toast.error('Error adding task', {
        position: "top-right",  
        autoClose: 3000
      });
    });
  }

  return (
    <div className="container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 w-50 mx-auto">
          <Form.Label className="text-start w-100">Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            name="task"
            value={data.task}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 w-50 mx-auto">
          <Form.Label className="text-start w-100">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 w-50 mx-auto">
          <Form.Label className="text-start w-100">Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={data.date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 w-50 mx-auto">
          <Form.Label className="text-start w-100">Priority</Form.Label>
          <Form.Control
            as="select"
            name="priority"
            value={data.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Control>
        </Form.Group>

        <div className="w-50 mx-auto text-start">
          <Button variant="primary" size="lg" type="submit">
            Add Task
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default NewTask;