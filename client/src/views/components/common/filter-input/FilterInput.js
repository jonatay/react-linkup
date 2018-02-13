/*
    Jono : 18 02 12
    FilterInput : React Class Component
*/
import React from 'react';

import { Input } from 'antd';
const Search = Input.Search;

class FilterInput extends React.Component {
  render() {
    const { filterText, onTextChange } = this.props;
    return (
      <div>
        <Search
          placeholder="search"
          onChange={e => onTextChange(e.target.value)}
          style={{ width: 200 }}
          value={filterText}
        />
      </div>
    );
  }
}

export default FilterInput;
