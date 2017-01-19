import React from 'react';
import $ from 'jquery';
window.jQuery = $;

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
                      <th style={{textAlign: 'center'}}>Comments</th>                             
                      <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="checkbox"></input></td>                                
                    <td>Hidup tenang dengan meninggalkan dunia</td>
                    <td>Ardi Nugraha</td>
                    <td style={{textAlign: 'center'}}>5</td>                                
                    <td>Published 12/01/2017</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                
                    <td>Sunyi Sepi</td>
                    <td>Bayu Nugraha</td>
                    <td style={{textAlign: 'center'}}>13</td>                               
                    <td>Published 01/01/2017</td>
                  </tr>
                  <tr>
                    <td ><input type="checkbox"></input></td>                               
                    <td>Meninggalkan dunia</td>
                    <td>Sultan Nugraha</td>
                    <td style={{textAlign: 'center'}}> - </td>                              
                    <td>Published 12/12/2016</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                
                    <td>Karam Merdeka Sepi</td>
                    <td>Wulan Nugraha</td>
                    <td style={{textAlign: 'center'}}>4</td>                                
                    <td>Published 22/12/2016</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                
                    <td>Hidup tenang dengan meninggalkan dunia</td>
                    <td>damar Nugraha</td>
                    <td style={{textAlign: 'center'}}>1</td>                               
                    <td>Published 21/01/2017</td>
                  </tr>
                  <tr>
                    <td ><input type="checkbox"></input></td>                               
                    <td>Sunyi Sepi</td>
                    <td>kunir Nugraha</td>
                    <td style={{textAlign: 'center'}}>9</td>                               
                    <td>Published 14/01/2017</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                  
                    <td>Meninggalkan dunia</td>
                    <td>Sultan Nugraha</td>
                    <td style={{textAlign: 'center'}}>-</td>                                 
                    <td>Published 30/12/2016</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                  
                    <td>Karam Merdeka Sepi</td>
                    <td>Yudi Nugraha</td>
                    <td style={{textAlign: 'center'}}>-</td>                                
                    <td>Published 25/12/2016</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                
                    <td>Hidup tenang dengan meninggalkan dunia</td>
                    <td>Ardi Nugraha</td>
                    <td style={{textAlign: 'center'}}>-</td>                                
                    <td>Published 12/01/2017</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                
                    <td>Sunyi Sepi</td>
                    <td>Bayu Nugraha</td>
                    <td style={{textAlign: 'center'}}>2</td>                                
                    <td>Published 01/01/2017</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                
                    <td>Keroncong Indonesia</td>
                    <td>Waljinah</td>
                    <td style={{textAlign: 'center'}}>7</td>                               
                    <td>Published 12/12/2016</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                
                    <td>Singgung Neraca</td>
                    <td>Katimin</td>
                    <td style={{textAlign: 'center'}}>2</td>                            
                    <td>Published 22/12/2016</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                
                    <td>Menata Hari</td>
                    <td>Lukman</td>
                    <td style={{textAlign: 'center'}}>1</td>                                
                    <td>Published 21/01/2017</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                
                    <td>Besok Mau Makan Apa</td>
                    <td>Wulan</td>
                    <td style={{textAlign: 'center'}}>-</td>      
                    <td>Published 14/01/2017</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                  
                    <td>Elok di tepi Pantai</td>
                    <td>Sumarni</td>
                    <td style={{textAlign: 'center'}}>15</td>
                    <td>Published 30/12/2016</td>
                  </tr>
                  <tr>
                    <td><input type="checkbox"></input></td>                                  
                    <td>Hanya Gambaran</td>
                    <td>Ida</td>
                    <td style={{textAlign: 'center'}}>5</td>                                 
                    <td>Published 25/12/2016</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
       </div>
      </div>
    </section>
    </div>
		)},
});



export default Pages;