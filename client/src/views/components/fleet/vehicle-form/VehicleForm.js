import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

const renderField = props => (
  <FormItem>
    <Input {...props.input} />
    {props.touched && props.error && <span>{props.error}</span>}
  </FormItem>
);

const VehicleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form>
      <div>
        <label>Vehicle Name</label>
        <div>
          <Field
            name="name"
            component={renderField}
            type="text"
            placeholder="Vehicle Name"
          />
        </div>
      </div>
      <div>
        <label>Registration</label>
        <div>
          <Field
            name="registration"
            component={renderField}
            type="text"
            placeholder="Registration"
          />
        </div>
      </div>
      <div>
        <Button onClick={handleSubmit} disabled={pristine || submitting}>
          Submit
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: 'simple' // a unique identifier for this form
})(VehicleForm);
