/*
    Jono : 18 05 27
    NewSageBatch : React Class Component
*/
import React from 'react';

import moment from 'moment';

import { Row, Col, DatePicker, Button, Select } from 'antd';
const { MonthPicker } = DatePicker;
const { Option } = Select;

class NewSageBatch extends React.Component {
  state = {
    instruction: 'Update',
    actionDate: moment(),
    taxYear: 2019,
    taxMonth: 3
  };
  render() {
    const { instruction, actionDate, taxYear, taxMonth } = this.state;
    return (
      <Row style={{ marginBottom: 5 }}>
        <Col span={6}>
          <Select
            placeholder="Instruction"
            value={instruction}
            onChange={instruction => this.setState({ instruction })}
            style={{ width: '90%' }}
          >
            {/*<Option key={null} value={null}>*/}
            {/*Select Instruction*/}
            {/*</Option>*/}
            {this.props.sageBatchInstructions.map(i => (
              <Option key={i} value={i}>
                {i}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <DatePicker
            placeholder="Action Date"
            value={actionDate}
            onChange={actionDate => this.setState({ actionDate })}
          />
        </Col>
        <Col span={6}>
          <MonthPicker
            placeholder="Salary Period"
            value={moment()
              .year(taxMonth < 3 ? taxYear : taxYear - 1)
              .month(taxMonth - 1)}
            onChange={date =>
              this.setState({
                taxMonth: date.month() + 1,
                taxYear: date.month() < 2 ? date.year() : date.year() + 1
              })
            }
          />
        </Col>
        <Col span={4} offset={2}>
          <Button
            type="primary"
            ghost={false}
            size="small"
            //shape="circle"
            icon="plus-circle-o"
            onClick={() => this.props.createSageBatch(this.state)}
          >
            Create Batch
          </Button>
        </Col>
      </Row>
    );
  }
}

export default NewSageBatch;
