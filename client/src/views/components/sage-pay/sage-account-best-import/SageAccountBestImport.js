/*
    Jono : 18 05 20
    SageAccountBestImport : React Class Component
*/
import React from 'react';

import { Upload, Row, Button, Col, Icon } from 'antd';

const Dragger = Upload.Dragger;

const aCols = {
  acct_nbr: {
    from: 0,
    len: 13
  },
  branch_nbr: {
    from: 13,
    len: 6
  },
  statement_ref: {
    from: 19,
    len: 30
  },
  pay_limit: {
    from: 49,
    len: 15,
    isNbr: true
  },
  lookup_code: {
    from: 64,
    len: 16
  },
  creditor_name: {
    from: 93,
    len: 30
  },
  best_status_code: {
    from: 123,
    len: 2
  },
  best_status: {
    from: 125,
    len: 30
  },
  notify_method: {
    from: 155,
    len: 13
  },
  notify_detail: {
    from: 168,
    len: 64
  }
};

function bestToJSON(best) {
  return best.split('\n').map(be =>
    Object.keys(aCols).reduce((re, c) => {
      let extr = be.substr(aCols[c].from, aCols[c].len).trim();
      re[c] = aCols[c].isNbr ? Number.parseFloat(extr) : extr;
      return re;
    }, {})
  ).filter(r=>r.acct_nbr!=='');
}

class SageAccountBestImport extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  handleUpload = () => {
    let { fileList } = this.state;
    // const formData = new FormData();
    this.setState({ uploading: true });
    for (let i = fileList.length - 1; i >= 0; i--) {
      let file = fileList[i];
      let reader = new FileReader();
      reader.onload = event => {
        let data = bestToJSON(event.target.result);
        console.log(data);
        this.props.importBestAccounts(data);
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
      multiple: false,
      accept: '.*',
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
      <Row type="flex" justify="start" align="top">
        <Col span={6}>
          <Button
            type="primary"
            onClick={() => this.props.importCubitAccounts()}
          >
            Import CUBIT Accounts
          </Button><p></p>
          <Button
            className="upload-start red"
            type="primary"
            onClick={this.handleUpload}
            disabled={this.state.fileList.length === 0}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Start BEST Accounts Upload'}
          </Button>
        </Col>
        <Col span={18}>
          <Dragger
            {...props}
            style={{ padding: 2 }}
            // disabled={!this.props.fimsPeriodIsAvailable}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p
              className=""
              style={{ color: 'red', fontWeight: 'bold', fontSize: 'small' }}
            >
              Must be Standard Bank BEST Export Creditors format.
            </p>
          </Dragger>
        </Col>
      </Row>
    );
  }
}

export default SageAccountBestImport;
