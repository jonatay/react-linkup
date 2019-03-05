/*
    Jono : 19 02 25
    Emp501Detail : React Class Component
*/
import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import {
  Collapse,
  Form,
  Input,
  // Button,
  // Select,
  Row,
  Col,
  // DatePicker,
  Tag
} from 'antd';
// import moment from 'moment';
import validate from './validate';
import './style.css';

const Panel = Collapse.Panel;
// const Option = Select.Option;

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

const renderField = ({
  placeholder,
  input,
  description,
  meta: { error, touched }
}) => (
  <FormItem
    {...formItemLayout}
    //label={<label style={{ textAlign: 'left'}}>{placeholder}</label>}
    label={placeholder}
    hasFeedback={error ? true : false}
    validateStatus={error && touched ? 'error' : 'success'}
    help={error}
  >
    <Input {...input} />
    {description ? <Tag color="blue">{description}</Tag> : null}
  </FormItem>
);

// const renderSelectField = ({
//                              placeholder,
//                              input,
//                              options,
//                              field,
//                              meta: { error, touched }
//                            }) => (
//   <FormItem
//     {...formItemLayout}
//     label={placeholder}
//     validateStatus={error && touched ? 'error' : 'success'}
//     help={error}
//   >
//     <Select
//       style={{ width: 120 }}
//       value={input.value.toString()}
//       onChange={val => input.onChange(parseInt(val, 10))}
//     >
//       {options.map(d => (
//         <Option key={d.id.toString()}>{d.name}</Option>
//       ))}
//     </Select>
//   </FormItem>
// );
//
// const renderDatePickerField = ({
//                                  placeholder,
//                                  input,
//                                  meta: { error, touched }
//                                }) => (
//   <FormItem
//     {...formItemLayout}
//     label={placeholder}
//     validateStatus={error && touched ? 'error' : 'success'}
//     help={error}
//   >
//     <DatePicker
//       style={{ width: 130 }}
//       value={input.value ? moment(input.value) : null}
//       onChange={date => input.onChange(date ? date.format('YYYY-MM-DD') : null)}
//       dateForm="YYYY-MM-DD"
//     />
//   </FormItem>
// );

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

const PanelHeader = props => (
  <span style={{ width: '100%' }}>
    <h4
      style={{
        color: 'blue',
        backgroundColor: 'lightblue',
        paddingLeft: 20
      }}
    >
      {props.children}
    </h4>
  </span>
);

