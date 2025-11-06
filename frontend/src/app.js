import React, { useEffect, useState } from 'react';
import { API } from './api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';


export default function App() {
const [todos, setTodos] = useState([]);
const [loading, setLoading] = useState(true);


const fetchTodos = async () => {
try {
const res = await fetch(`${API}`);
const data = await res.json();
setTodos(data);
} catch (err) {
console.error(err);
} finally {
setLoading(false);
}
};


useEffect(() => {
fetchTodos();
}, []);


const addTodo = async (text) => {
const res = await fetch(API, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ text })
});
const newTodo = await res.json();
setTodos(prev => [newTodo, ...prev]);
};


const toggleComplete = async (id, completed) => {
const res = await fetch(`${API}/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ completed: !completed })
});
const updated = await res.json();
setTodos(prev => prev.map(t => t._id === id ? updated : t));
};


const deleteTodo = async (id) => {
await fetch(`${API}/${id}`, { method: 'DELETE' });
setTodos(prev => prev.filter(t => t._id !== id));
};


return (
<div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
<h2>Todo App</h2>
<TodoForm onAdd={addTodo} />
{loading ? <p>Loading...</p> : <TodoList todos={todos} onToggle={toggleComplete} onDelete={deleteTodo} />}
</div>
);
}
