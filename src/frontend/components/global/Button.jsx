import React from 'react';

export default function Button({
  label = '',
  labelColor = 'white',
  onClick,
  type = 'primary',
  size = 'medium',
  icon: Icon,
  disabled = false,
  className = ''
}) {
  // Construct class names manually
  const buttonClass = `button 
    ${type ? `button--${type}` : ''} 
    ${size ? `button--${size}` : ''} 
    ${labelColor ? `button--label-${labelColor}` : ''} 
    ${disabled ? 'button--disabled' : ''} 
    ${className}`;

  return (
    <button onClick={onClick} className={buttonClass.trim()} disabled={disabled}>
      {Icon && <Icon />}
      {label && <span className="button__label">{label}</span>}
    </button>
  );
}