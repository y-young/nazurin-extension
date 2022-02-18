import React from 'react';

const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      className={
        'p-2 border border-slate-300 shadow-sm rounded-md w-2/3 focus:outline-blue-500 \
        invalid:border-red-500 invalid:text-red-500 focus:invalid:outline-red-500' +
        props.className
      }
      {...props}
    />
  );
};

export default Input;
