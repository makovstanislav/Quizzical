import React from "react"

export default function WelcomePage(props) {
    return (
        <div>
            <h1>Quizzical</h1>
            <p>Some description</p> 
            <button onClick={props.toggleStart}>Start</button>
        </div>
    )
}