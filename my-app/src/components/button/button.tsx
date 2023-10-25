import React, { useState } from 'react'
import cn from 'classnames';

import './button.css'
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };

const Button:React.FC<ButtonProps> = ({children,className}) => {
    const [count, setCount] = useState(0)
  return (
    <div 
    className={cn(className, "button")}
    onClick={() => setCount((count) => count + 1)}>{children}</div>
  )
}

export default Button

