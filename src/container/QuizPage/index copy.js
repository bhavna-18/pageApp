import React from 'react';
import style from './style.css';
import {loadQuestions} from '../../actions/index'
import { CircularProgress ,Card} from '@material-ui/core';
import {connect} from 'react-redux';
import CustomButton from '../../components/Buttons';
import helper from '../../utilities/helper';
import Result from '../Result/index'

import PropTypes from'prop-types';

class QuizPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showNext : false,
            correct: 0
        }
        this.questions = [];
        this.correct_answer = [];
        this.counter = 0;
    }

    componentDidMount(){
        this.props.loadQuestions();
    }

    renderQuestions = () =>{
        return(
            <h3 className="questionText">{this.questions[this.counter]}</h3>
        )
    }

    renderOptions = () =>{
        return (
            <div className="optionsContainer">
                <CustomButton takeAction={()=>this.checkAnswer("true")} type={'outlined'} color={this.state.isCorrect ? 'primary' :'secondary'} text={'True'} buttonText={"True"}/>
                <CustomButton takeAction={()=>this.checkAnswer("false")}type={'outlined'} color={this.state.isCorrect ? 'primary' :'secondary'} text={'false'} buttonText={"False"}/>
            </div>
        )
    }

    checkAnswer (value) {
        if(value === this.correct_answer[this.counter]){
            //change the color of the button
            this.setState({isCorrect:true,correct: this.state.correct+1})
        }
        this.setState({
            showNext : true
        })
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
            <CustomButton takeAction={this.showNextQuestion} value={"next"} color={'primary'} type={'outlined'} buttonText={'Next'}/>
        )
    }

    showNextQuestion = () =>{
        this.counter ++;
        this.setState({
            showNext : false,
            isCorrect: false
        })
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
                                {/* {this.counter >= this.questions.length &&  */}
                                    {this.renderQuestions()} 
                                    {this.renderOptions()}
                                {/* } */}
                                {this.counter === this.questions.length && <Result score={this.state.correct+1}/>}
                                
                            </Card>
                            {this.state.showNext && this.renderNextButton()}
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
    return {
        fetchQuestions: state
    }
}

export default connect(mapStateToProps,{loadQuestions})(QuizPage);
