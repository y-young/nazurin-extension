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
        'p-2 border border-slate-300 shadow-sm rounded-md w-2/3 ' +
        'focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 ' +
        'invalid:text-rose-600 invalid:border-rose-500 focus:invalid:border-rose-500 focus:invalid:ring-rose-500' +
        (props.className ?? '')
      }
      {...props}
    />
  );
};

export default Input;
