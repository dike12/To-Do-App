import "./index.css";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  
  useEffect(() => {
    axios.get('http://localhost:1234/api/todos')
      .then(response => {
        setTodos(response.data)
      });
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const data = { title: newItem };
    axios.post('http://localhost:1234/api/todos', data)
      .then(response => {
        setTodos([...todos, response.data.data]);
        setNewItem("");
      })
      .catch(error => {
        console.error("Error adding todo:", error);
      });
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="frame">
      <h1 className="text-wrapper">todo list</h1>
      <ToDoForm newItem={newItem} setNewItem={setNewItem} addTodo={addTodo}/>
      <ToDoList todos={todos} deleteTodo={deleteTodo}/>
    </div>
  );
};

export default App;
