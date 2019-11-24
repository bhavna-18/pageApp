import React from 'react';
import style from './style.css';
import CustomButton from '../../components/Buttons'

class Result extends React.Component{
    constructor(props){
        super(props);
        this.playAgain = this.playAgain.bind(this);
    }

    playAgain(){
        window.location.href='/';
    }

    render(){
        return(
            <div className="resultContainer">
                <span className="scoreCompleteText">Your score is <span className="scoreText">{this.props.score}/10</span> </span>
                <div className="buttonContainer">
                <CustomButton takeAction={this.playAgain} type={'outlined'} color={'primary'} buttonText={"Play Again"}/>
                </div>
            </div>
        )
    }
}

export default Result;