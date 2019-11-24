import React from 'react';
import './style.css';
import {loadQuestions} from '../../actions/index'
import { CircularProgress ,Card} from '@material-ui/core';
import {connect} from 'react-redux';
import CustomButton from '../../components/Buttons';
import helper from '../../utilities/helper';
import Result from '../Result/index';
import {incrementQuestionCounter, incrementCorrectCounter,isNextVisible} from '../../actions/index';
import {bindActionCreators} from 'redux';


import PropTypes from'prop-types';

class QuizPage extends React.Component{

    constructor(props){
        super(props);
        this.questions = [];
        this.correct_answer = [];
        this.correct_value = "";
        this.createObj={};
    }

    componentDidMount(){
        this.props.loadQuestions();
    }

    renderQuestions = () =>{
        return(
            <h3 className="questionText">{helper.convertHTMLEntity(this.questions[this.props.counter])}</h3>
        )
    } 

    changeStyling = function (val){
        console.log("value is",val);
        console.log("value" ,this.createObj)
        if(this.props.isClicked){
            if(this.createObj.value === this.createObj.correctValue){
                return {
                    backgroundColor: '#40a147',
                    fontSize:'16px',
                    fontWeigth:'bold'
                }
            }
            else{
                return {
                    backgroundColor : '#fc2a0a',
                }
            }
        }
        else{
            return {
                backgroundColor : '#fc8a26',
                color:'black',
                fontSize: '18px',
            }
        }
    }

    renderOptions = () =>{
        return (
            <div className="optionsContainer">
                <CustomButton 
                    takeAction={()=>this.checkAnswer("true")} 
                    type={'contained'} 
                    style={this.props.isCorrect ? correctButton : incorrectButton} 
                    buttonText={"True"}/>
                <CustomButton 
                    takeAction={()=>this.checkAnswer("false")}
                    type={'contained'} 
                    style={this.props.isClicked ? (this.props.correct ? correctButton : incorrectButton) : defaultButton} 
                    // style={this.props.isClicked ? (this.props.correct ? correctButton : incorrectButton) : defaultButton} 
                    buttonText={"False"}/>
            </div>
        )
    }


    checkAnswer (value) {
        if(!this.props.isDisable){
            if(value === this.correct_answer[this.props.counter]){
                this.props.incrementCorrectAnswer();
            }
            else{
                /**for changing the state */
                this.correct_value = "false"
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
            content = <div className="circularProgress"><CircularProgress/></div>
        }
        else if(this.props.fetchQuestions.data !== undefined && this.props.fetchQuestions.data.length > 0){
            content = (
                        <div>
                            <Card className="questionContainer">
                                {this.setValues()}
                                {this.renderQuizPage()}
                                {this.props.counter === this.questions.length && <Result score={this.props.correctCounter+1}/>}
                                
                            </Card>
                            {/** for gettingt the value from state */}
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
    console.log("state=>",state)
    return {
       fetchQuestions: state,
       counter: state.count,
       correct: state.isCorrect,
       correctCounter: state.correctCount,
       showNextButton: state.showNext,
       isClicked: state.clicked,
       isDisable: state.disabled
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators ({
        incrementNextQuestion : incrementQuestionCounter,
        incrementCorrectAnswer: incrementCorrectCounter,
        renderShowNext : isNextVisible,
        loadQuestions: loadQuestions,
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizPage);


const correctButton = {
    backgroundColor: '#40a147',
    fontSize:'16px',
    fontWeigth:'bold'
}

const incorrectButton = {
    backgroundColor : '#fc2a0a',
}

const defaultButton = {
    backgroundColor : '#fc8a26',
    color:'black',
    fontSize: '18px',
}





//2. result page
//3. button clor