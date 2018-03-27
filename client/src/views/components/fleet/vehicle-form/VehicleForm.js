import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import moment from 'moment';
import validate from './validate';
import './style.css';

import { Form, Input, Button, Row, Col, DatePicker, Select } from 'antd';

const Option = Select.Option;

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const renderField = ({ placeholder, input, meta: { error, touched } }) => (
  <FormItem
    {...formItemLayout}
    label={placeholder}
    hasFeedback
    validateStatus={error && touched ? 'error' : 'success'}
    help={error}
  >
    <Input {...input} />
  </FormItem>
);

const renderSelectField = ({
  placeholder,
  input,
  options,
  field,
  meta: { error, touched }
}) => (
  <FormItem
    {...formItemLayout}
    // label={placeholder}
    validateStatus={error && touched ? 'error' : 'success'}
    help={error}
  >
    <Select
      style={{ width: 120 }}
      value={input.value.toString()}
      onChange={val => input.onChange(parseInt(val, 10))}
    >
      {options.map(d => <Option key={d.id.toString()}>{d.name}</Option>)}
    </Select>
  </FormItem>
);

const renderDatePickerField = ({
  placeholder,
  input,
  meta: { error, touched }
}) => (
  <FormItem
    {...formItemLayout}
    // label={placeholder}
    validateStatus={error && touched ? 'error' : 'success'}
    help={error}
  >
    <DatePicker
      style={{ width: 130 }}
      value={input.value ? moment(input.value) : null}
      onChange={date => input.onChange(date ? date.format('YYYY-MM-DD') : null)}
      dateForm="YYYY-MM-DD"
    />
  </FormItem>
);

const renderCCGFieldArray = ({
  fields,
  costCentreGroups,
  meta: { error, submitFailed }
}) => (
  <div>
    <Row>
      <Button
        onClick={() => fields.push({})}
        type="primary"
        icon="plus-circle-o"
        ghost={true}
      />
    </Row>
    {error && (
      <Row style={{ marginTop: 10 }}>
        <span style={{ color: 'red' }}>{error}</span>
      </Row>
    )}
    <Row style={{ marginTop: 10, marginBottom: 0 }}>
      <Col span={11}>
        <p style={{ marginBottom: 0 }}>Cost Centre Group:</p>
      </Col>
      <Col span={11}>
        <p style={{ marginBottom: 0 }}>Start Date:</p>
      </Col>
    </Row>
    {fields.map((ccg, index) => (
      <Row key={index}>
        <Col span={11}>
          <Field
            name={`${ccg}.cost_centre_group_id`}
            component={renderSelectField}
            options={costCentreGroups}
            placeholder="cost centre group"
            type="Number"
          >
            {costCentreGroups.map(d => (
              <option key={`${d.id}`}>{d.name}</option>
            ))}
          </Field>
        </Col>
        <Col span={11}>
          <Field
            name={`${ccg}.start_date`}
            placeholder="start date"
            component={renderDatePickerField}
            type="Date"
          />
        </Col>
        <Col span={2}>
          <Button
            onClick={() => fields.remove(index)}
            shape="circle"
            type="danger"
            icon="delete"
            ghost={true}
          />
        </Col>
      </Row>
    ))}
    {/*<li>*/}
    {/*/!*<pre>{JSON.stringify(fields.getAll(), null, 4)}</pre>*!/*/}
    {/*</li>*/}
  </div>
);

const VehicleForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    invalid,
    costCentreGroups
  } = props;
  return (
    <Form>
      <Row>
        <Col span={12}>
          {/*<pre>{JSON.stringify(props.initialValues, null, 4)}</pre>*/}
          <FieldArray
            name="cost_centre_groups"
            component={renderCCGFieldArray}
            placeholder="cost centre group"
            costCentreGroups={costCentreGroups}
          />
        </Col>
        <Col span={12}>
          <Field
            name="name"
            component={renderField}
            type="text"
            placeholder="Vehicle Name"
          />
          <Field
            name="registration"
            component={renderField}
            type="text"
            placeholder="Registration"
          />
          <Field
            name="make"
            component={renderField}
            type="text"
            placeholder="Make"
          />
          <Field
            name="model"
            component={renderField}
            type="text"
            placeholder="Model"
          />
          <Field
            name="year"
            component={renderField}
            type="text"
            placeholder="Registration Year"
          />
        </Col>
      </Row>
      <Row>
        <Button
          onClick={handleSubmit}
          disabled={pristine || submitting || invalid}
        >
          Submit
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </Row>
    </Form>
  );
};

export default reduxForm({
  // form: 'vehicleForm', // a unique identifier for this form
  enableReinitialize: true,
  validate
})(VehicleForm);