const renderEmpDetails = ({ fields }) =>
  fields.map((eD, idx) => (
    <Collapse key={idx} defaultActiveKey={['certInfo']}>
      <Panel
        key="certInfo"
        header={<PanelHeader>Certificate Information</PanelHeader>}
      >
        <Row>
          <Col span={7}>
            <Field
              name={`${eD}.empEmployeeData.3010`}
              component={renderField}
              type="text"
              placeholder="3010"
              description="Certificate Number"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3015`}
              component={renderField}
              type="text"
              placeholder="3015"
              description="Certificate Type"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3020`}
              component={renderField}
              type="text"
              placeholder="3020"
              description="Person Nature"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3025`}
              component={renderField}
              type="text"
              placeholder="3025"
              description="Assessment Year"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3026`}
              component={renderField}
              type="text"
              placeholder="3026"
              description="ETI Indicator"
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <Field
              name={`${eD}.empEmployeeData.3030`}
              component={renderField}
              type="text"
              placeholder="3030"
              description="Emp Surname"
            />
          </Col>
          <Col span={5}>
            <Field
              name={`${eD}.empEmployeeData.3040`}
              component={renderField}
              type="text"
              placeholder="3040"
              description="Emp First Names"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3050`}
              component={renderField}
              type="text"
              placeholder="3050"
              description="Initials"
            />
          </Col>
          <Col span={4}>
            <Field
              name={`${eD}.empEmployeeData.3060`}
              component={renderField}
              type="text"
              placeholder="3060"
              description="ID Number"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3080`}
              component={renderField}
              type="text"
              placeholder="3080"
              description="Date Of Birth"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3100`}
              component={renderField}
              type="text"
              placeholder="3100"
              description="Income Tax Ref."
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3263`}
              component={renderField}
              type="text"
              placeholder="3263"
              description="SIC7 Code"
            />
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3136`}
              component={renderField}
              type="text"
              placeholder="3136"
              description="Empl Tel Nbr"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3138`}
              component={renderField}
              type="text"
              placeholder="3138"
              description="Cell Nbr"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3146`}
              component={renderField}
              type="text"
              placeholder="3146"
              description="EA St Nbr"
            />
          </Col>{' '}
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3147`}
              component={renderField}
              type="text"
              placeholder="3147"
              description="EA Street"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3149`}
              component={renderField}
              type="text"
              placeholder="3149"
              description="EA Town"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3150`}
              component={renderField}
              type="text"
              placeholder="3150"
              description="EA PCode"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3151`}
              component={renderField}
              type="text"
              placeholder="3151"
              description="EA CCode"
            />
          </Col>
        </Row>
        <Row>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3160`}
              component={renderField}
              type="text"
              placeholder="3160"
              description="Emp number"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3170`}
              component={renderField}
              type="text"
              placeholder="3170"
              description="Cert Start"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3180`}
              component={renderField}
              type="text"
              placeholder="3180"
              description="Cert End"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3190`}
              component={renderField}
              type="text"
              placeholder="3190"
              description="ETI Start"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3200`}
              component={renderField}
              type="text"
              placeholder="3200"
              description="Mths Tot"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3210`}
              component={renderField}
              type="text"
              placeholder="3210"
              description="Mths Worked"
            />
          </Col>
        </Row>
        {/*emp Addr*/}
        <Row>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3213`}
              component={renderField}
              type="text"
              placeholder="3213"
              description="Emp St Nbr"
            />
          </Col>{' '}
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3214`}
              component={renderField}
              type="text"
              placeholder="3214"
              description="Emp Street"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3216`}
              component={renderField}
              type="text"
              placeholder="3216"
              description="Emp Town"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3217`}
              component={renderField}
              type="text"
              placeholder="3217"
              description="Emp PCode"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3285`}
              component={renderField}
              type="text"
              placeholder="3285"
              description="Emp CCode"
            />
          </Col>
          <Col span={1}>
            <Field
              name={`${eD}.empEmployeeData.3279`}
              component={renderField}
              type="text"
              placeholder="3279"
              description="co"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3283`}
              component={renderField}
              type="text"
              placeholder="3283"
              description="co Intemediary"
            />
          </Col>
          <Col span={1}>
            <Field
              name={`${eD}.empEmployeeData.3288`}
              component={renderField}
              type="text"
              placeholder="3288"
              description="PO S"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3249`}
              component={renderField}
              type="text"
              placeholder="3249"
              description="PO ?"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3262`}
              component={renderField}
              type="text"
              placeholder="3262"
              description="PO N"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3253`}
              component={renderField}
              type="text"
              placeholder="3253"
              description="PO T"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3254`}
              component={renderField}
              type="text"
              placeholder="3254"
              description="PO C"
            />
          </Col>
          <Col span={1}>
            <Field
              name={`${eD}.empEmployeeData.3286`}
              component={renderField}
              type="text"
              placeholder="3286"
              description="PO C"
            />
          </Col>
        </Row>
        <Row>
          <Col span={1}>
            <Field
              name={`${eD}.empEmployeeData.3240`}
              component={renderField}
              type="text"
              placeholder="3240"
              description="BAccT"
            />
          </Col>
          <Col span={3}>
            <Field
              name={`${eD}.empEmployeeData.3241`}
              component={renderField}
              type="text"
              placeholder="3241"
              description="BAcc Nbr"
            />
          </Col>
          <Col span={2}>
            <Field
              name={`${eD}.empEmployeeData.3242`}
              component={renderField}
              type="text"
              placeholder="3242"
              description="Br Nbr"
            />
          </Col>
          <Col span={4}>
            <Field
              name={`${eD}.empEmployeeData.3245`}
              component={renderField}
              type="text"
              placeholder="3245"
              description="BAcc Holder"
            />
          </Col>
          <Col span={1}>
            <Field
              name={`${eD}.empEmployeeData.3246`}
              component={renderField}
              type="text"
              placeholder="3246"
              description="HoRel"
            />
          </Col>
        </Row>
      </Panel>
    </Collapse>
  ));

const Emp501DetailForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  invalid,
  visible,
  onCancel
}) => (
  <Form>
    <Collapse
      // accordion
      bordered={false}
      defaultActiveKey={['detailRows']}
    >
      <Panel header={<PanelHeader>Header</PanelHeader>} key="header">
        <Row>
          <Col span={5}>
            <Field
              name="empHeader.2010"
              component={renderField}
              type="text"
              placeholder="2010"
              description="Trading or Other Name"
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2015"
              component={renderField}
              type="text"
              placeholder="2015"
              description="TEST / LIVE"
            />
          </Col>
          <Col span={4}>
            <Field
              name="empHeader.2020"
              component={renderField}
              type="text"
              placeholder="2020"
              description="PAYE Reference"
            />
          </Col>
          <Col span={4}>
            <Field
              name="empHeader.2022"
              component={renderField}
              type="text"
              placeholder="2022"
              description="SDL Reference"
            />
          </Col>
          <Col span={4}>
            <Field
              name="empHeader.2024"
              component={renderField}
              type="text"
              placeholder="2024"
              description="UIF Reference"
            />
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Field
              name="empHeader.2025"
              component={renderField}
              type="text"
              placeholder="2025"
              description="ECP: First Name"
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2036"
              component={renderField}
              type="text"
              placeholder="2036"
              description="ECP: Surname"
            />
          </Col>{' '}
          <Col span={3}>
            <Field
              name="empHeader.2038"
              component={renderField}
              type="text"
              placeholder="2038"
              description="ECP: Position"
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2040"
              component={renderField}
              type="text"
              placeholder="2040"
              description="ECP: Cell No."
            />
          </Col>
          <Col span={5}>
            <Field
              name="empHeader.2027"
              component={renderField}
              type="text"
              placeholder="2027"
              description="ECP: E-mail address"
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2028"
              component={renderField}
              type="text"
              placeholder="2028"
              description="Payroll SW Prov."
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2029"
              component={renderField}
              type="text"
              placeholder="2029"
              description="Payroll SW Pkg."
            />
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Field
              name="empHeader.2030"
              component={renderField}
              type="text"
              placeholder="2030"
              description="Tran Yr"
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2031"
              component={renderField}
              type="text"
              placeholder="2031"
              description="Recon Per."
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2082"
              component={renderField}
              type="text"
              placeholder="2082"
              description="Emp SIC7"
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2035"
              component={renderField}
              type="text"
              placeholder="2035"
              description="Emp TradeC"
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2037"
              component={renderField}
              type="text"
              placeholder="2037"
              description="Dipl. Immune."
            />
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Field
              name="empHeader.2063"
              component={renderField}
              type="text"
              placeholder="2063"
              description="EA St Nbr"
            />
          </Col>{' '}
          <Col span={3}>
            <Field
              name="empHeader.2064"
              component={renderField}
              type="text"
              placeholder="2064"
              description="EA Street"
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2066"
              component={renderField}
              type="text"
              placeholder="2066"
              description="EA Town"
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2080"
              component={renderField}
              type="text"
              placeholder="2080"
              description="EA PCode"
            />
          </Col>
          <Col span={3}>
            <Field
              name="empHeader.2081"
              component={renderField}
              type="text"
              placeholder="2081"
              description="EA CCode"
            />
          </Col>
        </Row>
      </Panel>
      <Panel header={<PanelHeader>Detail Rows</PanelHeader>} key="detailRows">
        <FieldArray name="empDetails" component={renderEmpDetails} />
      </Panel>
      <Panel header={<PanelHeader>Footer</PanelHeader>} key="footer">
        <Row>
          <Col span={3}>
            <Field
              name="empTrailer.6010"
              component={renderField}
              type="text"
              placeholder="6010"
              description="Emp Total Recs"
            />
          </Col>
        </Row>
      </Panel>
    </Collapse>
  </Form>
);

export default reduxForm({
  form: 'emp501DetailForm', // a unique identifier for this form
  enableReinitialize: true,
  validate
})(Emp501DetailForm);
