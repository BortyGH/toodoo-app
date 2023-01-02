import React, {useState} from 'react'
import ToDoForm from '../form/toodoo-form'
import Todo from '../toodoo';

//  ULLOZENE FUNKCIE - VYMAZANIE, UPDATE

const ToDoList = () => {

    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
    // ^ : Matches beginning of input. \s : Matches a single character other than white space. 
    // * : Matches the preceding expression 0 or more times. $ : Matches end of input.
    // test() method tests for a match in a string. If it finds a match, it returns true, otherwise it returns false.
            if(!todo.text || / ^\s*$ /.test(todo.text))
            {
                return;
            }

            const newTodos = [todo, ...todos];

            setTodos(newTodos);
        };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || / ^\s*$ /.test(newValue.text))
        {
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item))) //ak sa item.id rovna todoID tak vrat newValue, ak nie tak item
    };

  

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id) // vyfiiltruj mi todo => kde sa todo.id nerovna id

        setTodos(removeArr);
    }

    const completeTodo = id => {
            let updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    todo.isComplete = !todo.isComplete;
                }
                return todo;
            });
            setTodos(updatedTodos);
        }

        return (
            <div>
            
                <h1>What's the Plan for Today?</h1>

                <ToDoForm onSubmit={addTodo} />

                <Todo 
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                />

            </div>
        );
};
export default ToDoList