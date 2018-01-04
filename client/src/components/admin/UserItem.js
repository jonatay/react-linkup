import React, { Component } from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button, List, Avatar } from 'antd';

export class UserItem extends Component {
  constructor() {
    super(...arguments);

    this.state = { editing: false };

    this.edit = this.edit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  edit() {
    this.setState({ editing: true });
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.save(event);
    } else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  remove() {
    this.props.removeUser(this.props.user);
  }

  save(event) {
    if (this.state.editing) {
      const { user } = this.props;
      const title = event.target.value.trim();

      if (title.length && title !== user.title) {
        this.props.updateUser(user, { title });
      }

      this.stopEditing();
    }
  }

  stopEditing() {
    this.setState({ editing: false });
  }

  toggleStatus() {
    const { user } = this.props;
    this.props.updateUser(user, { completed: !user.completed });
  }

  renderTitle(user) {
    return (
      <div className="user-item__title" tabIndex="0">
        {user.title}
      </div>
    );
  }

  renderTitleInput(user) {
    return (
      <input
        autoComplete="off"
        autoFocus
        className="user-item__input"
        defaultValue={user.title}
        maxLength="64"
        onKeyUp={this.handleKeyUp}
        type="text"
      />
    );
  }

  render() {
    const { user } = this.props;
    return (
      <List.Item key={user.uid}>
        <List.Item.Meta
          avatar={<Avatar src={user.photoURL} />}
          title={user.displayName}
          description={user.email}
        />
        <div>
          <Button
            type={!user.disabled ? 'default' : 'danger'}
            icon={!user.disabled ? 'check-square' : 'close-square'}
          >
            {!user.disabled ? 'active' : 'disabled'}
          </Button>
        </div>
      </List.Item>
    );
  }
}

UserItem.propTypes = {
  removeUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default UserItem;

/*

    const { editing } = this.state;


    let containerClasses = classNames('user-item', {
      'user-item--completed': user.completed,
      'user-item--editing': editing
    });


      <div className={containerClasses} tabIndex="0">
        <div className="cell">
          <Button
            className={classNames('btn--icon', 'user-item__button', {'active': user.completed, 'hide': editing})}
            onClick={this.toggleStatus}>
            <Icon name="done" />
          </Button>
        </div>

        <div className="cell">
          {editing ? this.renderTitleInput(user) : this.renderTitle(user)}
        </div>

        <div className="cell">
          <Button
            className={classNames('btn--icon', 'user-item__button', {'hide': editing})}
            onClick={this.edit}>
            <Icon name="mode_edit" />
          </Button>
          <Button
            className={classNames('btn--icon', 'user-item__button', {'hide': !editing})}
            onClick={this.stopEditing}>
            <Icon name="clear" />
          </Button>
          <Button
            className={classNames('btn--icon', 'user-item__button', {'hide': editing})}
            onClick={this.remove}>
            <Icon name="delete" />
          </Button>
        </div>
      </div>


 */
