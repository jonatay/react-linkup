/*
    Jono : 18 09 12
    AttendLogFilter : React Class Component
*/
import React from 'react';
// import Cookies from 'js-cookie';
// import moment from 'moment';
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';

import {
  DatePicker,
  Row,
  Col,
  TreeSelect,
  Checkbox,
  Button,
  Modal
} from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const { RangePicker } = DatePicker;
// const Option = Select.Option;

class AttendLogFilter extends React.Component {
  state = {
    params: {},
    options: {},
    depts: [],
    excludeWeekends: true,
    PdfAttendLog: null
  };

  constructor(props) {
    super(props);
    this.props.loadAttendUsers();
    this.props.loadAttendDepts();
  }

  static getDerivedStateFromProps(
    {
      loadAttendLogs,
      attendLogFilter: { depts },
      attendLogListParams
    },
    state
  ) {
    // console.log(state, depts, attendLogListParams);
    let newState = state;
    if (depts) {
      newState = { ...newState, depts };
    }
    if (attendLogListParams) {
      newState = { ...newState, params: attendLogListParams };
      if (attendLogListParams.dateRange && !state.params.dateRange) {
        loadAttendLogs(attendLogListParams);
        //console.log(state.params.dateRange, attendLogListParams.dateRange);
      }
    }
    return newState;
  }

  onDateRangeChange(dateRange) {
    // console.log(dateRange);
    // Cookies.set('fleetTransactionsFilter', JSON.stringify({ dateRange }), {
    //   expires: 7
    // });
    this.props.loadAttendLogs({ dateRange });
    this.clearPdf();
  }

  onDeptChange = depts => {
    console.log('onDeptChange ', depts);
    this.setState({ depts });
    this.props.setAttendLogFilter({ depts });
    this.clearPdf();
  };

  onExcludeWeekendsChange = excludeWeekends => {
    console.log('onExcludeWeekendsChange', excludeWeekends);
    this.setState({ excludeWeekends });
    this.props.setAttendLogFilter({ excludeWeekends });
    this.clearPdf();
  };

  renderPdf() {
    this.setState({ PdfAttendLog: this.props.PdfAttendLog(this.props) });
  }

  handlePdfModalClose() {
    this.clearPdf();
  }

  clearPdf() {
    delete this.state.PdfAttendLog;
    this.setState({ PdfAttendLog: null });
  }

  render() {
    const { attendDeptsTree, attendDepts } = this.props;
    const { PdfAttendLog } = this.state;
    const tProps = {
      treeData:
        attendDeptsTree && attendDeptsTree.length === 1
          ? attendDeptsTree[0].children
          : [],
      value: this.state.depts,
      onChange: this.onDeptChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Select Dept',
      treeDefaultExpandAll: true,
      style: {
        width: '100%'
      }
    };
    console.log(this.props.attendDepts, this.props.attendLogListParams);
    const getFileName = () =>
      `attend-log-${this.props.attendLogFilter.depts
        .map(deptId =>
          this.props.attendDepts
            .find(dept => parseInt(deptId, 10) === dept.id)
            .name.toLowerCase()
            .replace(/\s/g, '-')
        )
        .join('-')}-${this.props.attendLogListParams.dateRange[0].format(
        'YY-MM-DD'
      )}-to-${this.props.attendLogListParams.dateRange[1].format(
        'YY-MM-DD'
      )}.pdf`;
    return (
      <div>
        <Modal
          visible={PdfAttendLog !== null}
          title="Attend PDF"
          onOk={() => this.handlePdfModalClose()}
          onCancel={() => this.handlePdfModalClose()}
          footer={[
            <span key="download">
              {PdfAttendLog !== null ? (
                <PDFDownloadLink
                  document={PdfAttendLog}
                  fileName={getFileName()}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      <Button icon="printer" type="danger" disabled>
                        Loading
                      </Button>
                    ) : (
                      <Button icon="download" type="primary">
                        Download
                      </Button>
                    )
                  }
                </PDFDownloadLink>
              ) : (
                <p>nada</p>
              )}
            </span>,
            <span key="space"> </span>,
            <Button key="ok" onClick={() => this.handlePdfModalClose()}>
              Ok
            </Button>
          ]}
          width="500"
          style={{ top: 10 }}
          bodyStyle={{
            height: 600
          }}
        >
          {PdfAttendLog !== null ? (
            <BlobProvider document={PdfAttendLog}>
              {({ blob, url, loading, error }) =>
                loading ? (
                  <p>loading</p>
                ) : (
                  <iframe
                    src={url}
                    title="pdfPreview"
                    width="100%"
                    height="100%"
                  >
                    <p>Your browser does not support iframes.</p>
                  </iframe>
                )
              }
            </BlobProvider>
          ) : (
            // <PDFViewer style={{ height: '100%', width: '100%' }}>
            //   {PdfAttendLog}
            // </PDFViewer>
            <div>
              <h3>Whoops...</h3>
            </div>
          )}
        </Modal>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            <Col span={4}>
              <p
                style={{
                  margin: '5px',
                  textAlign: 'right'
                }}
              >
                Branch/Dept:
              </p>
            </Col>
            <Col span={20}>
              <TreeSelect {...tProps} />
            </Col>
          </Col>
          <Col span={6}>
            <Col span={7}>
              <p
                style={{
                  margin: '5px',
                  textAlign: 'right'
                }}
              >
                Date Range:
              </p>
            </Col>
            <Col span={15}>
              <RangePicker
                value={this.state.params.dateRange}
                onChange={date => this.onDateRangeChange(date)}
                allowClear={false}
              />
            </Col>
          </Col>
          <Col span={4}>
            <Checkbox
              onChange={({ target: { checked } }) =>
                this.onExcludeWeekendsChange(checked)
              }
              checked={this.state.excludeWeekends}
            >
              Exclude Weekends
            </Checkbox>
          </Col>
          <Col span={2}>
            <div>
              <Button icon="printer" onClick={() => this.renderPdf()}>
                PDF
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AttendLogFilter;
