/*
    Jono : 18 09 12
    AttendLogFilter : React Class Component
*/
import React from "react";
// import Cookies from 'js-cookie';
// import moment from 'moment';
// import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import Cookies from "js-cookie";

import {
  DatePicker,
  Row,
  Col,
  TreeSelect,
  Checkbox,
  Button,
  Modal,
  Radio,
  Spin,
  Alert
} from "antd";
//const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const { RangePicker } = DatePicker;
// const Option = Select.Option;

class AttendLogFilter extends React.Component {
  state = {
    deptBranch: "dept",
    params: {},
    options: {},
    depts: null,
    excludeWeekends: true,
    showPdf: false
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
      attendLogListParams,
      setAttendLogFilter
    },
    state
  ) {
    // console.log(state, depts, attendLogListParams);
    let newState = state;

    if (state.depts === null) {
      let depts = [];
      try {
        depts = JSON.parse(Cookies.get("attend-filter-depts"));
      } catch (e) {
        console.log("whoops", e);
      }
      console.log("cDepts", depts);
      setAttendLogFilter({ depts });
      newState = { ...newState, depts };
    }

    if (depts) {
      console.log(depts);
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
    Cookies.set("attend-filter-dateRange", dateRange, { expires: 7 });
    this.clearPdf();
  }

  onDeptBranchChange = deptBranch => {
    this.setState({ deptBranch });
    this.props.setAttendLogFilter({ depts: [] });
  };

  onDeptChange = depts => {
    //console.log("onDeptChange ", depts);
    Cookies.set("attend-filter-depts", JSON.stringify(depts), { expires: 7 });
    this.setState({
      depts
    });
    this.props.setAttendLogFilter({ depts });
    this.clearPdf();
  };

  onExcludeWeekendsChange = excludeWeekends => {
    // console.log('onExcludeWeekendsChange', excludeWeekends);
    this.setState({ excludeWeekends });
    Cookies.set("attend-filter-excludeWeekends", excludeWeekends, {
      expires: 7
    });
    this.props.setAttendLogFilter({ excludeWeekends });
    this.clearPdf();
  };

  renderPdf() {
    // this.setState({ PdfAttendLog: this.props.PdfAttendLog(this.props) });
    this.props.loadAttendLogPdf({
      depts: this.state.depts,
      dateRange: this.state.params.dateRange,
      excludeWeekends: this.state.excludeWeekends
    });
    this.setState({ showPdf: true });
  }

  handlePdfModalClose() {
    this.clearPdf();
  }

  clearPdf() {
    // delete this.state.PdfAttendLog;
    this.props.clearAttendLogPdf(this.props.blobUrl);
    this.setState({ showPdf: false });
  }

  render() {
    const { attendDeptsTree, attendBranchesTree, blobUrl } = this.props;
    const { showPdf, deptBranch } = this.state;
    const tProps = {
      allowClear: true,
      treeData:
        deptBranch === "dept"
          ? attendDeptsTree && attendDeptsTree.length === 1
            ? attendDeptsTree[0].children
            : []
          : attendBranchesTree && attendBranchesTree.length === 1
          ? attendBranchesTree[0].children
          : [],
      value: this.state.depts,
      onChange: this.onDeptChange,
      treeCheckable: true,
      showCheckedStrategy: TreeSelect.SHOW_CHILD,
      searchPlaceholder:
        deptBranch === "dept" ? "Select by Dept" : "Select by Branch",
      treeDefaultExpandAll: true,
      style: {
        width: "100%"
      }
    };
    return (
      <div>
        <Modal
          visible={showPdf} //&& this.props.blobUrl !== null
          title="Attend PDF"
          width={1060}
          onOk={() => this.handlePdfModalClose()}
          onCancel={() => this.handlePdfModalClose()}
          footer={[
            <Button
              icon="close-square"
              key="close"
              onClick={() => this.handlePdfModalClose()}
            >
              Close
            </Button>
          ]}
          style={{ top: 10 }}
          bodyStyle={{
            height: 500
          }}
        >
          {blobUrl !== null ? (
            <iframe src={blobUrl} title="pdfPreview" width="100%" height="100%">
              <p>Your browser does not support iframes.</p>
            </iframe>
          ) : (
            <Spin tip="Loading...">
              <Alert
                message="Loading"
                description="PDF is being generated on server, please be patient."
                type="info"
              />
            </Spin>
          )}
        </Modal>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12}>
            <Col span={6}>
              <Radio.Group
                value={this.state.deptBranch}
                size="medium"
                onChange={e => this.onDeptBranchChange(e.target.value)}
              >
                <Radio.Button value="dept">Dept</Radio.Button>
                <Radio.Button value="branch">Branch</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={18}>
              <TreeSelect {...tProps} />
            </Col>
          </Col>
          <Col span={6}>
            <Col span={7}>
              <p
                style={{
                  margin: "5px",
                  textAlign: "right"
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
