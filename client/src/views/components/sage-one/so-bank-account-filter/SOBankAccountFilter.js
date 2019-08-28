import React, { Component } from "react";

import { Checkbox } from "antd";

export default class SOBankAccountFilter extends Component {
  state = { activeOnly: true };
  render() {
    return (
      <div style={{ paddingBottom: 5, marginBottom: 5 }}>
        <Checkbox
          checked={this.props.soBankAccountFilter.activeOnly}
          onChange={({ target: { checked: activeOnly } }) =>
            this.props.setSoBankAccountFilter({ activeOnly })
          }
        >
          Active Accounts Only
        </Checkbox>
      </div>
    );
  }
}
