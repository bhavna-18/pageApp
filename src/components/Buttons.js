import React from 'react';
import {Button} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      secondary: {
          main: '#fc8a26',
        },
        primary :{
            main: '#fc8a26',
        }
      }
    },
  )

const CustomButton = (props) =>{
    
    function handleClick(){
        props.takeAction();
    }

    let buttonStyle = props.style!==undefined ? props.style : button;

    return(
        <MuiThemeProvider theme={theme}>
            <Button 
                variant={props.type} 
                color={props.color}
                size="medium"
                style={buttonStyle}
                value={props.buttonText.toLowerCase()}
                onClick={handleClick}> 
                {props.buttonText}
            </Button>
        </MuiThemeProvider>
    )
}


export default CustomButton;

const button = {
    fontSize: '17px',
    fontWeight: 'bold'
}