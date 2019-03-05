import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Form, Input, Button, Select, Modal, Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import validate from './validate';
import './style.css';

const Option = Select.Option;

const FormItem = Form.Item;

const formItemLayout = {
  // labelCol: {
  //   lg: { span: 22, offset: 1 },
  //   xs: { span: 24 },
  //   sm: { span: 5 }
  // },
  wrapperCol: {
    lg: { span: 23, offset: 0 },
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const renderField = ({ placeholder, input, meta: { error, touched } }) => (
  <FormItem
    {...formItemLayout}
    //label={<label style={{ textAlign: 'left'}}>{placeholder}</label>}
    label={placeholder}
    // hasFeedback
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
    label={placeholder}
    validateStatus={error && touched ? 'error' : 'success'}
    help={error}
  >
    <Select
      style={{ width: 120 }}
      value={input.value.toString()}
      onChange={val => input.onChange(parseInt(val, 10))}
    >
      {options.map(d => (
        <Option key={d.id.toString()}>{d.name}</Option>
      ))}
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
    label={placeholder}
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

// const renderCheckbox = ({ placeholder, input, meta: { error, touched } }) => (
//   <FormItem
//     {...formItemLayout}
//     //label={placeholder}
//     hasFeedback
//     validateStatus={error && touched ? 'error' : 'success'}
//     help={error}
//   >
//     <label htmlFor={input.name}>{placeholder}</label>
//     <Input type="checkbox" {...input} />
//   </FormItem>
// );

const Emp501CreateForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  invalid,
  visible,
  onCancel
}) => (
  <Modal
    title="Create Emp501 Return"
    visible={visible}
    onCancel={onCancel}
    style={{ top: 20, width: 700 }}
    width={700}
    footer={[
      <Button disabled={pristine} key="reset" onClick={reset}>
        Reset
      </Button>,
      <Button key="cancel" onClick={reset && onCancel}>
        Cancel
      </Button>,
      <Button
        key="upload"
        className="upload-start red"
        type="primary"
        onClick={handleSubmit}
        // disabled={this.state.fileList.length === 0}
        // loading={uploading}
      >
        Create EMP501
      </Button>
    ]}
  >
    <Form>
      <Row>
        <Col span={24}>
          <Field
            name="description"
            component={renderField}
            type="text"
            placeholder="Description"
          />
        </Col>
      </Row>{' '}
      <Row>
        <Col span={10}>
          <Field
            name="tradingName"
            component={renderField}
            type="text"
            placeholder="Trading or Other Name"
          />
        </Col>
        <Col span={6}>
          <Field
            name="submitCcc"
            component={renderField}
            type="text"
            placeholder="Submit CCC"
          />
        </Col>{' '}
        <Col span={8}>
          <Field
            name="includeCccs"
            component={renderField}
            type="text"
            placeholder="Include CCC's"
          />
        </Col>
      </Row>{' '}
      <Row>
        <Col span={8}>
          <Field
            name="taxYear"
            component={renderField}
            type="text"
            placeholder="Tax Year"
          />
        </Col>
        <Col span={8}>
          <Field
            name="taxMonth"
            component={renderField}
            type="text"
            placeholder="Tax Month"
          />
        </Col>
        <Col span={8}>
          <Field
            name="period"
            component={renderField}
            type="text"
            placeholder="Emp Period"
          />
        </Col>
      </Row>{' '}
      <Row />
      <Row>
        <Col span={8}>
          <Field
            name="dateFrom"
            component={renderDatePickerField}
            type="text"
            placeholder="Date From"
          />
        </Col>
        <Col span={8}>
          <Field
            name="dateTo"
            component={renderDatePickerField}
            type="text"
            placeholder="Date To"
          />
        </Col>{' '}
        <Col span={8}>
          <Field
            name="testLive"
            component={renderSelectField}
            type="select"
            placeholder="Test/Live"
            options={[
              { id: 'Live', name: 'Live' },
              { id: 'Test', name: 'Test' }
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Field
            name="refPAYE"
            component={renderField}
            type="text"
            placeholder="PAYE Reference"
          />
        </Col>
        <Col span={8}>
          <Field
            name="refSDL"
            component={renderField}
            type="text"
            placeholder="SDL Reference"
          />
        </Col>
        <Col span={8}>
          <Field
            name="refUIF"
            component={renderField}
            type="text"
            placeholder="UIF Reference"
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Field
            name="contactFName"
            component={renderField}
            type="text"
            placeholder="Employer Contact First Name"
          />
        </Col>
        <Col span={12}>
          <Field
            name="contactSName"
            component={renderField}
            type="text"
            placeholder="Employer Contact Surname"
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Field
            name="contactPos"
            component={renderField}
            type="text"
            placeholder="Emp Contact Position"
          />
        </Col>
        <Col span={8}>
          <Field
            name="contactCNumber"
            component={renderField}
            type="text"
            placeholder="Emp Contact Cell"
          />
        </Col>
        <Col span={8}>
          <Field
            name="contactEMail"
            component={renderField}
            type="text"
            placeholder="Emp Contact EMail"
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Field
            name="payrollSWProv"
            component={renderField}
            type="text"
            placeholder="Payroll SW Provider"
          />
        </Col>
        <Col span={8}>
          <Field
            name="payrollSWPkg"
            component={renderField}
            type="text"
            placeholder="Payroll SW Pkg"
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Field
            name="empSIC7"
            component={renderField}
            type="text"
            placeholder="Emp SIC7 Code"
          />
        </Col>
        <Col span={8}>
          <Field
            name="empTradeClas"
            component={renderField}
            type="text"
            placeholder="Emp Trade Clas."
          />
        </Col>
        <Col span={8}>
          <div>
            <label htmlFor="diplomaticImmunity">Diplomatic Immunity</label>
            <div>
              <Field
                name="diplomaticImmunity"
                id="diplomaticImmunity"
                component="input"
                type="checkbox"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Field
            name="empAddrStreetNbr"
            component={renderField}
            type="text"
            placeholder="Str Nbr"
          />
        </Col>
        <Col span={6}>
          <Field
            name="empAddrStreetName"
            component={renderField}
            type="text"
            placeholder="Street Name"
          />
        </Col>
        <Col span={6}>
          <Field
            name="empAddrTown"
            component={renderField}
            type="text"
            placeholder="Town Name"
          />
        </Col>
        <Col span={4}>
          <Field
            name="empAddrPCode"
            component={renderField}
            type="text"
            placeholder="P Code"
          />
        </Col>
        <Col span={4}>
          <Field
            name="empAddrCCode"
            component={renderField}
            type="text"
            placeholder="C Code"
          />
        </Col>
      </Row>
    </Form>
  </Modal>
);

export default reduxForm({
  form: 'emp501CreateForm', // a unique identifier for this form
  enableReinitialize: true,
  validate
})(Emp501CreateForm);
