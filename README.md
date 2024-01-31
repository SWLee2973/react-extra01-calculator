### 1. 계산기 만들어보기
![계산기 마크업](https://velog.velcdn.com/images/sang2973/post/3bb42638-f8a0-4679-b0fa-eb21bf18f6c6/image.png)

> 1. 계산기 페이지가 열렸을 때 초기값(0)을 display 영역에 표시한다
> 2. 숫자 버튼을 눌렀을 때 초기값에 숫자를 문자열 덧셈해 추가해 준다.
> 3. 연산(+, -) 버튼을 누르면 
>  3-1. 초기값을 이전값에 전달하고 초기값을 0으로 바꾼다.
>  3-2. 이전값과 현재값을 연산한다.
> 4. 연산 버튼을 연달아 누르면 토글해준다.
> 5. del 버튼을 누르면 숫자를 뒷자리부터 지운다.
> 6. +/- 버튼을 누르면 양수/음수로 토글해준다.
> 7. = 버튼을 누르면 이전값과 현재값의 연산을 진행한다.

정도로 분해할 수 있겠다.

이제 오늘 배운 객체를 이용한 상태관리 및 끌어올리기 / 이벤트 전달을 사용해서 구현해보기로 했다.

### 2. 객체를 이용한 상태 관리 - 숫자 클릭
윈도우 OS의 기본 계산기 프로그램 기준으로, 
> 1) 숫자를 클릭하면 숫자 창에 현재(`current`) 숫자를 업데이트 후 보여준다.
> 2) 음/양 변환 버튼(`+/-`)을 누르면 현재 숫자의 음수/양수를 토글한다.
> 3) 소숫점(`.`) 버튼을 누르면 현재 숫자의 마지막 위치에 `.`을 찍는다. 단,  소숫점을 2개 이상 찍으면 안된다.

여기까지의 구현 코드는 다음과 같다.
```js
const INIT_CALCULATOR_VALUE = {
  prev: 0,
  current: 0,
  operator: '',
}

function Calculator() {
  const [data, updateData] = useState(INIT_CALCULATOR_VALUE);

  // 버튼 영역을 클릭했을 때의 기능 제어
  const handleNumber = (target) => {
    // 0이 아닌 숫자 버튼을 눌렀을 경우
    if(typeof target === 'number' && target != 0) {
      updateData({
        ...data,
        current: parseFloat(''+data.current + target)
      });
      return;
    }
    
    // 소숫점 버튼을 눌렀을 경우 - 소숫점 유무 체크
    // 0 버튼을 눌렀을 경우
    // 0 버튼을 다른 숫자와 같이 체크하면 소숫점 이하에서 0이 찍히지 않는다.
    if((target === '.' && 
        (''+data.current).indexOf('.') == -1) ||
        target === 0) {
      updateData({
        ...data,
        current: ''+data.current + target
      });
      return;
    }    

    // 숫자 음수 / 양수 전환 버튼을 눌렀을 경우
    if(target === 'rotate') {
      updateData({
        ...data,
        current: -1 * data.current
      })
      return;
    }
  }
  ...
  return (
      ...
      {/* 넘버 패드 컴포넌트에 넘버 버튼을 클릭했을 때의 이벤트 전달 */}
      <NumberPad onClickNumber={handleNumber} />
      ...
  )
}
```
주석에 써놓은 것과 같이 조건문 분기를 통해 기능을 제어했다.
또한 멘토님께 리뷰 받았던 내용을 토대로 else를 사용하기보단 early return 기법을 사용해 if문을 분기하여 코드 가독성을 높였다.

### 3. 객체를 이용한 상태 관리 - 연산자
여기서도 다시 기능을 상세화 해봤다.
> 1) 연산 버튼(`+`, `-`: `operator`)을 누르면 현재 숫자를 이전(`prev`)에 저장 후 현재값을 0으로 업데이트 후 보여준다.
> 2) 지우기 버튼(`Del`: `backspace`)을 누르면 숫자를 뒤에서부터 지워준다.
> 3) 계산 버튼(`=`)을 누르면 이전값과 현재값을 operator에 맞게 계산해준다.

여기까지 구현하면 기본 계산 기능은 완료가 될 것으로 보인다.
바로 구현해보았다.
```js
const INIT_CALCULATOR_VALUE = {
  prev: 0,
  current: 0,
  operator: '',
}

function Calculator() {
  const [data, updateData] = useState(INIT_CALCULATOR_VALUE);
  ...
  const handleOperator = (target) => {
    // 연산 메소드에선 대상이 항상 숫자다.
    const [prev, current] = [parseFloat(data.prev), parseFloat(data.current)]
    
    // 지우기 버튼을 클릭했을 경우
    if(target === 'backspace') {
      updateData({
        ...data,
        current: (''+current).slice(0, -1)
      });
      return;
    }

    // 더하기 버튼을 클릭했을 경우
    // 이전 값에 현재 값을 더해서 이전값에 저장
    // 현재 값 초기화 및 연산자 확정
    if(target === 'plus') {
      updateData({
        prev: prev === 0 ? current: prev + current,
        current: 0,
        operator: target
      })
      return;
    }
    
    // 빼기 버튼을 클릭했을 경우
    // 이전 값에 현재 값을 빼서 이전값에 저장
    // 현재 값 초기화 및 연산자 확정
    if(target === 'minus') {
      updateData({
        prev: prev === 0 ? current: prev - current,
        current: 0,
        operator: target
      })
      return;
    }

    // 계산 버튼을 클릭했을 경우
    // 이전 값과 현재 값을 확정된 연산자를 통해 계산
    // 이전 값 및 연산자 초기화   
    if(target === 'calculate') {
      updateData({
        prev: 0,
        current: data.operator === '-' ? prev - current : prev + current,
        operator: ''
      })
    }
  }

  return (
    ...
      <OperatorPad onClickOperator={handleOperator}/>
    ...
  )
}
```

![](https://velog.velcdn.com/images/sang2973/post/4cabcf8b-cf84-4f1a-bc08-9526c8b44703/image.gif)

만들어보자 하고 스케폴딩부터 달렸을 때는 후회를 많이 했는데.. 막상 만들어 보니 어렵진 않았지만 계산 방식 구현이 좀 맘에 들진 않긴 하다.

리액트의 상태관리 및 각 컴포넌트에 이벤트를 전달하는 방식을 공부한 것에 의의를 두자.
