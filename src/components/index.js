import React from "react";
import Requester from 'common/network/http/Request'
import {Drawer} from 'antd';
import UserDetail from './user-detail';
import './stylesheet.scss';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {users: [], showUserDetail: false};
  }

  componentWillMount = async () => {
    const users = await Requester.get('https://api.github.com/users');
    console.log(users);
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
            Top 5 Github's Users
          </div>
        </div>

        <div className="ui-user-list">
          <div className="ui-content">
            <h1 className="title"> Tab the username to see more information</h1>
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
          title={`You are viewing ${currentUser.login}`}
          closable={true}
          width={500}
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

