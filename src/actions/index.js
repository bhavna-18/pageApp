import properties from '../resources/properties'
import {
    FETCHING_QUESTIONS_REQUEST,
    FETCHING_QUESTIONS_SUCCESS,
    FETCHING_QUESTIONS_ERROR,
    INCREMENT_QUESTIONS,
    CORRECT_ANSWER,
    SHOW_NEXT,
    SET_BUTTON_VALUE
  } from './types';

export function incrementQuestionCounter() {
  return ({ type: INCREMENT_QUESTIONS});
}

export function incrementCorrectCounter() {
  return ({ type: CORRECT_ANSWER});
}

export function  isNextVisible() {
   return ({ type: SHOW_NEXT })
}

export const fetchingQuestionsRequest = () => ({
    type: FETCHING_QUESTIONS_REQUEST,
})

export const setButtonValue = (val) =>({
  type: SET_BUTTON_VALUE,
  payload : val
})

export const fetchQuestionsSuccess = (json) =>({
    type: FETCHING_QUESTIONS_SUCCESS,
    payload: json,
})

export const fetchQuestionsError = (error) =>({
    type: FETCHING_QUESTIONS_ERROR,
    payload: error,
})

export function loadQuestions() {
    return (dispatch) => {
      dispatch(fetchingQuestionsRequest());
      return fetchData().then(([response, json]) =>{
        if(response.status === 200){
          dispatch(fetchQuestionsSuccess(json.results))
        }
        else{
          dispatch(fetchQuestionsError(json.error))
        }
      })
    }
  }
  
  function fetchData() {
    const URL = properties.questionUrl;
    return fetch(URL, { method: 'GET'})
       .then( response => Promise.all([response, response.json()]));
  }

  