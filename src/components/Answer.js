import React from 'react';
let appconfig = require('../appConfig');

const Answer = (props) => {
    let text = props.isCorrect ? 'Good Work!' : 'Oops! Your answer is incorrect.'

    return (
        <div style={answerContainer}>
            <h3 style={{fontSize:'16px',paddingTop:'5px',textAlign:'center',color:props.isCorrect ? appconfig.CORRECT_BUTTON_COLOR : appconfig.INCORRECT_BUTTON_COLOR }}>{text}</h3>
        </div>
    )
}

export default Answer;

const answerContainer = {
    marginTop: '30px',
    height:'30px',
    justifyContent:'center',
    backgroundColor: appconfig.ANSWER_BG_COLOR
  };
