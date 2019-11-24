import {
    FETCHING_QUESTIONS_REQUEST,
    FETCHING_QUESTIONS_SUCCESS,
    FETCHING_QUESTIONS_ERROR,
    INCREMENT_QUESTIONS,
    CORRECT_ANSWER,
    SHOW_NEXT,
} from '../actions/types';

const intialState = {
    isFetching: false,
    data:[],
    errorMessage:"",
    count:0,
    isCorrect:false,
    showNext:false,
    clicked: false,
    correctCount: 0,
}

/**
* 
*  change the state over here,action taken to re-render
*/
const quizPageReducer = (state=intialState,action) => {
    switch(action.type){
        case FETCHING_QUESTIONS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCHING_QUESTIONS_ERROR:
            return {
                ...state,
                errorMessage:action.payload,
                isFetching: false
            }
        case FETCHING_QUESTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data:action.payload,
                count: state.count!==undefined ? state.count : state.state.count,
            }
        case INCREMENT_QUESTIONS:
            return {
                ...state,
               count: state.count+1,
               showNext: false,
               isCorrect: false,
               clicked: false,
               disabled:false
            }
        case CORRECT_ANSWER: 
            return{
                ...state,
                isCorrect: true,
                correctCount: state.correctCount!==undefined ? state.correctCount+1 : state.state.correctCount+1,
                showNext: true,
                clicked: true,
                disabled: true
            }
        case SHOW_NEXT:
            return {
                ...state,
                showNext: true,
                clicked: true,
                disabled: true
            }
        default:
            return{
                state
            }
        }
    }

export default quizPageReducer

