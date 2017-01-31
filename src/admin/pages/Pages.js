import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import $ from 'jquery';
window.jQuery = $;
const postPages = gql`

query getPages{
  viewer {
    allPosts(where: {type: {eq: "page"}}) {
      edges {
        node {
          title,
          author {
            username
          },
          comments{
            edges{
              node{
                id
              }
            }
          },
          createdAt
        }
      }
    }
  }
} 
`;

class Page extends React.Component {
    render() {
   debugger;
        if (this.props.data.viewer) {
            return (
            <tbody>
            {this.props.data.viewer.allPosts.edges.map(function(item){
                return <tr key={item.node.id}>
                <td><a href="#"><input type="checkbox"></input></a></td>
                <td><a href="#">{item.node.title}</a></td>
                <td><a href="#">{item.node.author.username}</a></td>
                <td><a href="#">Post Status</a></td>
                <td style={{textAlign: 'center'}}><a href="#">{item.node.comments.edges.length}</a></td>
                <td><a href="#">{item.node.createdAt}</a></td>             
                </tr>
            })}
            </tbody>
            )
        }
        else 
            return <div></div>
    }
}

const PageWithData = graphql(postPages)(Page);

var Pages = React.createClass({
  componentDidMount: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    require ('./Pages.css');
    $('#pageListTbl').DataTable();
  },

  render: function(){
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header">
            <h1>
              Page List
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">Page List</li>
            </ol>
          </section>  
          <section className="content">
            <div className="box box-default">
              <div className="box-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xs-12">
                      <div style={{marginTop: 10, marginBottom: 20}}>
                        <button className="btn btn-default" href="#" style={{marginRight: 10}}>Edit</button>
                        <button className="btn btn-default" href="#">Delete</button>
                      </div>                   
                      <table id="pageListTbl" className="display">                        
                        <thead>
                          <tr>
                            <th><input type="checkbox"></input></th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Post Status</th>
                            <th style={{textAlign: 'center'}}>Comments</th>
                            <th>Publish Date</th>
                          </tr>
                      </thead>
                      <PageWithData/>
                    </table>
                  </div>
                </div>
              </div>
             </div>
            </div>
          </section>
        </div>
      </div>
    )},
});

export default Pages;