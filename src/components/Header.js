import React from 'react';
let appconfig = require('../appConfig');
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
    border: '4px solid ',
    borderColor: appconfig.HEADER_TEXT_COLOR,
    backgroundColor: appconfig.HEADER_BG_COLOR
  };
  const headerText = {
    color: appconfig.HEADER_TEXT_COLOR,
    textAlign: 'center'
  };
