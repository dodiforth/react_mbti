import { useState } from 'react'

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
  
  export default Question