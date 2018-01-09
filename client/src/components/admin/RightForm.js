/*
    Jono : 18 01 09
    RightForm : React Class Component
*/
import React from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from 'antd';

class RightForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  constructor() {
    super(...arguments);

    this.state = { rightName: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const rightName = this.state.rightName.trim();
    if (rightName.length) this.props.handleSubmit(rightName);
    this.clearInput();
  }

  clearInput() {
    this.setState({ rightName: '' });
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) this.clearInput();
    if (event.keyCode === 13) this.handleSubmit(event);
  }

  handleChange(event) {
    this.setState({ rightName: event.target.value });
  }
  render() {
    return (
      <div>
        <Input
          size="large"
          placeholder="Add Right"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          value={this.state.rightName}
          addonAfter={
            <Button
              type="primary"
              icon="plus-circle"
              size="small"
              onClick={this.handleSubmit}
              disabled={!this.state.rightName.length}
            >
              add
            </Button>
          }
        />
      </div>
    );
  }
}

export default RightForm;
