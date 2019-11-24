import React from 'react';

const Header = () => {
    return (
        <div style={headerDiv}>
            <h1 style={headerText}>Quiz Bee</h1>
        </div>
    )
}

export default Header;

const headerDiv = {
    marginTop: '30px',
    border: '4px solid #fc8a26',
    backgroundColor:'black'
  };
  const headerText = {
    color:'#fc8a26',
    textAlign: 'center'
  };
