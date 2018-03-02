/*
    Jono : 18 02 28
    FimsImport : Stateless Functional Component
*/
import React from 'react';
// import { List } from 'immutable';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Upload, Icon, message, Button } from 'antd';
const Dragger = Upload.Dragger;

// const props = {
//   name: 'file',
//   multiple: true,
//   action: 'http://localhost:3000/api-fims/fims/voucher-post-batch',
//   onChange(info) {
//     const status = info.file.status;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   }
// };
const inclCsvCols = [
  'cut_off_date',
  'registration',
  'batch',
  'driver',
  'vehicle_description',
  'transaction_date',
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
  console.log(`got ${aCsv.length} lines`);
  let jsonRes = [];
  for (let i = 1; i <= aCsv.length - 1; i++) {
    // aCsv.length
    let aLine = aCsv[i].split(',');
    if (aLine.length > 1) {
      let jsonLine = {};
      for (var j = 0; j < aLine.length; j++) {
        jsonLine[aHead[j]] = aLine[j]
          .replace(/"/g, '')
          .replace(/&/g, '+')
          .trim();
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

  handleUpload = () => {
    const { fileList } = this.state;
    // const formData = new FormData();

    fileList.forEach(file => {
      console.log(file);

      let reader = new FileReader();
      reader.onload = event => {
        let data = csvToJSON(event.target.result);
        console.log('data...', data);
      };
      reader.readAsText(file);

      // formData.append('files[]', file);
    });
    message.success('upload successfully.');

    // this.setState({
    //   uploading: true
    // });
    //
    // // You can use any AJAX library you like
    // fetch('/api-fims/fims/voucher-post-batch', {
    //   method: 'post',
    //   processData: false,
    //   body: formData
    // })
    //   .then(data => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false
    //     });
    //     message.success('upload successfully.');
    //   })
    //   .catch(err => {
    //     this.setState({
    //       uploading: false
    //     });
    //     message.error('upload failed.');
    //   });
  };

  render() {
    const { uploading } = this.state;
    const props = {
      action: '/api-fims/fims/voucher-post-batch',
      multiple: true,
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
      <div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Must be csv files exported from
            FIMS voucher exception search.
          </p>
        </Dragger>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
          loading={uploading}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  }
}

FimsImport.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FimsImport)
);
