import React from 'react';
import request from 'request';
import $ from 'jquery';
window.jQuery = $;
import Config from '../../config';
import Query from '../../query';

const Page = React.createClass({
  componentWillMount: function(){
    
    request({
        url: Config.scapholdUrl,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.token
        },
        body: Query.getPageListQry
      }, (error, response, body) => {
        if (body.data) {
          var datatable = $('#pageListTbl').DataTable();
          datatable.clear();
          $.each(body.data.viewer.allPosts.edges, function(key, item){
          
            var dt = new Date(item.node.createdAt);
            var date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
            var author = item.node.author?item.node.author.username:"";
            var slug = item.node.slug?item.node.slug:"";
            var status = item.node.status?item.node.status:"";
            datatable.row.add([
              '<input class="pageListCb" type="checkbox" id="cb-'+item.node.id+'" ></input>',
              '<a href="/admin/pages/edit/'+item.node.id+'" >'+item.node.title+'</a>',
              slug,
              '<a href="">'+author+'</a>',
              '<center>'+status+'</center>',
              '<center>'+item.node.comments.edges.length+'</center>',
              '<center>'+date+'</center>'
            ])
          });
          datatable.draw();
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

  handleDeleteBtn: function(event){
    var check = $("input.pageListCb:checked")[0].id.split("-")[1];

    const data = {
      "query": `
        mutation DeletePost($user: DeletePostInput!) {
          deletePost(input: $user) {
            changedPost {
              id
            }
          }
        }
      `,
      "variables": {
        "user": {
          "id": check
        }
      }
    };

    request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.token
      },
      body: data
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
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
                        <button className="btn btn-default btn-flat" style={{marginRight: 10}} id="editBtn" onClick={this.handleEditBtn}> Edit </button>
                        <button className="btn btn-default btn-flat" id="deleteBtn" onClick={this.handleDeleteBtn}> Delete </button>
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