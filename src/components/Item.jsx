/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import delete_icon from '../assets/delete.png';
import redact_icon from '../assets/redact.png';

const Item = ({ text, id, isComplete, deleteTask, status, edit }) => {
    const [checked, setChecked] = useState(isComplete);

    useEffect(() => {
        const savedState = localStorage.getItem(`isComplete-${id}`);
        if (savedState !== null) {
            setChecked(JSON.parse(savedState));
        }
    }, [id]);

    useEffect(() => {
        localStorage.setItem(`isComplete-${id}`, JSON.stringify(checked));
    }, [checked, id]);

    const handleCheckboxClick = () => {
        setChecked(!checked);
        status(id); 
    };

    return (
        <div className={`flex items-center my-3 py-3 px-3 gap-2 rounded ${checked ? "bg-green-400" : "bg-gray-200 "}`}>
            <div className='flex flex-1 item-center cursor-pointer'>
                <input 
                    onClick={handleCheckboxClick} 
                    type="checkbox" 
                    className='min-w-5 accent-green-600' 
                    checked={checked}
                    readOnly
                />
                <p className={`text-slate-700 ml-4 text-[17px] ${checked ? "line-through" : ""}`}>{text}</p>
            </div>
            <img onClick={() => { deleteTask(id) }} src={delete_icon} className='w-5 cursor-pointer' />
            <img onClick={() => { edit(id) }} src={redact_icon} className='w-5 cursor-pointer' />
        </div>
    );
}

export default Item;