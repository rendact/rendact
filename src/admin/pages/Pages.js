import React from 'react';
import request from 'request';
import $ from 'jquery';
window.jQuery = $;
import Config from '../../config';
import Query from '../../query';

const Page = React.createClass({
  componentDidMount: function(){
    var me = this;
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
          //var datatable = $('#pageListTbl').DataTable();
          
          var datatable = me.props.datatable;
          datatable.clear();
          $.each(body.data.viewer.allPosts.edges, function(key, item){
          
            var dt = new Date(item.node.createdAt);
            var date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
            var author = item.node.author?item.node.author.username:"";
            var slug = item.node.slug?item.node.slug:"";
            var status = item.node.status?item.node.status:"";
            datatable.row.add([
              '<input class="pageListCb" type="checkbox" id="cb-'+item.node.id+'" >',
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
  getInitialState: function(){
    require ('datatables');
    require ('datatables/media/css/jquery.dataTables.min.css');
    require ('./Pages.css');

    return {
      dt: null
    }
  },
  componentDidMount: function(){
    var datatable = $('#pageListTbl').DataTable({
      sDom: '<"H"r>t<"F"ip>',
    });
    
    datatable.columns(1).every( function () {
        var that = this;
 
        $( '#searchBox', this.footer() ).on( 'keyup change', function () {

            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
    
    this.setState({dt: datatable})
  },
  handleFilterBtn: function(){
    var status = $("#statusFilter").val();
    this.state.dt.columns(4).every( function () {
        this.search( status ).draw();
    } );
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
                          <button className="btn btn-default btn-flat" id="deleteBtn" style={{marginRight:10}} onClick={this.handleDeleteBtn}>Delete</button>
                          <select className="btn select" id="dateFilter" style={{marginRight:5,height:35}}>
                            <option>January 2017</option>
                          </select>
                          <select className="btn select" id="statusFilter" style={{marginRight:5,height:35}}>
                            <option value="">All</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                          <button className="btn btn-default btn-flat" id="filterBtn" onClick={this.handleFilterBtn}>Filter</button>
                        <input className="pull-right" placeholder="Search..." id="searchBox" />
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
                      <Page datatable={this.state.dt}/>
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