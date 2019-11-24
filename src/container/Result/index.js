import React from 'react';
import CustomButton from '../../components/Buttons'
let constants = require('./constants');

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
                <span className="scoreCompleteText">{constants.SCORE_TEXT} <span className="scoreText">{this.props.score}/10</span> </span>
                <div className="buttonContainer">
                    <CustomButton takeAction={this.playAgain} type={'contained'} style={buttonStyle} buttonText={"Play Again"}/>
                </div>
            </div>
        )
    }
}

export default Result;

const buttonStyle = {
    backgroundColor:'#fc8a26',
    fontSize:'20px',
    fontWeight:'bold'
}