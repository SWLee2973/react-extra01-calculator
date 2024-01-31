
import classes from './Button.module.css';


function Button({ 
  onClickButton,
  name,
  children
}) {

  return (
    <button
      type="button"
      onClick={() => onClickButton(name)}
    >
      {children}
    </button>
  )
}

export default Button;