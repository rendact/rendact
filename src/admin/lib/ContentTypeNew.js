import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import Query from '../query';
import {riques, disableForm, errorCallback, 
        getConfig, defaultHalogenStyle, getFormData, modifyApolloCache} from '../../utils';
import {getTemplates} from '../../includes/Theme/includes';
import DatePicker from 'react-bootstrap-date-picker';
import Notification from 'react-notification-system';
import Halogen from 'halogen';
import { default as swal } from 'sweetalert2';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import {connect} from 'react-redux';
import {maskArea, setSlug, setVisibilityMode, togglePermalinkProcessState, setPostStatus, resetPostEditor,
        setCategoryList, setTagList, setImageGalleryList, setConnectionValue, 
        toggleSaveImmediatelyMode, toggleVisibilityIsChangedProcess, togglePermalinkEditingState,
        setPostContent, updateTitleTagLeftCharacter,
        updateMetaDescriptionLeftCharacter, setPostPublishDate, setFeaturedImage,
        setEditorMode, toggleImageGalleyBinded, setPageList, setAllCategoryList, setPostId,
        setOptions, setTagMap, loadFormData, toggleFeaturedImageBindingStatus} from '../../actions'
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {graphql, withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import Script from 'react-load-script'


class CkeditorField extends React.Component {
  constructor(props){
    super(props)

    this.onLoad = this.onLoad.bind(this)
    this.handleOnError = this.handleOnError.bind(this)
  }

  onLoad(){
    window.CKEDITOR.replace('content', {
      height: 400,
      title: false
    })

    for (var i in window.CKEDITOR.instances) {
      if (window.CKEDITOR.instances.hasOwnProperty(i)) {
        window.CKEDITOR.instances[i].on('change', this.props.handleContentChange)
      }
    }
  }

  handleOnError(){
  }

  render(){
    return (
      <div>
        <Field id="content" name="content" rows="25" component="textarea" wrap="hard" type="textarea" className="form-control" />
        <Script
          url="//cdn.ckeditor.com/4.7.3/standard/ckeditor.js"
          onError={this.handleOnError}
          onLoad={this.onLoad}
        />
      </div>
    )
  }
}

let ImageGalleryWidget = (props) => (
<div className="box box-info" style={{marginTop:20}}>
  <div className="box-header with-border">
    <h3 className="box-title">Image Gallery</h3>         
    <div className="pull-right box-tools">
      <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
      <i className="fa fa-minus"></i></button>
    </div>
  </div>
  <div className="box-body pad">
    <div>
      <input type="file" id="imageGallery" name="imageGallery" onChange={props.imageGalleryChange}/>
      {
        _.map(props.imageGallery, function(item, index){
          return <div key={index} >
            {item.value && <div className="margin" style={{width: 150, float: "left", position: "relative"}}>
          <a href="" onClick={props.handleImageClick}><img src={item.value} className="margin" style={{width: 150, height: 150, borderWidth: "medium", borderStyle: "solid", borderColor: "cadetblue", opacity: item.id === "customid" || item.toDelete ? 0.5 : 1}} alt={"gallery"+index}/></a>
          <button id={item.id+"-"+index} onClick={props.handleImageRemove} type="button" className="btn btn-info btn-sm" disabled={item.id==="customid" || item.toDelete} style={{top: 15, right: 5, position: "absolute"}}><i className="fa fa-times"></i></button>
          </div>}
          {item.message ? <p style={{color:'red', clear: 'left', position: 'absolute'}}>{item.message.toString()}</p> : null}
          </div>
        })
      }
    </div>                  
  </div>
</div>
)


let FeaturedImageWidget = (props) => (
<div className="box box-info" style={{marginTop:20}}>
  <div className="box-header with-border">
    <h3 className="box-title">Featured Image</h3>         
    <div className="pull-right box-tools">
      <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
      <i className="fa fa-minus"></i></button>
    </div>
  </div>
  <div className="box-body pad">
    <div>
      <input type="file" name="featuredImage" onChange={props.onChange} />
      { !_.isEmpty(props.featuredImage) &&
        <div style={{position: "relative", marginTop: 25}}>
          <img src={props.featuredImage.value} style={{width: "100%", opacity: props.featuredImage.id === 'customId'? 0.5 : 1}} alt={props.title}/> 
          <button onClick={props.onClick} disabled={props.featuredImage.id === 'customId'} type="button" className="btn btn-info btn-sm" style={{top: 15, right: 5, position: "absolute"}}><i className="fa fa-times"></i></button>
        </div>
      }
    </div>                  
  </div>
</div>
)



class TagWidget extends React.Component {
  constructor(props){
    super(props)

    this.handleOnUpdate = this.handleOnUpdate.bind(this)
  }

  handleOnUpdate(value){
    console.log(value)
  }
  render(){
    return (
      <div className="box box-info" style={{marginTop:20}}>
        <div className="box-header with-border">
          <h3 className="box-title">Tags</h3>         
          <div className="pull-right box-tools">
            <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
            <i className="fa fa-minus"></i></button>
          </div>
        </div>
        <div className="box-body pad">
          <div className="form-group" style={{width: '100%'}}>
              <ReactSelect.Creatable
                id="tag"
                name="form-field-name"
                value={this.props.postTagList}
                options={this.props.options}
                onChange={this.props.onChange}
                multi={true}
                isLoading={this.props.isLoading}
                disabled={this.props.isLoading}
              />
              <p><span className="help-block">Press enter after inputting tag</span></p>
          </div>
        </div>
      </div>
    )
  }
}



TagWidget = _.flowRight([
  withApollo,
  graphql(Query.getAllTags, {
    options: (props) => ({
      variables: {
        type: props.postType,
      }
    }),
    props: ({ownProps, data}) => {
      if (data.loading) {
        return {isLoading: true}
      } else if (data.error) {
        return {hasError: true, error: data.error}
      } else {
        let options = _.map(data.viewer.allTags.edges, item => (
          {id: item.node.id, value: item.node.name, label: item.node.name}
        ))

        return {
          isLoading: false,
          options,
        }
      }
    }
  })
])(TagWidget)

let PageHiererachyWidget = (props) => {
  let templates = getTemplates();
  return <div className="box box-info" style={{marginTop:20}}>
    <div className="box-header with-border">
      <h3 className="box-title">Page Attributes</h3>         
      <div className="pull-right box-tools">
        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
        <i className="fa fa-minus"></i></button>
      </div>
    </div>
    <div className="box-body pad">
      <div>
      <div className="form-group">
        <p><b>Parent</b></p>
        <Field id="parent" name="parent" component="select" disabled={props.isLoading} style={{widht: 250}}>
          {props.pageList}
        </Field>
      </div>
      <div className="form-group">
        <p><b>Page  Template</b></p>
        <Field name="pageTemplate" component="select" className="metaField" style={{width: 250}}>
        { templates ?
          templates.map(function(item, index){
            return (<option key={item.id}>{item.name}</option>)
          }) : ""
        }
        </Field>
      </div>
      <div className="form-group">
        <p><b>Order</b></p>
        <Field type="text" id="pageOrder" placeholder="0" name="order" style={{width:50}} min="0" step="1" component="input" data-bind="value:pageOrder"/>
      </div>
      </div>                  
    </div>
  </div>
}

const allPageListQry = gql`
query 
getPages{viewer {allPosts(where: {type: {eq: "page"}}) { edges { node { 
     id,title,slug,author{username},status,comments{edges{node{id}}},createdAt}}}}}
`

PageHiererachyWidget = graphql(allPageListQry, {
  props: ({ownProps, data}) => {
    if (data.loading) {
      return {isLoading: true, pageList: [(<option key="0" value="">(no parent)</option>)]}
    } else if (data.error) {
      return {hasError: true, error: data.error}
    } else {
      var pageList = [(<option key="0" value="">(no parent)</option>)];
      _.forEach(data.viewer.allPosts.edges, function(item){
        pageList.push((<option key={item.node.id} value={item.node.id} checked={ownProps.parent===item.node.id}>
          {item.node.title}</option>));
      });
      return {isLoading: false, pageList: pageList}
    }
  }
})(PageHiererachyWidget)

let CategoryWidget = (props) => (
    <div className="box box-info" style={{marginTop:20}}>
      <div className="box-header with-border">
          <h3 className="box-title">Category</h3>         
          <div className="pull-right box-tools">
            <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
              <i className="fa fa-minus"></i></button>
            </div>
          </div>
          <div className="box-body pad">
            <div>
            <div className="form-group">
              {props.isLoading ?
                <Halogen.PulseLoader color="#4DAF7C"/>                  
                  :
                _.map(props.allCategoryList, (cat, index) => {
                  return <div key={index}> 
                    <Field name={"categories." + cat.id} component="input" type="checkbox"/>
                    {cat.name}
                  </div>
                })
              }
            </div>
          </div>                  
        </div>
      </div>
)

let categoryQuery = gql`
query getCategories ($type: String!){
    viewer {
      allCategories (where: {type: {eq: $type}}) {
        edges {
          node {
            id,
            name,
            description,
            post {
              edges {
                node{
                  id
                }
              }
            }
          }
        }
      }
    }
}
`

CategoryWidget = graphql(categoryQuery,
  { 
    options: props => ({
      variables: {
        type: props.postType
      },
    }),
      props: ({ownProps, data}) => {
        if (data.loading){
          return {isLoading: true}
        } else if (data.error){
          return {hasError: true, error: data.error}
        } else {
          let allCategoryList = _.map(data.viewer.allCategories.edges, item => item.node)
          return {
            isLoading: false,
            allCategoryList: allCategoryList
          }
        }
      }
  }
)(CategoryWidget)

const PermalinkEditor = (props) => {
  return (
    <div className="form-inline">
      { !props.permalinkEditing ? 
        ( <p>Permalink: &nbsp;
          {props.mode==="update"?(
            <a id="permalink" href={props.rootUrl+'/'+props.permalink}>{props.rootUrl}/{props.permalink}</a>
            ) : (
            <a id="permalink" href="#">{props.rootUrl}/{props.permalink}</a>
            )
          }
          <button type="button" onClick={() => {props.dispatch(togglePermalinkEditingState(true))}} id="editBtn" className="btn btn-default" style={{height:25, marginLeft: 5, padding: "2px 5px"}}>
            <span style={{fontSize: 12}}>Edit</span>
          </button> 
          { props.permalinkInProcess && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
          </p>
        ) : (
          <p>Permalink: 
          <div className="form-group" id="permalinkcontent">
            <a id="permalink" href="#">{props.rootUrl}/</a>
            <input id="slugcontent" defaultValue={props.permalink} type="text" className="form-control" />
            <button type="button" className="btn btn-default" onClick={()=>{props.onCheckSlug(props.permalink)}}>OK</button>
          </div>
          { props.permalinkInProcess && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
          </p>
        )
      }
    </div>
  )
}

let NewContentTypeNoPostId = React.createClass({
  propTypes: {
    urlParams: React.PropTypes.object,
    isProcessing: React.PropTypes.bool.isRequired,
    opacity: React.PropTypes.number.isRequired,
    errorMsg: React.PropTypes.string,
    loadingMsg: React.PropTypes.string,
    title: React.PropTypes.string,
    permalink: React.PropTypes.string,
    content: React.PropTypes.string,
    category: React.PropTypes.string,
    summary: React.PropTypes.string,
    status: React.PropTypes.string,
    immediately: React.PropTypes.string,
    immediatelyStatus: React.PropTypes.bool,
    visibilityTxt: React.PropTypes.string,
    permalinkEditing: React.PropTypes.bool,
    mode: React.PropTypes.string,
    pageList: React.PropTypes.array,
    allCategoryList: React.PropTypes.array,
    postCategoryList: React.PropTypes.array,
    postTagListInit: React.PropTypes.array,
    postTagList: React.PropTypes.array,
    titleTagLeftCharacter: React.PropTypes.number,
    metaDescriptionLeftCharacter: React.PropTypes.number,
    publishDate: React.PropTypes.instanceOf(Date),
    publishDateReset: React.PropTypes.instanceOf(Date),
    titleTag: React.PropTypes.string,
    metaKeyword: React.PropTypes.string,
    metaDescription: React.PropTypes.string,
    permalinkInProcess: React.PropTypes.bool,
    featuredImage: React.PropTypes.object,
    imageGallery: React.PropTypes.array,
    tagMap: React.PropTypes.object,
    connectionValue: React.PropTypes.object,
    data: React.PropTypes.object,
    parent: React.PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      urlParams: {},
      isProcessing: false,
      opacity: 1,
      title: "",
      content: "",
      status:"Published",
      immediatelyStatus:true,
      visibilityTxt:"Public",
      permalinkEditing: false,
      mode: "create",
      postCategoryList: [],
      postTagListInit: [],
      postTagList: [],
      titleTagLeftCharacter: 65,
      metaDescriptionLeftCharacter: 160,
      publishDate: new Date(),
      publishDateReset: new Date(),
      permalinkInProcess: false,
      imageGallery: [],
      tagMap: {},
      connectionValue: {},
      data: {},
      parent: "",
    }
  },
  isWidgetActive: function(name){
    return _.indexOf(this.props.widgets, name) > -1;
  },
  checkSlug: function(permalink){
    var me = this;
    if (permalink===this.props.permalink) return;
    this.props.dispatch(togglePermalinkProcessState(true));
    this.props.client.query({
      query: gql`${Query.checkSlugQry(permalink).query}`,
    }).then(data => {
      let slugCount = data.data.viewer.allPosts.edges.length;
      if (slugCount > 0) me.props.dispatch(setSlug(permalink+"-"+slugCount, false));
      else me.props.dispatch(setSlug(permalink, false));
      this.props.dispatch(togglePermalinkProcessState(false));
    }).catch(({error}) => errorCallback(error, error, "Check Slug"))
      
  },
  saveImmediately: function(event){
    var hours = this.props.hours;
    var minute = this.props.minutes;
    var time = this.props.publishDate + hours + minute;
    this.props.dispatch(toggleSaveImmediatelyMode(false, time));
  },

  disableForm: function(isFormDisabled){
    disableForm(isFormDisabled, this.notification);
    this.props.dispatch(maskArea(isFormDisabled));
  },

  componentWillReceiveProps: function(props){
    console.log("nextProps", props)
    if (props.data !== this.props.data){
      if (props.data && (window.CKEDITOR && !window.CKEDITOR.instances['content'].getData())){
        window.CKEDITOR.instances['content'].setData(props.data.content)
      }
      props.initialize(props.initialValues)
      props.dispatch(setTagList(props._postTagList, props._postTagList))
      props.dispatch(setPostStatus(props.data.status))
      
      props.titleTag && props.dispatch(updateTitleTagLeftCharacter(65-(props.titleTag.length)));
      props.metaDescription && props.dispatch(updateMetaDescriptionLeftCharacter(160-(props.metaDescription.length)));
    } 
    if ((this.props.isLoadPost && !props.isLoadPost)){
      disableForm(false, this.notification)
      props.dispatch(maskArea(false))
    } 

    if (props.visibilityTxt !== this.props.visibilityTxt && !this.props.visibilityIsChangedProcess){
      // set visibilityTxtTemp to this.props.visibilityTxt
      // when visibilityIsChangedProcess is false and
      // props.visibilityTxt !== this.props.visibilityTxt
      props.dispatch(setVisibilityMode(this.props.visibilityTxt))
      props.dispatch(toggleVisibilityIsChangedProcess(true))
    }

},
  resetForm: function(){
    this.props.handleNav(this.props.slug, "new", null, null, () => {
      this.props.dispatch(resetPostEditor());
      this.props.destroy()
      this.props.dispatch(setTagList([], []))
      $(".menu-item").removeClass("active");
      $("#menu-posts-new").addClass("active");
    })
  },
  getMetaFormValues: function(v){
    var out = getFormData("metaField");
    return out;
  },

  formatDate: function(date){
    var min = date.getMinutes();
    if (min.length<2) min = "0"+min;
    return date.getDate()+"/"+(1+date.getMonth())+"/"+date.getFullYear()+" "+date.getHours()+":"+min;
  },
  notifyUnsavedData: function(state){
    if (this.props.handleUnsavedData){
      this.props.handleUnsavedData(state)
    }
  },
  handleTitleChange: function(event){
    this.notifyUnsavedData(true);
  },

  handleContentChange: function(event){
    var content = window.CKEDITOR.instances['content'].getData();
    this.props.change('content', content)
    this.notifyUnsavedData(true);
  },

  handleTitleTagChange: function(event){
    var titleTag = event.currentTarget.value;
    this.props.dispatch(updateTitleTagLeftCharacter(65-(titleTag.length)));
    this.notifyUnsavedData(true);
  },
  handleMetaDescriptionChange: function(event){
    var metaDescription = event.currentTarget.value;
    this.props.dispatch(updateMetaDescriptionLeftCharacter(160-(metaDescription.length)));
    this.notifyUnsavedData(true);
  },
  handleDateChange: function(date){
    this.props.dispatch(setPostPublishDate(new Date(date), false));
    this.notifyUnsavedData(true);
  },
  handleTimeChange: function(event){
    var hours = this.props.hours;
    var minutes = this.props.minutes;
    var d = this.props.publishDate;
    d.setHours(parseInt(hours, 10));
    d.setMinutes(parseInt(minutes, 10));
    this.props.dispatch(setPostPublishDate(d, false));
    this.notifyUnsavedData(true);
  },
  handlePublishDateCancel: function(event){
    var resetDate = this.props.publishDateReset;
    this.props.dispatch(setPostPublishDate(resetDate, false));
  },

  featuredImageRemove: function(e){
    this.props.removeImageGallery({
      variables: {
        input: {
          id: this.props.featuredImage.id
        }
      },
      optimisticResponse: {
        __typename: "DeleteFilePayload",
        deleteFile: {
          __typename: "File",
          changedFile: {
            id: this.props.featuredImage.id,
            type: "featuredImage",
            value: "",
            blobUrl: ""
          }
        }
      },
      update: (store, data) =>  {
        let featuredImage = data.data.deleteFile.changedFile;
        if (this.props.postId){
          let modifier;

          modifier = (toDelete) => {

            if (!featuredImage.blobUrl){
              toDelete.getPost.imageFeatured = {...toDelete.getPost.imageFeatured, id:"customId", toDelete: true}
            }else{
              toDelete.getPost.imageFeatured = null
            }

            return toDelete
          }

          modifyApolloCache(
            {
              query: Query.getPost,
              variables: {
                id: this.props.urlParams.postId
              }
            },
            store,
            modifier
          )
        } else {
          if (!featuredImage.blobUrl){
            this.props.setFeaturedImage({
              ...featuredImage, 
              blobUrl: this.props.featuredImage.value,
              id: "customId"
            })
          } else {
            this.props.setFeaturedImage({})
          }
        }
      }
    }).then(data => console.log(data))
  },

  featuredImageChange: function(e){
    var me = this;
    var reader = new FileReader();
    let file = e.target.files[0]
    this.props.dispatch(toggleFeaturedImageBindingStatus(true))

    reader.onload = (event) => {
      let data = {
        blobFieldName: 'myBlobField',
        featuredImageConnectionId: me.props.urlParams.postId || null,
        type: "featuredImage",
        myBlobField: file
      }

      let mutate;

      if (!this.props.featuredImage.id){
        mutate = me.props.addImageGallery
      } else {
        mutate = me.props.updateFeaturedImage
        data = {
          id: me.props.featuredImage.id,
          blobFieldName: 'myBlobField',
          type: "featuredImage",
          myBlobField: file
        }
      }

      mutate({
        variables: {
          input: data
        },
        optimisticResponse: {
          updateFile: {
            __typename: "",
            changedFile: {
              __typename: "",
              id: 'customId',
              value: reader.result,
              type: "",
              blobMimeType: "",
              blobUrl: reader.result
            }
          }
        },
        update : (store, data) => {
          let featuredImage;
          if(data.data.updateFile){
            featuredImage = data.data.updateFile.changedFile;
          } else {
            featuredImage = data.data.createFile.changedFile;
          }

          if(this.props.urlParams.postId){

          let modifier = (toModify) => {
            toModify = _.cloneDeep(toModify)

            if(featuredImage.id === 'customId'){
              toModify.getPost.imageFeatured = {...toModify.getPost.imageFeatured, blobUrl: reader.result, id: 'customId'}
            } else {
              toModify.getPost.imageFeatured = {...toModify.getPost.imageFeatured, ...featuredImage}
            }
            return toModify
          }

          modifyApolloCache({query: Query.getPost, variables: {id : this.props.urlParams.postId}},
            store,
            modifier
          )
          }else{
            this.props.setFeaturedImage({...featuredImage, value: featuredImage.blobUrl})
          }


        }
      }).then(data => {
        console.log(data)
        document.querySelector("input[type='file'][name='featuredImage']").value = null
      })
    }

    if (file){
      reader.readAsDataURL(file);
    }

  },
  _emulateDataForSaving: function(v){
    var output = {};
    var fields = ["id","title","type","content","order","deleteData",
    "featuredImage","slug","status","publishDate","passwordPage","parent","summary","visibility","authorId"];
    _.forEach(fields, function(item){
      if (v[item]) output[item] = v[item];
    });
    
    output["type"] = this.props.postType;
    output["authorId"] = localStorage.getItem('userId');
    output["slug"] = this.props.permalink;

    if (this.props.immediatelyStatus){
      output["publishDate"] = new Date();
      this.props.dispatch(setPostPublishDate(output.publishDate, false))
    } else {
      output["publishDate"] = this.props.publishDate
    }

    if (["Public", "Private"].indexOf(output.visibility) === -1){
      output.visibility = "Public"
    }
    return output;
  },
  onSubmit: function(v, status) {
    if (status) {
      this.props.dispatch(setPostStatus(status))
      v.status = status
    }
    var me = this;
    if (v.status === "Published" || v.status === "Draft" || v.status === "Reviewing") {
      if (v.title === null || v.title.length<=3) {
        this._errorNotif('Title is too short');
        return;
      }
    }

    if (v.metaDescription && v.metaDescription.length > 160){
      this._errorNotif('Meta Description is too long...!!')
      return;
    }
    var _objData = this._emulateDataForSaving(v);
    var qry = "", noticeTxt = "";
    let mutate;
    if (this.props.mode==="create"){
      qry = this.props.createQuery(_objData);
      noticeTxt = this.props.name+' Published!';
      mutate = this.props.createPostQuery

    }else{
      _objData["id"] = this.props.urlParams.postId;
      qry = this.props.updateQuery(_objData);
      noticeTxt = this.props.name+' Updated!';
      mutate = this.props.updatePostQuery
    }
    var metaDataList = me.getMetaFormValues();
    this.disableForm(true)

    mutate({
      variables: {
        input: _objData
      },
    }).then(data => {
      let postId ;
      
      if (me.props.mode==="create"){
        postId = data.data.createPost.changedPost.id;
      } else {
        postId = data.data.updatePost.changedPost.id;
      }

      // prosess metadata

      const processMetadata = () => {

        if (metaDataList.length > 0) {
          return this.props.client.mutate({
            mutation: gql`${Query.createUpdatePostMetaMtn(postId, metaDataList).query}`
          })
        }
      }

      const processCategory = () => {
        if (me.isWidgetActive("category")) {
          // process categories
          let categToSave = []

          _.forEach(_.keys(v.categories), key => {
            if (v.categories[key]) categToSave.push(key)
          })

          //let currentCat = _.keys(me.props.postCategoryList)
          let currentCat = me.props.postCategoryList

          var catQry = Query.createUpdateCategoryOfPostMtn(postId, currentCat, categToSave);
          if (catQry) return this.props.client.mutate({
            mutation: gql`${catQry.query}`,
            variables: catQry.variables
          })
        }
      }

      const processBinding = () => {
        return this.bindPostToImageGallery(postId)
      }

      const processBindingFeaturedImage = () => {
        if (this.props.mode === "create"){
          return new Promise((resolve, reject) => {
              this.props.updateFeaturedImage({
              variables: {
                input: {
                  id: this.props.featuredImage.id,
                  featuredImageConnectionId: postId
                }
              }
              }).then(data => {
                resolve(data)
                this.props.dispatch(toggleFeaturedImageBindingStatus(false))
              }).catch(error => {
                reject(error)
              })
            })
        } else {
          return Promise.resolve()
        }
      }


      const processTag = () => {

        if (me.isWidgetActive("tag")) {
          let tagMap = {}
          _.forEach(me.props.options, function(item){
              tagMap[item.name] = {id: item.id, name: item.name}
          })
          var tagQry = Query.createUpdateTagOfPostMtn(postId, me.props.postTagListInit, me.props.postTagList, tagMap);

          if (tagQry)
            return this.props.client.mutate({
              mutation: gql`${tagQry.query}`,
              variables: tagQry.variables
            })
        } 
      }

      let promise = _.reduce([processBindingFeaturedImage, processBinding, processMetadata, processCategory, processTag], (prev, task) => {
        return prev.then(() =>  task()).catch(error => this._errorNotif(error.message))
      }, Promise.resolve())

      promise.then(() => {
        this.disableForm(false)
        this._successNotif(noticeTxt)
        this.notifyUnsavedData(false)
        this.props.handleNav(me.props.slug, "edit", postId)
        if (this.props.mode==="update"){
          this.props.postRefetch()
        }
        this.props.dispatch(setEditorMode("update"))
        this.props.dispatch(setPostId(postId))
      }).catch(error => this._errorNotif(error.message))
    })

  },
  _errorNotif: function(msg){
    this.notification.addNotification({
      title: 'Error',
      message: msg,
      level: 'error',
      position: 'tr'
    });
  },
  _successNotif: function(msg){
    this.notification.addNotification({
      message: msg,
      level: 'success',
      position: 'tr',
      autoDismiss: 2
    });
  },
  imageGalleryChange: function(e){
    var me = this;
    var reader = new FileReader();
    let file = e.target.files[0]
    reader.onload = function(){
      if (!me.props.postId) me.props.dispatch(toggleImageGalleyBinded(true));
      me.props.addImageGallery({
        variables: {
          input: {
            type: "gallery",
            value: reader.result,
            postId: me.props.urlParams.postId || null,
            blobFieldName: "myBlobField",
            myBlobField: file
          }
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createFile: {
            __typename: 'CreateFilePayload',
            changedFile: {
              __typename: 'File',
              type: "gallery",
              value: reader.result,
              postId: me.props.urlParams.postId,
              blobFieldName: 'myBlobField',
              id: "customid",
              blobMimeType: null,
              blobUrl: reader.result
            }
          }
        },
        update: (store, data) => {
          let image = data.data.createFile.changedFile
          const modifier = (toModify) => {
            toModify.getPost.file.edges = [{node: {...image}, __typename: "FileEdge"}, ...toModify.getPost.file.edges]
            return toModify
          }
          if (me.props.urlParams.postId){
            modifyApolloCache(
              {
                query: Query.getPost,
                variables: {
                  id: me.props.urlParams.postId
                }
              },
              store,
              modifier
            )

          } else {
            // this process imageGallery on create mode
            let imageGallery = _.cloneDeep(me.props.imageGallery)

            if (!imageGallery.length){
              imageGallery.push({id: image.id, value: image.value})
            } else {
              if (imageGallery[0].value === image.value) {
                imageGallery.splice(0, 1, {id: image.id, value: image.value})
              } else {
                imageGallery.splice(0, 0, {id: image.id, value: image.value})
              }
            }

            me.props.setImageGallery(imageGallery)
          }
        }
      }).then(data => {
        console.log("addImageGallery mutation result", data)
        document.getElementById("imageGallery").value=null;
      }).catch(error => {
        me._errorNotif(error.message)
      });
    }
    reader.readAsDataURL(file);
  },
  handleImageClick: function(e){
    e.preventDefault();
    
    swal({
      imageUrl: e.target.src,
      imageWidth: "100%",
      animation: true,
      customClass: 'imageSwal',
      confirmButtonText: 'Close'
    })
  },

  bindPostToImageGallery: function(postId){
    var me = this;
      return new Promise((resolve, reject) => {
        if (me.props.imageGallery.length>0 && me.props.imageGalleryUnbinded) {
          var qry = Query.bindImageGallery(me.props.imageGallery, postId);

          me.props.client.mutate({
            mutation: gql`${qry.query}`,
            variables: qry.variables,
          }).then((data) => {
            me.props.dispatch(toggleImageGalleyBinded(false))
          })
        }

        resolve("hello world")
      })
  },

  handleImageRemove: function(e){
    var me = this;
    var id = e.currentTarget.id;
    var index = id.split("-")[1];
    var imageId = id.split("-")[0];

    this.props.removeImageGallery({
      variables: {
        input : {
          id: imageId
        }
      },
      optimisticResponse: {
        deleteFile: {
          changedFile: {
            id: imageId,
            type: "",
            value: "",
            blobMimeType: "",
            blobUrl: "",
            __typename: ""
          },
          __typename: ""
        }
      },
        update: (store, data) => {
          let image = data.data.deleteFile.changedFile
          if (me.props.urlParams.postId){
            const modifier = (toModify) => {
                if (!image.value) {
                  toModify.getPost.file.edges = _.map(toModify.getPost.file.edges, item => {
                    if (item.node.id === image.id) {
                      item.node.id = "customid"
                      item.node.toDelete = true
                    }
                    return item
                  })
                } else {
                  toModify.getPost.file.edges = _.filter(toModify.getPost.file.edges, item => item.node.id !== imageId)
                }

                return toModify
            }

            modifyApolloCache({query: Query.getPost, variables: {id: me.props.urlParams.postId}},
              store,
              modifier
            )
          } else {
            let imageGallery = _.cloneDeep(me.props.imageGallery)

            if(!image.value){
              imageGallery = _.map(imageGallery, item => {
                if(item.id === image.id){
                  item.toDelete = true
                } return item
              })
            } else {
              imageGallery = _.filter(imageGallery, item => item.id !== imageId)
            }

            me.props.setImageGallery(imageGallery)
          }
        }
    }).then(data => {
      console.log("remove mutation returned data ", data)
      document.getElementById("imageGallery").value=null
    }).catch(error => {
      this._errorNotif(error.message)
    })
  },
  _genReactSelect: function(contentId){
    var me = this;
    var getConnectionOptions = function(input) {
      me.props.client.query({
        query: gql`${Query.getContentPostListQry("All", contentId).query}`}).then(data => {
          let options = _.forEach(data.data.viewer.allPosts.edges, item => ({value: item.node.slug, label: item.node.title}));
          return {options: options}
        }).then(out => out)    
    }

    var handleSelectConnectionChange = function(newValue) {
      var _connectionValue = me.props.connectionValue;
      _connectionValue[contentId] = newValue
      me.props.dispatch(setConnectionValue(_connectionValue));
    }

    return (
      <ReactSelect.Async
        name={contentId}
        value={this.props.connectionValue[contentId]}
        loadOptions={getConnectionOptions}
        onChange={handleSelectConnectionChange}
        connectedContent={contentId}
      />
    )
  },
  componentWillMount: function(){
    if (!_.isEmpty(this.props.urlParams) && this.props.isLoadPost){
      this.disableForm(true)
    }
  },
 
  componentDidMount: function(){
    this.notification = this.refs.notificationSystem;
  },

  handleStatusOk: function(e){
    e.preventDefault()
    this.props.dispatch(setPostStatus(this.props.statusTxt))
  },

  handleVisibilityOk: function(e) {
    this.props.dispatch(toggleVisibilityIsChangedProcess(false))
  },

  handleVisibilityCancel: function(e) {
    this.props.change("visibility", this.props.visibilityTxtTemp)
    this.props.dispatch(toggleVisibilityIsChangedProcess(false))
  },

  render: function(){
    var rootUrl = getConfig('rootUrl');
    var templates = getTemplates();
    var me = this;
    
    const newPost=(
      <div className="content-wrapper">
          <Notification ref="notificationSystem" />
        <div className="container-fluid">
          <section className="content-header"  style={{marginBottom:20}}>
              <h1>{this.props.mode==="update"?"Edit Current "+this.props.name:"Add New "+this.props.name}
                { this.props.mode==="update" &&
                <small style={{marginLeft: 5}}>
                  <button className="btn btn-default btn-primary add-new-post-btn" onClick={()=>{this.resetForm()}}>Add new</button>
                </small>
              }
              </h1>
                <ol className="breadcrumb">
                  <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                  <li><a href="#" onClick={function(){this.props.handleNav(this.props.slug)}.bind(this)}>
                    {this.props.name}</a></li>
                  <li className="active">{this.props.mode==="update"?"Edit "+this.props.name:"Add New"}</li>
                </ol>
               <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
          </section>

          <form  id="postForm" method="get" style={{opacity: this.props.opacity}}>
          { this.props.isProcessing &&
          <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
          }
          <div className="col-md-8">
            <div className="form-group"  style={{marginBottom:30}}>
              <div>
                <Field name="title" component="input" type="text" className="form-control"
                  placeholder="Input Title Here" onChange={this.handleTitleChange} onBlur={(e) => {this.checkSlug(e.currentTarget.value.split(" ").join("-").toLowerCase())}} style={{marginBottom: 20}}/>
                <PermalinkEditor rootUrl={rootUrl} onCheckSlug={this.checkSlug} {...this.props} />

                <CkeditorField 
                  handleContentChange={this.handleContentChange}
                  content={this.props.data.content}
                />

                <div id="trackingDiv"></div>
              </div>
            </div>
            
            <div className="box box-info" style={{marginTop:20}}>
              <div className="box-header with-border">
                <h3 className="box-title">Summary</h3>         
                <div className="pull-right box-tools">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fa fa-minus"></i></button>
                </div>
              </div>
              <div className="box-body pad">
              <Field id="summary" name="summary" rows="5" component="textarea" wrap="hard" style={{width: '100%'}} onChange={()=>{this.notifyUnsavedData(true)}} />
              </div>
            </div>

            <div className="box box-info" style={{marginTop:20}}>
              <div className="box-header with-border">
                <h3 className="box-title">SEO</h3>         
                <div className="pull-right box-tools">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                    <i className="fa fa-minus"></i></button>
                </div>
              </div>
              <div className="box-body pad">
                <div className="form-horizonral">
                  <div className="form-group">
                    <div className="col-md-4">Preview</div>
                    <div className="col-md-8">
                      <p><a href="#">{this.props.title===""?"No Title":this.props.title.substring(0,71)}</a></p>
                      <p>{this.props.content===""?"":this.props.content.substring(0,100).replace(/(<([^>]+)>)/ig,"")}</p>
                      <p><span className="help-block"><a style={{color: 'green'}}>{rootUrl}/{this.props.permalink}</a> - <a>Cache</a> - <a>Similar</a></span></p>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Title Tag</p></div>
                    <div className="col-md-8">
                      <Field id={this.props.metaIds? this.props.metaIds.titleTag: null} name="titleTag" component="input" type="text" className="form-control metaField" 
                        style={{width: '100%'}} placeholder={this.props.title} onChange={this.handleTitleTagChange} />
                      <span className="help-block" style={{color: this.props.titleTagLeftCharacter < 0? '#f74747' : ''}}>Up to 65 characters recommended<br/>
                        {this.props.titleTagLeftCharacter} characters left</span>                     
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Meta Description</p></div>
                    <div className="col-md-8">
                      <Field id={this.props.metaIds ? this.props.metaIds.metaDescription: null} name="metaDescription" component="textarea" type="textarea" className="form-control metaField"                         rows='2' style={{width:'100%'}} placeholder={this.props.summary} onChange={this.handleMetaDescriptionChange} />
                      <span className="help-block" style={{color: this.props.metaDescriptionLeftCharacter < 0? '#f74747' : ''}}>160 characters maximum<br/>
                      {this.props.metaDescriptionLeftCharacter} characters left</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Meta Keywords</p></div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <Field id={this.props.metaIds ? this.props.metaIds.metaKeyword: null} name="metaKeyword" component="input" type="text" className="form-control metaField" style={{width: '100%'}} />
                        <span className="help-block"><b>News keywords </b><a>(?)</a></span>
                      </div>
                    </div>
                  </div>
                </div> 
                </div>
              </div> 
                                
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-md-12">  
                  <div className="box box-info">
                    <div className="box-header with-border">
                      <div className="pull-right box-tools">
                            <button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse" className="btn btn-box-tool ">
                              <i className="fa fa-minus"></i></button>
                          </div>         
                    </div>
                    <div className="box-body pad">
                      
                       <div className="form-group">
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-pushpin" style={{marginRight:10}}></span>
                          Status: <b>{this.props.status} </b>
                          <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#statusOption"> Edit </button></p>
                          <div id="statusOption" className="collapse">
                            <div className="form-group">
                                <Field id="statusSelect" name="statusSelect" component="select" style={{marginRight: 10, height: 30}}>
                                  <option value="Published">Published</option>
                                  <option value="Reviewing">Reviewing</option>
                                </Field>
                                <button type="button" onClick={this.handleStatusOk} className="btn btn-flat btn-xs btn-primary" 
                                style={{marginRight: 10}} data-toggle="collapse" data-target="#statusOption">OK</button>
                                <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#statusOption">Cancel</button>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-sunglasses" style={{marginRight:10}}></span>Visibility: <b>{this.props.visibilityTxt} </b>
                          <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" onClick={this.handleVisibilityCancel} data-target="#visibilityOption"> Edit </button></p>
                          <div id="visibilityOption" className="collapse">
                            <div className="radio">
                              <label>
                                <Field id="public" name="visibility" component="input" type="radio" value="Public" />
                                Public
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <Field id="private" name="visibility" component="input" type="radio" value="Private" />
                                Private
                              </label>
                            </div>
                            <div className="form-inline" style={{marginTop: 10}}>
                              <button type="button" onClick={this.handleVisibilityOk} className="btn btn-flat btn-xs btn-primary" 
                              style={{marginRight: 10}} data-toggle="collapse" data-target="#visibilityOption">OK</button>
                              <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" onClick={this.handleVisibilityCancel} data-target="#visibilityOption">Cancel</button>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <p><span className="glyphicon glyphicon-calendar" style={{marginRight: 10}}></span>{this.props.immediatelyStatus===true?
                            (<span>Publish <b>Immediately </b></span>):<span>Published at <b>{this.formatDate(this.props.publishDate)}</b> </span>} 
                          <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#scheduleOption"> Edit </button></p>

                          <div id="scheduleOption" className="collapse">
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-6">
                                  <DatePicker id="datepicker" style={{width: "100%", padddingRight: 0, textAlign: "center"}} value={this.props.publishDate.toISOString()} onChange={this.handleDateChange}/>
                                </div>
                                <div className="col-md-6">
                                  <Field name="hours" component="input" type="text" className="form-control" style={{width: 30, height: 34, textAlign: "center"}}  onChange={this.handleTimeChange} />
                                  <Field name="minutes" component="input" type="text" className="form-control" style={{width: 30, height: 34, textAlign: "center"}}  onChange={this.handleTimeChange} />
                                </div>
                              </div>
                              <div className="form-inline" style={{marginTop: 10}}>
                                <button type="button" id="immediatelyOkBtn" onClick={this.saveImmediately} className="btn btn-flat btn-xs btn-primary" 
                                style={{marginRight: 10}} data-toggle="collapse" data-target="#scheduleOption"> OK </button>
                                <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#scheduleOption" onClick={this.handlePublishDateCancel}>Cancel</button>
                              </div>
                            </div>
                          </div>
                      </div> 
                    </div>
                    <div className="box-footer">
                      <div className="form-group pull-right">
                        <button type="button" className="btn btn-default btn-flat disabled" style={{marginRight: 5}}>Preview</button> 
                          <div className="btn-group">
                            <button type="submit" onClick={this.props.handleSubmit(v => this.onSubmit(v, this.props.status))} id="publishBtn" className="btn btn-primary btn-flat">{this.props.mode==="update"?"Save":"Publish"}</button>
                            <button type="button" className="btn btn-primary btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <span className="caret"></span>
                              <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu" role="menu">
                              <li><button onClick={this.props.handleSubmit(v => this.onSubmit(v, 'Draft'))} className="btn btn-default btn-flat">{this.props.status!=="Draft"?"Save As Draft":""}</button></li>
                            </ul>
                          </div>
                      </div>        
                    </div>
                  </div>

                  { this.isWidgetActive("pageHierarchy") &&
                      <PageHiererachyWidget parent={this.props.parent}/>
                  
                  }

                  { this.isWidgetActive("category") &&
                      <CategoryWidget postType={this.props.postType}/>
                  }

                  { this.isWidgetActive("tag") &&
                      <TagWidget 
                        postTagList={this.props.postTagList} 
                        onChange={(value)=>{this.props.dispatch(setTagList(this.props.postTagListInit, value))}}
                        postType={this.props.postType}
                        postId={this.props.postId || "undefined"}
                      />
                  }

                  { this.isWidgetActive("featuredImage") &&
                      <FeaturedImageWidget
                        title={this.props.title}
                        featuredImage={this.props.featuredImage}
                        onClick={this.featuredImageRemove}
                        onChange={this.featuredImageChange}
                      />
                  
                  }

                  { this.isWidgetActive("imageGallery") &&
                      <ImageGalleryWidget
                        imageGallery={this.props.imageGallery}
                        handleImageClick={this.handleImageClick}
                        handleImageRemove={this.handleImageRemove}
                        imageGalleryChange={this.imageGalleryChange}
                      />
                  }

                  {
                    this.props.customFields && this.props.customFields.map(function(item){
                      var form;
                      if (item.type === "text" || item.type === "number")
                        form = (<Field id={me.props.metaIds? me.props.metaIds[item.id] : null} name={item.id} className="form-control metaField" type="text" component="input" style={{width: '100%'}}/>)
                      if (item.type === "date")
                        form = (<DatePicker id={item.id} name={item.id} style={{width: "100%", padddingRight: 0, textAlign: "center"}} value={this.props.publishDate.toISOString()} onChange={this.handleDateChange}/>)
                      if (item.type === "connection") {
                        form = this._genReactSelect(item.connection)
                      }
                      return <div key={item.id} className="box box-info" style={{marginTop:20}}>
                        <div className="box-header with-border">
                          <h3 className="box-title">{item.label}</h3>         
                          <div className="pull-right box-tools">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i className="fa fa-minus"></i></button>
                          </div>
                        </div>
                        <div className="box-body pad">
                          {form}
                        </div>
                      </div>
                    }.bind(this))
                  }

              </div>
            </div>
          </div>
          </form>
        
        </div>
      </div>
      )
  return newPost;

}
});

let selector = formValueSelector("newContentForm")

const mapStateToProps = function(state, ownProps){
  let ctn = state.contentTypeNew
  let customProps = {
    titleTag : selector(state, 'titleTag'),
    metaDescription: selector(state, 'metaDescription'),
    metaKeyword: selector(state, 'metaKeyword'),
    visibilityTxt: selector(state, 'visibility'),
    statusTxt : selector(state, 'statusSelect'),
  }

  let imageGallery = ownProps.imageGallery || []
  let featuredImage = ownProps.featuredImage || {}

  return {
    ...ctn,
    ...state.maskArea,
    ...customProps,
    imageGallery,
    featuredImage
  }

}

NewContentTypeNoPostId = _.flow([
  connect(mapStateToProps),
  graphql(Query.updateFeaturedImage, {name: 'updateFeaturedImage'}),
  graphql(gql`${Query.getUpdatePostQry().query}`, {name: 'updatePostQuery'}),
  graphql(gql`${Query.getCreatePostQry().query}`, {name: 'createPostQuery'}),
  graphql(gql`${Query.addImageGallery().query}`, {name: 'addImageGallery'}),
  graphql(gql`${Query.removeImageGallery().query}`, {name: 'removeImageGallery'}),
  withApollo,
])(NewContentTypeNoPostId)


NewContentTypeNoPostId = reduxForm({
  form: 'newContentForm'
})(NewContentTypeNoPostId)


const mapResultToProps = ({ownProps, data}) => {
    if (data.loading){
      return {
        isLoadPost: true,
        data: {},
      }
    } else if (data.error) {
      return {
        isLoadPost: false,
        hasError: true,
        data: {},
      }
    } else {

      let initials = {};
      let v = data.getPost

      let fields = ["id","title","type","content","order","deleteData",
      ,"slug","status","publishDate","passwordPage","parent","summary","visibility","authorId"];
      _.forEach(fields, function(item){
        if (data.getPost) initials[item] = data.getPost[item];
      });


      // setting the meta values

      let metaIds = {}

      if (data.getPost.meta.edges.length) {
        _.forEach(data.getPost.meta.edges, meta => {
          metaIds[meta.node.item] = meta.node.id
          if(meta.node.value){
            initials[meta.node.item] = meta.node.value
          }
        })
      }

      // setting content
      var pubDate = v.publishDate? new Date(v.publishDate) : new Date();
      initials["hours"] = pubDate.getHours();
      initials["minutes"] = pubDate.getMinutes();
      initials["publishDate"] = pubDate;

      // setting category
      initials.categories = {};
      let postCategoryList = []
      if (data.getPost.category.edges.length>0) {
        _.forEach(data.getPost.category.edges, cat => {
          if (cat.node.category){
            initials.categories[cat.node.category.id] = true
            postCategoryList.push([cat.node.category.id, cat.node.id]);
          }
        })
      }

      // setting tag list
      var _postTagList = [];
      if (v.tag && v.tag.edges.length>0) {
        _.forEach(v.tag.edges, function(i){
          if (i.node.tag){
            _postTagList.push({
              id: i.node.tag.id,
              value: i.node.tag.name,
              name: i.node.tag.name,
              label: i.node.tag.name,
              connectionId: i.node.id
            });
          }
        });
      }

      // set gallery 
      var _imageGalleryList = [];    
      if (v.tag && v.file.edges.length>0) {
        _.forEach(v.file.edges, function(i){
          if (i.node.blobUrl){
            _imageGalleryList.push({id: i.node.id, value: i.node.blobUrl, toDelete: i.node.toDelete});
          }
        });
      }

      // set featured image

      let featuredImage = {}
      if (v.imageFeatured && !_.isEmpty(v.imageFeatured)){
        featuredImage.value = v.imageFeatured.blobUrl
        featuredImage.id = v.imageFeatured.id
        featuredImage.toDelete = v.imageFeatured.toDelete
      }

      return {
        isLoadPost: false,
        data: data.getPost,
        initialValues: initials,
        _postTagList : _postTagList,
        imageGallery: _imageGalleryList,
        permalink: v.slug,
        postRefetch: data.refetch,
        publishDate: pubDate,
        immediatelyStatus: false,
        postCategoryList: postCategoryList,
        metaIds: metaIds,
        featuredImage
      }
    }
}

const NewContentTypeWithPostId = graphql(Query.getPost, {
  options : (props) => ({
    variables: {
      id: props.postId
    }
  }),
  props: mapResultToProps
})(NewContentTypeNoPostId)


class NewContentType extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      imageGallery : [],
      featuredImage: {}
    }

    this.setImageGallery = this.setImageGallery.bind(this)
    this.setFeaturedImage = this.setFeaturedImage.bind(this)
  }

  setImageGallery(gallery){
    this.setState({imageGallery: [...gallery]})
  }

  setFeaturedImage(image){
    this.setState({
      featuredImage: {...image}
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.urlParams && !nextProps.urlParams){
      this.setImageGallery([])
      this.setFeaturedImage({})
    }
  }

  render(){
    return (
      <div>
        {this.props.postId  ?
            <NewContentTypeWithPostId  {...this.props} urlParams={this.props.urlParams} mode="update"/>
            :
            <NewContentTypeNoPostId 
              _postTagList={[]} 
              {...this.props} 
              mode="create" 
              imageGallery={this.state.imageGallery} 
              setImageGallery={this.setImageGallery}
              featuredImage={this.state.featuredImage}
              setFeaturedImage={this.setFeaturedImage}
            />}
      </div>
    )
  }
}

export default NewContentType;
