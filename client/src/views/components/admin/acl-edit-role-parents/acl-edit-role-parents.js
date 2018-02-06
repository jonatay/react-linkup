/*
    Jono : 18 01 19
    AclEditRoleParents : React Class Component
*/
import React from 'react';
import { Input, Col, Button, Row } from 'antd';
const InputGroup = Input.Group;

class AclEditRoleParents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { role: '', parents: '', parents_array: [] };
  }

  handleArrayInputChange(e) {
    let val = e.target.value.split(',');
    this.setState({
      [e.target.placeholder]: val,
      [e.target.placeholder + '_array']: val.filter(n => n !== '')
    });
  }
  handleAddRoleParents() {
    this.props.aclAddRoleParents(this.state.role, this.state.parents_array);
    this.setState({ role: '', parents: '', parents_array: [] });
  }
  handleRemoveRoleParents() {
    this.props.aclRemoveRoleParents(this.state.role, this.state.parents_array);
    this.setState({ role: '', parents: '', parents_array: [] });
  }

  render() {
    return (
      <Row style={{ paddingBottom: 15 }}>
        <Row style={{ lineHeight: 0 }}>
          <Col span={5} style={{ paddingLeft: 5 }}>
            <h5>role to add/remove:</h5>
          </Col>
          <Col span={6} style={{ paddingLeft: 5 }}>
            <h5>[parents]:</h5>
          </Col>
          <Col span={4} style={{ paddingLeft: 5 }} />
          <Col span={7}>
            <p>{'<-'} use comma [,] to delimit lists</p>
          </Col>
        </Row>
        <Row>
          <InputGroup>
            <Col span={5}>
              <Input
                value={this.state.role}
                placeholder="role"
                onChange={e =>
                  this.setState({ ...this.state, role: e.target.value })
                }
              />
            </Col>
            <Col span={6}>
              <Input
                value={this.state.parents}
                placeholder="parents"
                onChange={this.handleArrayInputChange.bind(this)}
              />
            </Col>
            <Col span={4} />
            <Col span={3}>
              <Button
                size="small"
                icon="plus-circle-o"
                onClick={this.handleAddRoleParents.bind(this)}
                type="primary"
                disabled={
                  this.state.role.length === 0 ||
                  this.state.parents_array.length === 0
                }
              >
                add
              </Button>
            </Col>
            <Col span={3}>
              <Button
                size="small"
                icon="minus-circle-o"
                onClick={this.handleRemoveRoleParents.bind(this)}
                type="danger"
                disabled={
                  this.state.role.length === 0 ||
                  this.state.parents_array.length === 0
                }
              >
                remove
              </Button>
            </Col>
          </InputGroup>
        </Row>
      </Row>
    );
  }
}

export default AclEditRoleParents;
