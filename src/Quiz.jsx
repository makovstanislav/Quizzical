import React from "react"

export default function Quiz(props) {
    return(
        <div>
            {props.questionElements}
            <button onClick={props.checkAnswers}>Check</button>
        </div>
    )
}