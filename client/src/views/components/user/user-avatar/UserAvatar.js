/*
    Jono : 18 09 21
    UserAvatar : React Class Component
*/
import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import Preview from './Preview';
import { Button, Checkbox, Slider, Row, Col } from 'antd';
const csLable = 6;
const csData = 10;
const rowHeight = 30;
class UserAvatar extends React.Component {
  state = {
    image:
      'api/image-proxy/' +
      encodeURIComponent(
        'https://avatars2.githubusercontent.com/u/2427544?v=4'
      ) +
      '/200/200.png', //'img/avatar.jpg',
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 200,
    height: 200
  };

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleSave = () => {
    if (this.editor) {
      const img = this.editor.getImageScaledToCanvas().toDataURL('image/png');
      const rect = this.editor.getCroppingRect();
      console.log(rect);

      this.setState({
        preview: {
          img,
          rect,
          scale: this.state.scale,
          width: this.state.width,
          height: this.state.height,
          borderRadius: this.state.borderRadius
        }
      });
    }
  };

  handleScale = value => {
    const scale = parseFloat(value);
    this.setState({ scale });
  };

  handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
    this.setState({ allowZoomOut });
  };

  rotateLeft = e => {
    e.preventDefault();

    this.setState({
      rotate: this.state.rotate - 90
    });
  };

  rotateRight = e => {
    e.preventDefault();
    this.setState({
      rotate: this.state.rotate + 90
    });
  };

  handleBorderRadius = value => {
    const borderRadius = parseInt(value, 10);
    this.setState({ borderRadius });
  };

  handleXPosition = value => {
    const x = parseFloat(value);
    this.setState({ position: { ...this.state.position, x } });
  };

  handleYPosition = value => {
    const y = parseFloat(value);
    this.setState({ position: { ...this.state.position, y } });
  };

  // handleWidth = value => {
  //   const width = parseInt(value, 10);
  //   this.setState({ width });
  // };
  //
  // handleHeight = e => {
  //   const height = parseInt(e.target.value, 10);
  //   this.setState({ height });
  // };

  logCallback(e) {
    // eslint-disable-next-line
    console.log('callback', e);
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor;
  };

  handlePositionChange = position => {
    this.setState({ position });
  };

  handleDrop = acceptedFiles => {
    this.setState({ image: acceptedFiles[0] });
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={8}>
            <Dropzone
              onDrop={this.handleDrop}
              disableClick
              multiple={false}
              style={{
                width: this.state.width + 30,
                height: this.state.height + 60
                //marginBottom: '35px'
              }}
            >
              <div>
                <AvatarEditor
                  ref={this.setEditorRef}
                  scale={parseFloat(this.state.scale)}
                  width={this.state.width}
                  height={this.state.height}
                  position={this.state.position}
                  onPositionChange={this.handlePositionChange}
                  rotate={parseFloat(this.state.rotate)}
                  borderRadius={
                    this.state.width / (100 / this.state.borderRadius)
                  }
                  onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                  onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                  onImageReady={this.logCallback.bind(this, 'onImageReady')}
                  image={this.state.image}
                  className="editor-canvas"
                  crossOrigin=""
                  // onImageChange={this.handleSave()}
                />
              </div>
            </Dropzone>
          </Col>
        </Row>
        <Row style={{ marginBottom: 30 }}>
          <Col span={12}>
            <Row style={{ height: rowHeight }}>
              <Col span={csLable} className="pull-text-right">
                New File:
              </Col>
              <Col span={csData}>
                <input
                  name="newImage"
                  type="file"
                  onChange={this.handleNewImage}
                  className=""
                />
              </Col>
            </Row>
            <Row style={{ height: rowHeight }}>
              {' '}
              <Col span={csLable} className="pull-text-right">
                Zoom:
              </Col>
              <Col span={csData}>
                <Slider
                  style={{ marginTop: 5 }}
                  onChange={this.handleScale}
                  min={this.state.allowZoomOut ? 0.1 : 1}
                  max={2}
                  step={0.01}
                  defaultValue={1}
                />
              </Col>
            </Row>
            <Row style={{ height: rowHeight }}>
              <Col span={csLable} className="pull-text-right">
                {'Allow Scale < 1:'}
              </Col>
              <Col span={csData}>
                <Checkbox
                  onChange={this.handleAllowZoomOut}
                  checked={this.state.allowZoomOut}
                />
              </Col>
            </Row>
            <Row style={{ height: rowHeight }}>
              <Col span={csLable} className="pull-text-right">
                Border radius:
              </Col>
              <Col span={csData}>
                <Slider
                  style={{ marginTop: 5 }}
                  onChange={this.handleBorderRadius}
                  min={0}
                  max={50}
                  step={1}
                  defaultValue={0}
                />
              </Col>
            </Row>
            <Row style={{ height: rowHeight }}>
              <Col span={csLable} className="pull-text-right">
                X Position:
              </Col>
              <Col span={csData}>
                <Slider
                  style={{ marginTop: 5 }}
                  onChange={this.handleXPosition}
                  min={0}
                  max={1}
                  step={0.01}
                  value={this.state.position.x}
                />
              </Col>
            </Row>
            <Row style={{ height: rowHeight }}>
              <Col span={csLable} className="pull-text-right">
                Y Position:
              </Col>
              <Col span={csData}>
                <Slider
                  style={{ marginTop: 5 }}
                  onChange={this.handleYPosition}
                  min={0}
                  max={1}
                  step={0.01}
                  value={this.state.position.y}
                />
              </Col>
            </Row>
            <Row style={{ height: rowHeight + 10 }}>
              <Col span={csLable} className="pull-text-right">
                Rotate:
              </Col>
              <Col span={csData}>
                <Button onClick={this.rotateLeft}>Left</Button>
                <Button onClick={this.rotateRight}>Right</Button>
              </Col>
            </Row>
            <Row style={{ height: rowHeight + 10 }}>
              <Col span={csData}>
                <Button onClick={this.handleSave}>Preview</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          {!!this.state.preview && (
            <img
              src={this.state.preview.img}
              alt="whatever"
              style={{
                borderRadius: `${(Math.min(
                  this.state.preview.height,
                  this.state.preview.width
                ) +
                  10) *
                  (this.state.preview.borderRadius / 2 / 100)}px`,
                verticalAlign: 'top',
                padding: 5,
                border: '1px solid #CCC'
              }}
            />
          )}
          {!!this.state.preview && (
            <Preview
              width={
                200
                // this.state.preview.scale < 1
                //   ? this.state.preview.width
                //   : (this.state.preview.height * 478) / 270
              }
              height={200}
              //image="/img/avatar.jpg"
              rect={this.state.preview.rect}
            />
          )}
        </Row>
      </div>
    );
  }
}

export default UserAvatar;
