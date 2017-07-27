import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import uuid from 'uuid';


const widgetMap = {
    'search': {
        title: 'Search',
        description: 'A simple search widget',
        type: 'search'
    },
    'recent-post': {
        title: 'Recent Post',
        description: 'Show your latest post with this widget',
        type: 'recent-post'
    },
    'custom-html': {
        title: 'Custom HTML',
        description: 'Create your own widget using html tags + css + javascript',
        type: 'custom-html'
    }
}


class BoxItemSidebar extends React.Component {

    constructor(props){
        super(props);
        this.handleRemoveButton = this.handleRemoveButton.bind(this);
    }

    handleRemoveButton(e){
        this.props.removeSingleWidget(this.props.uuid)
    }
    
   render() {
      return (<div className="box box-default collapsed-box box-solid" style={{borderRadius: 0}}>
<div className="box-header with-border">
    <h3 className="box-title">{this.props.widget.title}</h3>
    <div className="box-tools pull-right">
        <button type="button" className="btn btn-box-tool btn-info" data-widget="collapse" title="Expand to setting widget">
            <i className="fa fa-plus"></i>
        </button>
        <button type="button" className="btn btn-box-tool btn-danger"  onClick={this.handleRemoveButton} >
            <i className="fa fa-times"></i>
        </button>
    </div>
</div>
<div className="box-body" style={{display: "none"}}>
    <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control"/>
    </div>
    <div className="form-group">
        <label htmlFor="title">Text</label>
        <textarea className="form-control" id="" name="" cols="30" rows="10"></textarea>
    </div>
    <button onClick={this.handleRemoveButton} className="btn btn-danger btn-xs">Remove</button>
    <button className="btn btn-success btn-xs pull-right">Save</button>
</div>
</div>
)
   }
}

const BoxItemAvailable = (props) => (<div className="box box-info box-solid">
    <div className="box-header with-border">
        <h3 className="box-title">{props.widget.title}</h3>
    </div>
    <div className="box-body">
        <p>{props.widget.description}</p>
    </div>
    <div className="box-footer text-center">
        <button id={props.widget.type} className="btn btn-default btn-xs" onClick={props.addToSidebar}>Add to Sidebar</button>
    </div>
</div>
)


class Widgets extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            sbWidgets : []
        }

        this.handleAddToSidebar = this.handleAddToSidebar.bind(this);
        this.handleClearAll = this.handleClearAll.bind(this);
        this.handleRemoveSingleWidget = this.handleRemoveSingleWidget.bind(this);
    }

    componentDidMount(){
        require ('../lib/jquery-sortable.js');
        require ('jquery-ui/themes/base/theme.css');
        require ('../../../public/css/AdminLTE.css');
        require ('../../../public/css/skins/_all-skins.css');
    var panelList = $('#dragablePanelList');
    panelList.sortable({
        group: 'nested',
        handle: '.box-header',
        onDragStart: function ($item, container, _super) {
          // Duplicate items of the no drop area
          if(!container.options.drop)
            $item.clone().insertAfter($item);
          _super($item, container);
        }
    });
    }

    handleAddToSidebar(e){
        e.preventDefault();
        var type = e.target.id
        this.setState(state => {
            var sbWidgets = state.sbWidgets;
            sbWidgets.push(<BoxItemSidebar widget={widgetMap[type]} uuid={uuid()} removeSingleWidget={this.handleRemoveSingleWidget}/>);
            return {sbWidgets: sbWidgets}
        });
    }

    handleClearAll(e){
        e.preventDefault();
        this.setState({sbWidgets: []});
    }

    handleRemoveSingleWidget(id){
            this.setState((prevState) => ({
                sbWidgets: _.filter(prevState.sbWidgets, (widget) => (widget.props.uuid !== id))
            })
        );
    
    }

	render(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
			<div className="container-fluid">
                
				<section className="content-header">
			      <h1>
			        Widget Management Page
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Widget</li>
			      </ol>
			      <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
			    </section>

                <div className="row">
                    <div className="col-md-4">
                        <div className="box box-default">
                            <div className="box-header with-border">
                                <h3 className="box-title">Sidebar</h3>
                            </div>
                            <div className="box-body">
                                <p>Drag each widget item into the order you prefer. Click the arrow on the right of the widget item to reveal additional configuration options. Click the close on the right of the widget item to remove widget.</p>
                                <ul id="dragablePanelList" className="widgets list-unstyled">
                                {_.map(this.state.sbWidgets, (widget, index) => (
                                    <li key={index}>
                                        {widget}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            <div className="box-footer">
                                <button onClick={this.handleClearAll} className="btn btn-danger">Clear All</button>
                                <button className="btn btn-success pull-right">Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 pull-right">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Available widgets</h3>
                            </div>
                            <div className="box-body">
                                <div className="row">
                                <ul  className="widgets no-drop list-unstyled">

                                    {_.map(_.keys(widgetMap), (key, index) => (
                                        <div className="col-md-12" key={index}>
                                            <BoxItemAvailable widget={widgetMap[key]} addToSidebar={this.handleAddToSidebar}/>
                                        </div>
                                    ))}

                                </ul>
                                                
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
		    </div>
            </div>
		)
	}
}

export default Widgets;
