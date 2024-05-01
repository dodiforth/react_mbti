import { useState } from 'react'
import { options, questionsMBTI } from './question'
import './App.css'

function Question({question, options, onAnswer}) {
  const [selectedOption, setSelectedOption] = useState('')

  const handleNextQuestion = () => {
    if (selectedOption == '그렇다.') {
        onAnswer(question.YES)
    } else {
        onAnswer(question.No)
    }
    
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <>
      <div>
        <h2>{question.question}</h2>
        <form>
          {
            options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              </div>
            ))
          }
        </form>
          <br />
          <br />
        <button onClick={handleNextQuestion}>Next</button>

      </div>
      
    </>
  )
}


function App() {
  const [answers, setAnswers] = useState([])
  const [index, setIndex] = useState(0)

  const answerHandler = (answer) => {
    setAnswers([...answers, answer])

    if (index < questionsMBTI.length) {
      setIndex(index + 1)
    } else {
      const mbtiType = calculateMBTIType(answers)
      alert(`당신의 MBTI 결과는: ${mbtiType}`)
      window.location.reload()
    }

  } 

  const calculateMBTIType = (answers) => {
    const dimensionCounts = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };
    answers.forEach((char) => {
      dimensionCounts[char]++;
    });
    // Determine the MBTI type
    const mbtiType = [
      dimensionCounts['E'] > dimensionCounts['I'] ? 'E' : 'I',
      dimensionCounts['S'] > dimensionCounts['N'] ? 'S' : 'N',
      dimensionCounts['T'] > dimensionCounts['F'] ? 'T' : 'F',
      dimensionCounts['J'] > dimensionCounts['P'] ? 'J' : 'P',
    ].join('');
    console.log('answer', answers);
    console.log('Your MBTI Type:', mbtiType);
    return mbtiType;
  }


  return (
    <>
      <div>
        {index <questionsMBTI.length?
        <Question
        question={questionsMBTI[index]}
        options={options[0].options}
        onAnswer={answerHandler}
        />
        : <button onClick={answerHandler}>수고하셨습니다, 결과보기.</button>
        }
      </div>
      
    </>
  )
}

export default App
 