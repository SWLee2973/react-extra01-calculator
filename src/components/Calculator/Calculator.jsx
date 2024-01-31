import { useState } from 'react'
import classes from './Calculator.module.css'
import { Button } from '..';

const INIT_CALCULATOR_VALUE = {
  prev: 0,
  current: 0,
  operator: '',
}

function Calculator() {
  const [data, updateData] = useState(INIT_CALCULATOR_VALUE);

  const handleNumber = (target) => {
    if(typeof target === 'number' && target != 0) {
      updateData({
        ...data,
        current: parseFloat(''+data.current + target)
      });
      return;
    }

    if(
        (target === '.' && (''+data.current).indexOf('.') == -1) ||
        (target === 0 && (''+data.current)[0] != 0)
      ) {
      updateData({
        ...data,
        current: ''+data.current + target
      });
      return;
    }    

    if(target === 'rotate') {
      updateData({
        ...data,
        current: -1 * data.current
      })
      return;
    }
  }

  const handleOperator = (target) => {
    const [prev, current] = [parseFloat(data.prev), parseFloat(data.current)]
    if(target === 'backspace') {
      updateData({
        ...data,
        current: (''+current).slice(0, -1)
      });
      return;
    }

    if(target === 'plus') {
      updateData({
        prev: prev === 0 ? current: prev + current,
        current: 0,
        operator: target
      })
      return;
    }

    if(target === 'minus') {
      updateData({
        prev: prev === 0 ? current: prev - current,
        current: 0,
        operator: target
      })
      return;
    }

    if(target === 'calculate') {
      updateData({
        prev: 0,
        current: data.operator === '-' ? prev - current : prev + current,
        operator: ''
      })
    }
  }

  return (
    <div className={classes.Calculator}>
      <span>{data.prev}</span>
      <output className={classes.display}>
        {data.current}
      </output>
      <NumberPad onClickNumber={handleNumber} />
      <OperatorPad onClickOperator={handleOperator}/>
    </div>
  )
}

// 숫자 버튼 렌더링
function NumberPad({ onClickNumber }) {
  const numberList = Array(9).fill(1).map((_, i) => 9 - i);

  return (
    <section className={classes.numberPad}>
      {numberList.map(number => 
        <Button key={number} onClickButton={onClickNumber} name={number}>{number}</Button>  
      )}
      <Button key='.' onClickButton={onClickNumber} name='.'>.</Button>
      <Button key={0} onClickButton={onClickNumber} name={0}>0</Button>
      <Button key='rotate' onClickButton={onClickNumber} name='rotate'>+/-</Button>
    </section>
  )
}

// 기능 버튼 렌더링
function OperatorPad({ onClickOperator }) {
  return (
    <section className={classes.operator}>
      <Button key='backspace' onClickButton={onClickOperator} name='backspace'>Del</Button>
      <Button key='minus' onClickButton={onClickOperator} name='minus'>-</Button>
      <Button key='plus' onClickButton={onClickOperator} name='plus'>+</Button>
      <Button key='calculate' onClickButton={onClickOperator} name='calculate'>=</Button>
    </section>
  )
}

export default Calculator
