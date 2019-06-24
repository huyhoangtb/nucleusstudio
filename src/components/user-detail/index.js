import React from "react";
import {Avatar} from 'antd';
import './stylesheet.scss';
import Requester from "../../common/network/http/Request";

const DetailItem = ({label, info}) => <li>
  <div className="label">{label}:</div>
  <div className="detail">
    {info}
  </div>
</li>

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = async () => {
    const {username} = this.props
    const user = await Requester.get(`https://api.github.com/users/${username}`);
    this.setState({user});
  }

  render() {
    const user = this.state.user || {};

    return (
      <div className="user-detail">
        <ul>


          <li className='short-detail'>
            <div className="avatar"><Avatar width={30} src={user.avatar_url}/></div>
            <div className="detail">
              <div><b>{user.name}</b></div>
              <div className="desc">{user.location}</div>
            </div>
          </li>

          <DetailItem label='Username' info={`#${user.id} - ${user.login}`}/>
          <DetailItem label='location' info={`${user.location}`}/>
          <DetailItem label='company' info={`${user.company}`}/>
          <DetailItem label='blog Link' info={<a href={user.blog} target='_blank'/> }/>

        </ul>
      </div>
    );
  }
}

export default Index;

