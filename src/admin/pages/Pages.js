import React from 'react';
import request from 'request';
import $ from 'jquery';
window.jQuery = $;
import Config from '../../config';

const Page = React.createClass({
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
              slug,
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
          var datatable = $('#pageListTbl').DataTable();
          datatable.clear();
          $.each(body.data.viewer.allPosts.edges, function(key, item){
          
            var dt = new Date(item.node.createdAt);
            var date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
            var author = item.node.author?item.node.author.username:"";
            var slug = item.node.slug?item.node.slug:"";
            datatable.row.add([
              '<input className="pageListCb" type="checkbox" id="cb-'+item.node.id+'" >',
              '<a href={"/admin/pages/edit/"'+item.node.id+' >'+item.node.title+'</a>',
              slug,
              '<a href="">'+author+'</a>',
              item.node.status,
              item.node.comments.edges.length,
              date
            ])
          });
          
          datatable.draw();
        //me.setState({content: list});
        //$('#pageListTbl').DataTable();
        }
    });
  },
  render: function() {
      return (
        <tbody><tr key="0"><td></td><td>Loading data...</td><td></td><td></td><td></td><td></td><td></td></tr></tbody>
      )
  }
});


const Pages = React.createClass({
  componentDidMount: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    require ('./Pages.css');
    $('#pageListTbl').DataTable();
  },

  handleSubmit: function(event) {
  var me = this;
  var id = $("#id").val();
  const data = {
    "query": `
      mutation DeletePost($input: DeletePostInput!) {
        deletePost(input: $input) {
          changedPost {
            id
          }
        }
      }
    `,
    "variables": {
      "input": {
        "id": id
      }
    }
  };

  request({
    url: "https://us-west-2.api.scaphold.io/graphql/scaphold-graphql",
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: data
  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log(JSON.stringify(body, null, 2));
    } else {
      console.log(error);
      console.log(response.statusCode);
    }
  });
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
                            <th style={{width:7}}><input type="checkbox" id="selectAll"></input></th>                            
                            <th style={{textAlign: 'center'}}>Title</th>
                            <th style={{textAlign: 'center'}}>Slug</th>
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