import { useState, useEffect } from 'react';

import Dice from '../../components/Dice/Dice'
import Results from '../../components/Results/Results';
import Confetti from "react-confetti"

import { db, auth } from '../../api/firebase/firebase.api';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

import {nanoid} from "nanoid"

const HomePage = () => {
    function allNewDice() {
        let diceArray = [];
        for (let i = 0; i < 10; i++) {
          diceArray.push({
            value: Math.floor(1 + Math.random()*6),
            isHeld: false,
            id: nanoid()
          })
        }
        return diceArray
      }

      const [dice, setDice] = useState(allNewDice());
      const [movesCounter, setMovesCounter] = useState(0)
      const [tenzies, setTenzies] = useState(false);
      const [resultsShown, setResultsShown] = useState(false);

      const diceContent = dice.map((el) => <Dice isHeld={el.isHeld} key={el.id} id={el.id} value={el.value} holdDice={() => holdDice(el.id)}/>)

      function getNewDice() {
        setMovesCounter(prevCount => prevCount + 1)
        setDice(prevDice => {
          const newDice = prevDice.map((el) => {
            if (el.isHeld) {
              return el
            } else {
              return {
                value: Math.floor(1 + Math.random()*6),
                isHeld: false,
                id: nanoid()
              }
            }
          });
          return newDice
        })
        startNewGame();
      }

      function holdDice(id) {
        setDice(prevDice => {
          const newDice = prevDice.map((el) => {
            if (el.id === id) {
              return {...el, isHeld: !el.isHeld}
            } else return {...el}
          });
          return newDice
        })
      }

      function startNewGame() {
        if (tenzies) {
          setDice(allNewDice());
          setTenzies(false)
          setMovesCounter(0)
        }
      }

      function closeResults() {
        setResultsShown(false)
      }

      useEffect(() => {
        const value = dice[0].value;
        if (dice.every(el => el.isHeld === true)) {
            if (dice.every(el => el.value === value)) {
              async function publishUsersRecord() {
                const userRef = doc(db, "users", auth.currentUser.uid)
                const docSnapshot = await getDoc(userRef);
                const currentRecord = docSnapshot.data().record

                if (!currentRecord || movesCounter < currentRecord) {
                  await updateDoc(userRef, {
                    record: movesCounter
                  })
                }
              }
              // Обновляем запись рекорда для текущего пользователя
              if (auth.currentUser) {
                publishUsersRecord()
              }

              setTenzies(tenzies => !tenzies)
              setResultsShown(resultsShown => !resultsShown);

            }
        }
      }, [dice])

      return (
          <div className='main--layout'>
            {tenzies ? <Confetti width={window.innerWidth}/> : null}
            {resultsShown ? <Results closeResults={closeResults} movesCounter={movesCounter}/> : ""}
            <h1>Tenzies</h1>
            <h3>Бросайте кубики до тех пор, пока все значения не станут одинаковыми. Нажимайте на кубики с тем значением, которое хотите закрепить, между бросками</h3>
            <div className='main--layout-flipboard'>
              {diceContent}
            </div>
            <button className='main--layout-button' onClick={getNewDice}>
              {tenzies ? "Новая игра" : "Бросить"}
            </button >
            <h3>Ходов сделано: {movesCounter}</h3>
          </div>
      )
}

export default HomePage
