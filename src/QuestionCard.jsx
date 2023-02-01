import React from "react"

export default function QuestionCard(props) {
    const defStyles = {
        border: "0.5px solid black",
        color: "black",
    }
    
    const selStyles = {
        border: "2px solid blue",
        color: "blue",
    }
    
    const corStyles = {
        border: "2px solid green",
        color: "green"
    }
    
    const wrongStyles = {
        border: "2px solid red",
        color: "red",
    }
    
    const choices = props.choices.map(choice => {
        return (
            <div 
                style={props.rightAnswers.includes(choice) ? corStyles
                : props.wrongAnswers.includes(choice) ? wrongStyles
                : props.selectedAnswer === choice ? selStyles 
                : defStyles } 
                onClick={() => props.selectAnswer(props.questionId, choice)}
                >
                <p>{choice}</p>
            </div>
        )
    })
    

    return (
        <div>
            <p>{props.question}</p>
            {choices}
        </div>
    )
}