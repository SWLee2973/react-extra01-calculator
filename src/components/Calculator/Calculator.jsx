import { useState } from 'react'
import classes from './Calculator.module.css'
import Button from './../Button/Button';

function Calculator() {
  const [count, setCount] = useState(0)

  return (
    <div className={classes.Calculator}>
      <output className={classes.display}>
        1230
      </output>
      <NumberPad />
      <Operator />

    </div>
  )
}

// 숫자 버튼 렌더링
function NumberPad() {
  const numberList = Array(9).fill(1).map((_, i) => 9 - i);

  return (
    <section className={classes.numberPad}>
      {numberList.map(number => 
        <Button key={number}>{number}</Button>  
      )}
      <Button>.</Button>
      <Button>0</Button>
      <Button>+/-</Button>
    </section>
  )
}

// 기능 버튼 렌더링
function Operator() {
  return (
    <section className={classes.operator}>
      <Button key='backspace'>Del</Button>
      <Button key='minus'>-</Button>
      <Button key='plus'>+</Button>
      <Button key='calculate'>=</Button>
    </section>
  )
}

export default Calculator
