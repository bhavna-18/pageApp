import React from 'react';
import './style.css';
import CustomButton from '../../components/Buttons';

let constants = require('./constants');

export default class Welcome extends React.Component{

    startQuizAction =() =>{
        window.location.href='/quiz'
    }

    render(){
        return (
            <div className="welcomeContainer">
                <div className="headingContainer">
                    <p className="headingText">{constants.HEADING_TEXT}</p>
                </div>
                <div className="instructionsContainer">
                    <p className="instructionsContainerText">{constants.INSTRUCTIONS_TEXT}</p>
                </div>
                <div className="buttonContainer">
                    <CustomButton color={"primary"} type={"contained"} takeAction={this.startQuizAction} buttonText={"Start Quiz"}/>
                </div>
            </div>
        )
    }
}
