// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
import Item from './Item';
import EditForm from './EditForm';
import save_icon from '../assets/save.png';
import open_icon from '../assets/open.png';

const ToDo = () => {
    const [toDoList, setToDoList] = useState(localStorage.getItem("tasks")? JSON.parse(localStorage.getItem("tasks")) : []);

    const inputRef = useRef();
    const fileInputRef = useRef();

    const openFile = () => {
        fileInputRef.current.click();
    };

    const download = () => {
        let userToDoList = JSON.stringify(toDoList);
        let a = document.createElement("a");
        let file = new Blob([userToDoList], {type: 'application/json'});
        a.href = URL.createObjectURL(file);
        a.download = "MyToDoList.json"; 
        a.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(`Выбран файл: ${file.name}`);
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    setToDoList(data); 
                } catch (error) {
                    alert("Ошибка при чтении файла!😭", error);
                }
            };
            reader.readAsText(file);
        }
    };

    const addTask = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") {
            return null;
        }

        const newTask = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
            isEditing: false,
        };

        setToDoList((prev) => [...prev, newTask]);
        inputRef.current.value = "";
    };

    const deleteTask = (id) => {
        setToDoList((prev) => prev.filter((task) => task.id !== id));
    };

    const status = (id) => {
        setToDoList((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, isComplete: !task.isComplete } : task
            )
        );
    };

    const edit = (id) => {
        setToDoList((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, isEditing: !task.isEditing } : task
            )
        );
    };

    const editTask = (id, newText) => {
        setToDoList((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, text: newText, isEditing: false } : task
            )
        );
    };

    useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(toDoList))
    }, [toDoList])

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded xl overflow-y-auto max-h-[500px] hover:scrollbar-thumb-green-600 active:scrollbar-thumb-green-600 scrollbar scrollbar-thumb-green-500 scrollbar-thumb-rounded '>
            <div className='flex items-center mt-7 gap-2 justify-between'>
                <h1 className='text-3xl font-semibold'> ✅ To-Do List</h1>
                <div className='flex items-center my-2 py-1 gap-1 rounded-xl'>
                    <input
                        type="file"
                        ref={fileInputRef} 
                        className='hidden' 
                        onChange={handleFileChange}
                    />
                    <img 
                        onClick={() => {download()}} 
                        src={save_icon} 
                        className='w-7 cursor-pointer'
                    />
                    <img 
                        onClick={() => {openFile()}} 
                        src={open_icon} 
                        className='w-7 cursor-pointer'
                    />
                </div>
            </div>
            <div className='flex items-center my-4 bg-gray-200 rounded'>
                <input
                    ref={inputRef}
                    className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
                    type="text"
                    placeholder='Что мне нужно сделать...'
                />
                <button
                    onClick={addTask}
                    className='border-none rounded bg-green-500 w-32 h-14 text-white text-large font-medium cursor-pointer active:bg-green-600'>
                    Добавить +
                </button>
            </div>
            <div>
                {toDoList.map((task) =>
                    task.isEditing ? (
                        <EditForm 
                            key={task.id} 
                            edit={editTask} 
                            task={task} 
                        />
                    ) : (
                        <Item
                            key={task.id}
                            text={task.text}
                            id={task.id}
                            isComplete={task.isComplete}
                            deleteTask={deleteTask}
                            status={status}
                            edit={edit}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default ToDo;
