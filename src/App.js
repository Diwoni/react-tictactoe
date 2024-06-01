import Board from "./components/Board";
import { useState } from "react";
import './App.css';

function App() {

  const [history, setHistory] = useState([{squares : Array(9).fill(null)}])
  const [xIsNext, setXIsNext] = useState(true); // true 면 'X' false 면 'O'
  const [stepNumber, setStepNumber] = useState(0); // 현재 선택된 히스토리 위치

  const current = history[stepNumber] // 현재 히스토리 상태 값 선택

  /* Click 했을 때 state 변경 처리 메소드 */
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1); // 복사
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();

    // 게임이 끝나거나, 이미 선택된 스퀘어라면 return 으로 막기
    if(calcaulateWinner(newSquares) || newSquares[i]){
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O'; // Board i 위치 값
    setHistory([...newHistory,{squares : newSquares}]) // 기존 히스토리 복사 후 뒤에 추가
    setXIsNext(prev => !prev); // X -> O 

    setStepNumber(newHistory.length);
    // setXIsNext(prev => !prev); prev 쓰고 안쓰고 차이
  }

  const moves = history.map((step,move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button className="move-button" onClick={() => jumpto(move)}>{desc}</button>
      </li>
    )
  })

  const jumpto = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0); // 짝수일 때, true
  }
  
  const calcaulateWinner = (squares) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let i =0; i<lines.length; i++) {
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calcaulateWinner(current.squares)

  let status;
  if(winner){
    status = `Winner : ${winner}`
  }else{
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }
  
  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
