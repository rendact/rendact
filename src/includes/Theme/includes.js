import React from "react";
import _ from "lodash";
import map from "lodash/map";
import get from "lodash/get";
import truncate from "lodash/truncate";
import { Menu } from "../Menu.js";
import AdminConfig from "../../admin/AdminConfig";
import { Link } from "react-router";
import Loadable from "react-loadable";
import CommentForm from "./CommentForm";
import { registerWidgetArea } from "../widgetUtils";
import request from "request";

window.react = require("react");
window["react-router"] = require("react-router");

const vm = require("vm");

const InvalidTheme = Loadable({
  loader: () => import(/* webpackChunkName: "invalidTheme"*/ "./InvalidTheme"),
  loading: () => null
});

const loadScript = (host, themeName) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("themeScript")) {
      return resolve();
    }
    let script;
    script = document.createElement("script");
    script.id = "themeScript";
    script.src = host + "/" + themeName + "/" + themeName + ".js";
    //script.src =
    script.src = "sss"
    ("https://shopkeeper-lionel-47443.netlify.com/stellar/stellar.js");

    script.onload = resolve;
    script.onerror = reject;
    script.type = "text/javascript";
    document.body.appendChild(script);
  });
};

const loadStyle = (host, themeName) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("themeStyle")) {
      return resolve();
    }
    let style;
    style = document.createElement("link");
    style.id = "themeStyle";
    style.href = host + "/" + themeName + "/main.css";
    //style.href = "https://shopkeeper-lionel-47443.netlify.com/style.css"; // uncomment this when debugging
    //style.href = "https://shopkeeper-lionel-47443.netlify.com/stellar/main.css";
    style.href = "https://shopkeeper-lionel-47443.netlify.com/style.css"; 
    style.href = "https://shopkeeper-lionel-47443.netlify.com/stellar/main.css";
    style.rel = "stylesheet";
    style.type = "text/css";
    style.onload = resolve;
    style.onerror = reject;
    document.getElementById("theme").appendChild(style);
  });
};

window.config = AdminConfig;

/* Theme functions */

export function getTemplateComponent(type) {
  const host = "https://shopkeeper-lionel-47443.netlify.com";
  const c = JSON.parse(JSON.parse(localStorage.getItem("config")).activeTheme);
  const themeMap = {
    home: "Home",
    blog: "Blog",
    single: "Single",
    search: "Search"
  };
  return loadScript(
    host, // change host when ready
    c.path // change theme name when ready
  )
    .then(() =>
      loadStyle(
        host, // change host when ready
        c.path // change theme when reade
      ).then(() => {
        return window[c.path][themeMap[type]]; // comment this when debugging
        //return window["stellar"][themeMap[type]]; // uncomment this when debugging
      })
    )
    .catch(err => {
      // work with default theme

      console.log(err);
      //	var widgetAreas = require("themes/"+c.path)["widgetArea"];
      import(`themes/${c.path}`).then(theme => {
        let widgetAreas = theme["widgetArea"];
        if (widgetAreas) {
          widgetAreas.forEach(widgetId => {
            registerWidgetArea(widgetId);
          });
        }
      });
      /*
	if (widgetAreas) {
		_.forEach(widgetAreas, function(widgetId){
			registerWidgetArea(widgetId)
		});
	}
  */

      if (c.name == null || c.path == null) {
        return InvalidTheme;
      }
      let module = themeMap[type];
      return import(`themes/${c.path}`)
        .then(theme => {
          if (theme) {
            return theme[module];
          }
          return null;
        })
        .then(comp => comp);
      //return require("themes/"+c.path)[module]
    });
}

export function theContent(content) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export function theTitle(id, title, onClickHandler) {
  return (
    <Link to={"/post/" + id} onClick={onClickHandler} id={id}>
      <h4>{title}</h4>
    </Link>
  );
}

export function theExcerpt(content) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: truncate(content, { length: 100 }) }}
    />
  );
}

export function theMenu(items, onClickHandler) {
  return ulParentClass => (
    <Menu
      menuItems={items && items.items ? items.items : []}
      goHome={goHome}
      ulParentClass={ulParentClass}
    />
  );
}

export function theLogo(onClickHandler) {
  return (
    <div className="logo">
      <Link to="/">
        <h1>
          Rend<span>act</span>
        </h1>
      </Link>
    </div>
  );
}

export function theImage(image, pageCount, activePage, handlePageClick) {
  var fImage = "";
  var c = JSON.parse(JSON.parse(localStorage.getItem("config")).activeTheme);
  if (image != null) {
    fImage = image.blobUrl;
  } else {
    try {
      fImage = require("themes/" + c.path + "/images/logo.png");
    } catch (e) {
      fImage = require("images/logo-128.png");
    }
  }
  return (
    <a href="article" className="mask">
      <img src={fImage} alt="" className="img-responsive img-thumbnail" />
    </a>
  );
}

export function thePagination(pageCount, activePage, handlePageClick) {
  let pages = [
    <li key="998">
      <a href="#" onClick={handlePageClick}>
        «
      </a>
    </li>
  ];
  for (var i = 0; i < pageCount; i++) {
    if (activePage === i + 1)
      pages.push(
        <li key={i}>
          <a href="#" onClick={handlePageClick} disabled="true">
            {i + 1}
          </a>
        </li>
      );
    else
      pages.push(
        <li key={i}>
          <a href="#" onClick={handlePageClick}>
            {i + 1}
          </a>
        </li>
      );
  }
  pages.push(
    <li key="999">
      <a href="#" onClick={handlePageClick}>
        »
      </a>
    </li>
  );
  return (
    <div className="box-tools">
      <ul className="pagination pagination-sm no-margin">{pages}</ul>
    </div>
  );
}

export function theBreadcrumb(onClickHandler) {
  return (
    <h2>
      <a href="#" onClick={onClickHandler}>
        <h5>Home </h5>
      </a>{" "}
      / PAGE
    </h2>
  );
}

export function goHome(e) {
  e.preventDefault();
  this._reactInternalInstance._context.history.push("/");
}

export function getWidgets(widgetArea) {
  // add checking if the component has implemented with redux or not
  let listOfWidgets = this.props.listOfWidgets[widgetArea]
    ? this.props.listOfWidgets[widgetArea]
    : [];

  let Widgets = map(listOfWidgets, function(item) {
    return import("../DefaultWidgets/" + item.filePath).then(widgetFn => {
      return (
        <div key={item.id} className="sidebar-box">
          <h3>
            <span>{item.title}</span>
          </h3>
          {widgetFn.default(item.id, item.widget)}
        </div>
      );
    });
  });

  return Promise.all(Widgets).then(Widgets => (
    <div className="widgets">{Widgets}</div>
  ));
}

export const getTemplates = function() {
  var template = [
    {
      id: "default",
      name: "Default Template"
    }
  ];
  //var c = window.config.theme;
  try {
    //let Component = require('../theme/'+c.path+'/layouts/Template.js').default;
    template = [
      {
        id: "default",
        name: "Default Template"
      }
    ];
  } catch (e) {}
  return template;
};

export const theCommentForm = function(postId) {
  return <CommentForm postId={postId} />;
};
