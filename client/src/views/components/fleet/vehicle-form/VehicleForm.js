import React from 'react';
import { Field, reduxForm } from 'redux-form';

import validate from './validate';
import './style.css';

import { Form, Input, Button, Row, Col } from 'antd';

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

const renderField = props => {
  const { error, touched } = props.meta;
  return (
    <FormItem
      {...formItemLayout}
      label={props.placeholder}
      hasFeedback
      validateStatus={error && touched ? 'error' : 'success'}
      help={error}
    >
      <Input {...props.input} />
    </FormItem>
  );
};

const VehicleForm = props => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props;
  return (
    <Form>
      <Row>
        <Col span={12}>
          <pre>{JSON.stringify(props.initialValues, null, 4)}</pre>
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
  form: 'vehicleForm', // a unique identifier for this form
  enableReinitialize: true,
  validate
})(VehicleForm);
