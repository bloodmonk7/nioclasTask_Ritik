import React, { useEffect, useState } from 'react';
import './Question.css';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

function Question() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [linkValue, setLinkValue] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const linkToQuestion = [
      'AreaUnderTheCurve_901',
      'BinomialTheorem_901',
      'DifferentialCalculus2_901',
    ];
    const getData = async () => {
      try {
        const response = await fetch(
          `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${linkToQuestion[linkValue]}`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [linkValue]);

  function minusQuestion() {
    setLinkValue((changeIndex) => changeIndex - 1);
  }
  function plusQuestion() {
    setLinkValue((changeIndex) => changeIndex + 1);
  }

  return (
    <MathJaxContext>
      <div>
        <h1>Answer the question given below: </h1>
        {loading && <div> A moment please, We are loading... </div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <ul>
          {data &&
            data.map(({ QuestionID, Question }) => (
              <li key={QuestionID}>
                <MathJax>{Question}</MathJax>
              </li>
            ))}
        </ul>
        <div className="buttons">
          <button
            className="btns"
            id="prev"
            disabled={linkValue === 0}
            onClick={minusQuestion}
          >
            ⏮️
          </button>
        </div>
        <div className="buttons">
          <button
            id="next"
            className="btns"
            disabled={linkValue === 2}
            onClick={plusQuestion}
          >
            ⏭️
          </button>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default Question;
