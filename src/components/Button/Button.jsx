
import classes from './Button.module.css';


function Button({ 
  buttonType='number',
  children
}) {

  return (
    <button
      type="button"
    >
      {children}
    </button>
  )
}

export default Button;