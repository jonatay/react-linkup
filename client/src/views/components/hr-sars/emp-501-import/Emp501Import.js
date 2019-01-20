/*
    Jono : 18 02 28
    Emp501Import : Stateless Functional Component
*/
import React from 'react';

import { Upload, Icon, Button, Row, Col, Modal } from 'antd';
const Dragger = Upload.Dragger;

function csvToJSON(csv) {
  let aCsv = csv.split('\n');
  // console.log(`got ${aCsv.length} lines`);
  let aRes = [];
  for (let i = 0; i <= aCsv.length - 1; i++) {
    // aCsv.length
    let aLine = aCsv[i].split(',');
    let aCV = [];
    for (let j = 0; j <= aLine.length - 1; j += 2) {
      aCV.push({ code: aLine[j], value: aLine[j + 1] });
    }
    aRes.push(aCV);
  }
  return aRes;
}

class Emp501Import extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  componentDidMount() {
    // this.props.loadFimsPeriods();
  }

  handleUpload = () => {
    let { fileList } = this.state;
    // const formData = new FormData();
    this.setState({ uploading: true });
    for (let i = fileList.length - 1; i >= 0; i--) {
      let file = fileList[i];
      let reader = new FileReader();
      reader.onload = event => {
        let data = csvToJSON(event.target.result);
        this.props.handleOk(data);
      };
      reader.readAsText(file);
      fileList = fileList.filter(f => f.name !== file.name);
      this.setState({ fileList });
    }
    this.setState({ uploading: false });
  };

  render() {
    const { uploading } = this.state;
    const props = {
      action: '/api-fims/fims/voucher-post-batch',
      multiple: true,
      accept: '.csv',
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file]
        }));
        return false;
      },
      fileList: this.state.fileList
    };

    return (
      <Modal
        title="Import Emp501 Return File"
        visible={this.props.visible}
        // onOk={this.handleUpload}
        // onCancel={this.props.handleCancel}
        footer={[
          <Button key="cancel" onClick={this.props.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="upload"
            className="upload-start red"
            type="primary"
            onClick={this.handleUpload}
            disabled={this.state.fileList.length === 0}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
        ]}
      >
        <Row type="flex" justify="left" align="top">
          <Col span={24}>
            <Dragger
              {...props}
              style={{ padding: 10 }}
              // disabled={!this.props.fimsPeriodIsAvailable}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
              <p
                className=""
                style={{ color: 'red', fontWeight: 'bold', fontSize: 'small' }}
              >
                Must be csv files expected by SARS Easy File Employer.
              </p>
            </Dragger>
          </Col>
        </Row>
      </Modal>
    );
  }
}

Emp501Import.propTypes = {
  // removeFimsPeriod: PropTypes.func.isRequired,
  // importFimsPeriod: PropTypes.func.isRequired
};

export default Emp501Import;
