/*
    Jono : 18 02 28
    Emp501Import : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
import PropTypes from 'prop-types';

import FimsPeriodTable from 'src/views/components/fleet/fims-period-table';

import { Upload, Icon, Button, Row, Col } from 'antd';
const Dragger = Upload.Dragger;

const inclCsvCols = [
  'cut_off_date',
  'registration',
  'batch',
  'driver',
  'vehicle_description',
  'transaction_date',
  'transaction_time',
  'process_date',
  'merchant_name',
  'merchant_town',
  'oil_company',
  'odometer',
  'fuel_litres',
  'oil_litres',
  'private_usage',
  'warnings',
  'purchase_description',
  'toll_lane',
  'toll_vehicle_class',
  'toll_transaction_type',
  'toll_match_indicator',
  'amount',
  'toll_discount',
  'batch_index',
  'fims_period_id'
];

function csvToJSON(csv) {
  let aCsv = csv.split('\n');
  // turn header row into acceptable json names
  let aHead = aCsv[0].split(',').map(str => {
    return str
      .trim()
      .toLowerCase()
      .replace(/ /g, '_')
      .replace('-', '_')
      .replace('\r', '');
  });
  // console.log(`got ${aCsv.length} lines`);
  let jsonRes = [];
  for (let i = 1; i <= aCsv.length - 1; i++) {
    // aCsv.length
    let aLine = aCsv[i].split(',');
    if (aLine.length > 1) {
      let jsonLine = {};
      for (var j = 0; j < aLine.length; j++) {
        if (inclCsvCols.includes(aHead[j])) {
          jsonLine[aHead[j]] = aLine[j]
            .replace(/"/g, '')
            .replace(/&/g, '+')
            .trim();
        }
      }
      jsonRes.push(jsonLine);
    }
  }
  //console.log(jsonRes);
  return jsonRes;
}

class FimsImport extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  componentDidMount() {
    this.props.loadFimsPeriods();
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
        this.props.postFimsBatch(data);
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
      <Row type="flex" justify="start" align="top">
        <Col span={20}>
          <FimsPeriodTable {...this.props} />
        </Col>
        <Col span={4}>
          <Button
            className="upload-start red"
            type="primary"
            onClick={this.handleUpload}
            disabled={this.state.fileList.length === 0}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
          <Dragger
            {...props}
            style={{ padding: 10 }}
            disabled={!this.props.fimsPeriodIsAvailable}
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
              Must be csv files exported from FIMS voucher exception search.
            </p>
          </Dragger>
        </Col>
      </Row>
    );
  }
}

FimsImport.propTypes = {
  removeFimsPeriod: PropTypes.func.isRequired,
  importFimsPeriod: PropTypes.func.isRequired
};

export default FimsImport;
