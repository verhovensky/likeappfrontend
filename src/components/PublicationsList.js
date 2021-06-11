import React from 'react';
import PropTypes from 'prop-types';

class PublicationsList extends React.Component{
  state = {
      Posts: [],
  }
  constructor() {
      super();
      const Res = fetch('http://localhost:8000/api/publications/', {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
                .then(res => res.json())
                .then(json => {
                    //console.log(json);
                    this.setState({...this.state, Posts: json})
                    //console.log(this.state.Posts)
                    return json
                })
  };

  render() {
      //console.log(this.state.data)
      console.log(this.state.Posts)
      const publl = this.state.Posts?.map((pub, i) => (
          <div key={pub.pk}>
    <h3>{pub.title}</h3>
    <p>{pub.content}</p>
    <p>Понравилось {pub.total_likes}</p>
    <p>Создана {pub.created}</p>
          </div>
  ));
      return(<div>
        {publl}
      </div>)
  }
}

export default PublicationsList;

PublicationsList.propTypes = {
  handle_publications: PropTypes.func
};