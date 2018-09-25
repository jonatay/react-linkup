/*
    Jono : 18 09 21
    UserAvatar : React Class Component
*/
import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

class UserAvatar extends React.Component {
  onClickSave = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage();

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas();
    }
  };
  setEditorRef = editor => (this.editor = editor);

  handleDrop = dropped => {
    this.setState({ image: dropped[0] });
  };

  render() {
    return (
      <Dropzone
        onDrop={this.handleDrop}
        disableClick
        style={{ width: '250px', height: '250px' }}
      >
        <AvatarEditor
          ref={this.setEditorRef}
          image="http://example.com/initialimage.jpg"
          width={250}
          height={250}
          border={50}
          scale={1.2}
        />
      </Dropzone>
    );
  }
}

export default UserAvatar;
