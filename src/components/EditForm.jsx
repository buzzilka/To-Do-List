/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const EditForm = ({ edit, task }) => {
    const [value, setValue] = useState(task.text);

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    const handleEdit = () => {
        if (value.trim()) {
            edit(task.id, value);
        }
    };

    return (
        <div className='flex flex-1 items-center my-3 bg-gray-200 rounded'>
            <input
                value={value}
                onChange={handleInputChange}
                className='bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder:text-slate-600'
                type="text"
                placeholder='Редактировать задачу...'
            />
            <button
                onClick={handleEdit}
                className='border-none rounded bg-green-500 w-32 h-12 text-white text-large font-medium cursor-pointer active:bg-green-600'
            >
                Сохранить
            </button>
        </div>
    );
};

export default EditForm;
