/*
    Jono : 18 04 09
    PageHeader : Stateless Functional Component
*/

import React from 'react';
const PageHeader = ({ children }) => {
  return (
    <h4
      style={{
        marginBottom: 10,
        color: 'darkslateblue',
        fontStyle: 'italic'
      }}
    >
      {children}
    </h4>
  );
};

export default PageHeader;
