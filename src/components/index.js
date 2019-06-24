import React from "react";
import Requester from 'common/network/http/Request'
import {Drawer, Icon} from 'antd';
import UserDetail from './user-detail';
import './stylesheet.scss';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {users: [], showUserDetail: false};
  }

  componentWillMount = async () => {
    const users = await Requester.get('https://api.github.com/users');
    this.setState({users});
  }

  onChooseUser = (currentUser) => {
    this.setState({currentUser});
    this.changeStateOfUserDetailDrawer();
  }

  changeStateOfUserDetailDrawer = () => {
    this.setState({showUserDetail: !this.state.showUserDetail});
  }

  render() {
    const users = this.state.users || [];
    const currentUser = this.state.currentUser || {};


    return (
      <div className="ui-body">
        <div className="header">
          <div className="ui-content">
            Home
          </div>
        </div>

        <div className="ui-user-list">
          <div className="ui-content">
            <h1 className="title5user"> Top 5 Github's Users</h1>
            <div className="title-guid">Tab the username to see more information</div>
            <ul className="user-panel">
              {
                users.map((user, index) => (
                  <li onClick={() => this.onChooseUser(user)} key={index}>{user.login}</li>
                ))
              }
            </ul>
          </div>
        </div>

        <Drawer
          destroyOnClose
          title={<div className='user-detail-control' onClick={this.changeStateOfUserDetailDrawer}>
            <div className="back">
              <Icon type="left"/> back
            </div>
            <div className="header-title">
                Person
            </div>
          </div>}
          closable={true}
          width={'100%'}
          onClose={this.changeStateOfUserDetailDrawer}
          visible={this.state.showUserDetail}
        >
          <UserDetail username={currentUser.login}/>
        </Drawer>
      </div>
    );
  }
}

export default Index;

