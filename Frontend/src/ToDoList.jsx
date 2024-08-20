import ToDoItem from "./ToDoItem.jsx";

const ToDoList = ({todos, deleteTodo}) => {
    return (
        <div>
            {todos.map(todo => (
                <ToDoItem key={todo._id} todo={todo} deleteTodo={deleteTodo} />
            ))
            }
        </div>
    );
};

export default ToDoList;