/*
    Jono : 18 02 12
    FilterInput : React Class Component
*/
import React from 'react';

import { Input, Button } from 'antd';
// const Search = Input.Search;

class FilterInput extends React.Component {
  render() {
    var { filterText, onTextChange } = this.props;
    return (
      <div>
        <Input
          placeholder="search"
          onChange={e => onTextChange(e.target.value)}
          style={{ width: 200 }}
          value={filterText}
          suffix={
            <Button
              style={{
                position: 'absolute',
                top: -12,
                left: -15
              }}
              size="small"
              shape="circle"
              type="danger"
              icon="close"
              onClick={e => onTextChange('')}
            />
          }
        />
      </div>
    );
  }
}

export default FilterInput;
