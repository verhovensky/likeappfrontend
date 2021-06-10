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
                  Authorization: `bearer ${localStorage.getItem('token')}`
                }
              })
                .then(res => res.json())
                .then(json => {
                    //console.log(json);
                    this.state.Posts = json
                    console.log(this.state.Posts)
                    return json
                })
  };

  render() {
      //console.log(this.state.data)
      const publl = this.state.Posts?.map((pub, i) => (
    <li key={i} className="list-group-item">{pub.title}</li>
  ));
      return(<div>
      <ul className="list-group list-group-flush">
        {publl}
      </ul>
      </div>)
  }
}


  // render() {
  //           console.log("get pubs");
  //             fetch('http://localhost:8000/api/publications/', {
  //               method: 'GET',
  //               headers: {
  //                 Authorization: `bearer ${localStorage.getItem('token')}`
  //               }
  //             })
  //               .then(res => res.json())
  //               .then(json => {
  //                 console.log(json);
  //                 return json
  //               });
  //           return (<div>
  //               {json.map((value, index) => {
  //               return <li key={index}>{value}</li>
  //               })}
  //           </div>);
  //         }
  //       }

// get_publications = items => {
//     console.log("get pubs");
//     console.log(this.state.logged_in);
//     if (this.state.logged_in === true) {
//       fetch('http://localhost:8000/api/publications/', {
//         method: 'GET',
//         headers: {
//           Authorization: `bearer ${localStorage.getItem('token')}`
//         }
//       })
//         .then(res => res.json())
//         .then(json => {
//           console.log(json);
//           const pubs = json;
//           return(
//             <ul>
//               {pubs.map((value, index) => {
//                 return <li key={index}>{value}</li>
//               })}
//             </ul>
//           )
//         });
//     }
//   }

export default PublicationsList;

PublicationsList.propTypes = {
  handle_publications: PropTypes.func
};