import { useState } from 'react'
import React from "react"
import WelcomePage from "./WelcomePage"
import QuestionCard from "./QuestionCard"
import Quiz from "./Quiz"

export default function App() {
    
    const [isStarted, toggleStart] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [checked, toggleChecked] = React.useState(false)
    const [rightAnswers, setRightAnswers] = React.useState([])
    const [wrongAnswers, setWrongAnswers] = React.useState([])
    
    React.useEffect(function() {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                const boxes = data.results.map((result, index) => {
                    return {
                        id: index,
                        on: false,
                        question: result.question,
                        correct_answer: result.correct_answer,
                        incorrect_answers: result.incorrect_answers,
                        selectedAnswer: ""
                    }
                })
                setQuestions(boxes)
            })
    }, [])
    
    function selectAnswer(questionId, answer) {
        setQuestions(prevArray => prevArray.map(box => {
            if (box.id === questionId) {
                return {...box, selectedAnswer: answer}
            } else {
                return box
            }
        }))
    }
    
    const questionElements = questions.map(question => {
        let choices = [...question.incorrect_answers, question.correct_answer]
        return (
            <QuestionCard 
                question={question.question}
                questionId={question.id}
                choices={choices}
                selectAnswer={selectAnswer}
                selectedAnswer={question.selectedAnswer}
                rightAnswers={rightAnswers}
                wrongAnswers={wrongAnswers}
            />
        )
    })
    
    function startQuiz() {
        toggleStart(true)
    }
    
    function checkAnswers() {
        toggleChecked(true)
        questions.forEach(box => {
            if (box.selectedAnswer === box.correct_answer && !rightAnswers.includes(box.correct_answer)) {
                    setRightAnswers(prevAnswers => [...prevAnswers, box.correct_answer]) 
                } else {
                    setWrongAnswers(prevAnswers => [...prevAnswers, box.selectedAnswer])
                }
        })
    }
    
    console.log(questions)
    console.log(rightAnswers)
    
    return (
        <main>
            {isStarted ? <Quiz questionElements={questionElements} checkAnswers={checkAnswers} /> : <WelcomePage  toggleStart={toggleStart} />}
            {checked && `You scored ${rightAnswers.length} correct answers`}
        </main>
    )
}


