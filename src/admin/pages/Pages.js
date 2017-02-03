import React from 'react';
import request from 'request';
import $ from 'jquery';
window.jQuery = $;
import Config from '../../config';

const Page = React.createClass({
  getInitialState: function(){
    return {
      content: [<tr><td>Loading data...</td></tr>]
    }
  },
  componentDidMount: function(){
    //$('#pageListTbl').DataTable();
  },
  componentWillMount: function(){
    let list = [];
    let postPages = {"query": `
      query getPages{
      viewer {
        allPosts(where: {type: {eq: "page"}}) {
          edges {
            node {
              id
              title,
              author {
                username
              },
              status,
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
    `};
    var me = this;
    request({
        url: Config.scapholdUrl,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.token
        },
        body: postPages
      }, (error, response, body) => {
        if (body.data) {
          //var datatable = $('#table').dataTable().api();
          $.each(body.data.viewer.allPosts.edges, function(key, item){
          
            var dt = new Date(item.node.createdAt);
            var date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
            list.push(<tr key={item.node.id}>
              <td style={{textAlign: 'center'}}><input type="checkbox"></input></td>
              <td style={{textAlign: 'center'}}><a href="">{item.node.title}</a></td>
              <td style={{textAlign: 'center'}}><a href="">{item.node.author.username}</a></td>
              <td style={{textAlign: 'center'}}><a href="">{item.node.status}</a></td>
              <td style={{textAlign: 'center'}}><a href="">{item.node.comments.edges.length}</a></td>            
              <td style={{textAlign: 'center'}}>Published {date}</td>
            </tr>)
          });
        }
        me.setState({content: list});
        $('#pageListTbl').DataTable();
    });
  },
  render: function() {
      return (
        <tbody>{this.state.content}</tbody>
      )
  }
});


const Pages = React.createClass({
  componentDidMount: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    require ('./Pages.css');
    //$('#pageListTbl').DataTable();
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
                            <th style={{textAlign: 'center'}}><input type="checkbox"></input></th>                            
                            <th style={{textAlign: 'center'}}>Title</th>
                            <th style={{textAlign: 'center'}}>Author</th>
                            <th style={{textAlign: 'center'}}>Post Status</th>
                            <th style={{textAlign: 'center'}}>Comments</th>                             
                            <th style={{textAlign: 'center'}}>Publish Date</th>
                          </tr>
                      </thead>
                      <Page/>
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