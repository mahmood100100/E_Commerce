import React from 'react';

export default function Input({ type = 'text', name, id, title, value, onChange , errors ,onBlur ,touched }) {
  return (
    <div className='input-group mb-3'>
      <label className='text-danger me-3' htmlFor={id}>{title}</label>
      <input type={type} name={name} className='form-control' id={id} value={value} onChange={onChange} onBlur={onBlur} />
      {touched[name] && errors[name] && <p className='text text-danger ms-3'>{errors[name]}</p>}
    </div>
  );
}
