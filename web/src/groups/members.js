import style from './members.scss';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import API from '../api/index.js';

class Members extends Component {
  constructor(props) {
    super(props);
    this.api = new API();

    let id = this.props.match.params.id;
    this.state = {
      group_id: id,
      name: '',
      members: [],
      loading: true
    }
  }

  componentDidMount() {
    this.api.group.show(this.state.group_id).then((data) => {
      this.setState({name: data.name}, () => {
        this.api.group.members(this.state.group_id, 512).then((data) => {
          this.setState({members: data});
        })
      });
    });
  }

  render() {
    let state = this.state;
    let members = state.members.map((member) => {
      return (
        <img src={member.avatar_url} key={member.member_id} className={style.item} />
      )
    });
    return (
      <div className='container'>
        <main className='column main'>
          <div className={style.members}>
            <h1>{i18n.t('group.members')}</h1>
            <div className={style.list}>
              {members}
            </div>
          </div>
        </main>
        <aside className='column aside'>
          <Link to={`/groups/${state.group_id}`}>
            {state.name}
          </Link>
        </aside>
      </div>
    )
  }
}

export default Members;
