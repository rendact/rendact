import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import $ from 'jquery';
window.jQuery = $;

const postPages = gql`
  query getPages{
  viewer{
    allPages{
      edges{
        node{
          title,
          author,
          comments,
          createdAt
        }
      }
    }
  }
} 
`;

class Page extends React.Component {
    render() {
        if (this.props.data.viewer) {
            return (
            <tbody>
            {this.props.data.viewer.allPages.edges.map(function(item){
                return <tr key={item.node.id}>
                <td><input type="checkbox"></input></td>
                <td>{item.node.title}</td>
                <td>{item.node.author}</td>
                <td>{item.node.comments}</td>
                <td>{item.node.createdAt}</td>           
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
                            <th>Comments</th>                             
                            <th>Date</th>
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

  componentDidMount: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    require ('./Pages.css');
   
    $('#pageListTbl').DataTable();
  },

});

export default Pages;