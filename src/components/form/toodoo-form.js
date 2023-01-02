import React, { useState, useEffect, useRef } from 'react';
import { Fragment } from 'react';

//  INPUT, BUTTON

const ToDoForm = (props) => {
    const [input, setInput] = useState( props.edit ? props.edit.value : '' ); //je to kvoli separatnemu inputu pri update hodnoty = aby value zostala aj pri prepise updateu
                                                                             //v '' je hodnota ktora je inpute 'text'

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = event => {
        setInput(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault(); // keby to tu nie je, neustale by sa renderovalo

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });

        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
        
            {props.edit ? (
                <Fragment>

                    <input
                        placeholder='Update your item'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        ref={inputRef} //je to k tomu, aby se pri spusteni komponenty ToDoForm zvolil zvoleny ref jako aktivni, 
                                       //teda, aby jsi mel aktivni kurzor v tom inputu a mohl do nej hned psát
                        className='todo-input edit'
                    />
                    <button onClick={handleSubmit} className='todo-button edit'>
                        UPDATE
                    </button>

                </Fragment>
            ) : (
                <Fragment>

                    <input
                        placeholder='Add to do'
                        value={input}           //value input je text ktory zadame a nahodi sa
                        onChange={handleChange}
                        name='text'
                        className='todo-input'
                        ref={inputRef}
                    />
                    <button onClick={handleSubmit} className='todo-button'>
                        Add
                    </button>

                </Fragment>
            )}

        </form>
      );
    }

    export default ToDoForm