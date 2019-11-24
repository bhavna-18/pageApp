import React from 'react';
import './style.css';
import {loadQuestions} from '../../actions/index'
import { CircularProgress ,Card} from '@material-ui/core';
import {connect} from 'react-redux';
import CustomButton from '../../components/Buttons';
import helper from '../../utilities/helper';
import Result from '../Result/index';
import {incrementQuestionCounter, incrementCorrectCounter,isNextVisible,setButtonValue} from '../../actions/index';
import {bindActionCreators} from 'redux';
import PropTypes from'prop-types';
import Answer from '../../components/Answer'

let appconfig = require('../../appConfig')

class QuizPage extends React.Component{

    constructor(props){
        super(props);
        this.questions = [];
        this.correct_answer = [];
    }

    componentDidMount(){
        this.props.loadQuestions();
    }

    renderQuestions = () =>{
        return(
            <h3 className="questionText">{helper.convertHTMLEntity(this.questions[this.props.counter])}</h3>
        )
    } 

    renderOptions = () =>{
        return (
            <div className="optionsContainer">
               <CustomButton 
                    takeAction={()=>this.checkAnswer("true")} 
                    type={'contained'} 
                    style={{backgroundColor: this.props.isClicked && this.props.buttonValue ==='true' ? (this.correct_answer[this.props.counter].toLowerCase() === 'true'? appconfig.CORRECT_BUTTON_COLOR :appconfig.INCORRECT_BUTTON_COLOR  ): appconfig.BUTTON_PRIMARY,fontSize:'18px',color:appconfig.TEXT_COLOR}} 
                    buttonText={"True"}/>
                <CustomButton 
                    takeAction={()=>this.checkAnswer("false")}
                    type={'contained'} 
                    style={{backgroundColor: this.props.isClicked && this.props.buttonValue ==='false' ? (this.correct_answer[this.props.counter].toLowerCase() === 'false'? appconfig.CORRECT_BUTTON_COLOR : appconfig.INCORRECT_BUTTON_COLOR):appconfig.BUTTON_PRIMARY,fontSize:'18px',color:appconfig.TEXT_COLOR}} 
                    buttonText={"False"}/>
            </div>
        )
    }


    renderSolution(){
        return(
            <div style={{backgroundColor:'yellow'}}>
                <Answer isCorrect= {this.props.correct}/>
            </div>
        )
    }

    checkAnswer = (value) =>{
        this.props.setbuttonValue(value);
        if(!this.props.isDisable){
            if(value === this.correct_answer[this.props.counter]){
                this.props.incrementCorrectAnswer();
            }
            else{
                /**for changing the state */
                this.props.renderShowNext();
            }
        }
        else{
            //do nothing
        }
       
    }

    setValues = () =>{
        let apiData = this.props.fetchQuestions.data;
        if(apiData && apiData.length > 0){
            this.questions = apiData.map(ques =>{
                return ques.question;
            })
            this.correct_answer = apiData.map(ans =>{
                return (ans.correct_answer).toLowerCase();
            })
        }
    }

    renderNextButton = () =>{
        return (
            <div className="nextButtonContainer">
                <CustomButton takeAction={this.nextQuestion} value={"next"} style={defaultButton} type={'contained'} buttonText={'Next'}/>
            </div>
        )
    }

    nextQuestion = () =>{
        this.props.incrementNextQuestion();
    }

    renderNumberQuestions = () =>{
        return (
            <div>
                <h4 className='subHeaderText'>Question {this.props.counter+1} of {this.props.fetchQuestions.data.length}</h4>
            </div>
        )
    }
    
        
    renderQuizPage = () =>{
        if(this.props.counter < this.props.fetchQuestions.data.length){
            return(
                <div>
                    {this.renderNumberQuestions()}
                    {this.renderQuestions()} 
                    {this.renderOptions()}
                    {this.props.isClicked && this.renderSolution()}
                </div>
            )
        }
        else{
            return null;
        }
       
    }

    render(){
        let content = <div></div>
        if(this.props.fetchQuestions.isFetching){
            content = <div className="circularProgress"><CircularProgress color={'secondary'}/></div>
        }
        else if(this.props.fetchQuestions.data !== undefined && this.props.fetchQuestions.data.length > 0){
            content = (
                        <div>
                            <Card className="questionContainer">
                                {this.setValues()}
                                {this.renderQuizPage()}
                                {this.props.counter === this.questions.length && <Result score={this.props.correctCounter}/>}
                                
                            </Card>
                            {/** for getting the value from state */}
                            {this.props.showNextButton && this.renderNextButton()}
                        </div>
                    )
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}


QuizPage.propTypes = {
    loadQuestions: PropTypes.func,
    fetchQuestions: PropTypes.object, 
}


const mapStateToProps = (state) =>{
    console.log("state => ",state)
    return {
       fetchQuestions: state,
       counter: state.count,
       correct: state.isCorrect,
       correctCounter: state.correctCount,
       showNextButton: state.showNext,
       isClicked: state.clicked,
       isDisable: state.disabled,
       buttonValue : state.buttonValue
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators ({
        incrementNextQuestion : incrementQuestionCounter,
        incrementCorrectAnswer: incrementCorrectCounter,
        renderShowNext : isNextVisible,
        loadQuestions: loadQuestions,
        setbuttonValue: setButtonValue
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizPage);

const defaultButton = {
    backgroundColor : appconfig.BUTTON_PRIMARY,
    color:appconfig.TEXT_COLOR,
    fontSize: '18px',
}
