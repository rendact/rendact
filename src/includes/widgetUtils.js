import {riques} from '../utils';
import Query from '../admin/query';
import isArray from 'lodash/isArray'
import indexOf from 'lodash/indexOf'


export const registerWidget = (id, title, value, filePath) => {
  let item = "widget_" + id ;
  let values = Object.assign({}, value, {
      title: title,
      file: filePath
  });

  riques(Query.createWidget(item, JSON.stringify(values)),
    (error, response, data) => {
      if (!error && !data.errors && response.statusCode === 200){
          return data
      }
      console.log(data.errors)
    })
}

export const registerWidgetArea = (widgetId) => {
	var activeWidgetArea = localStorage.getItem("activeWidgetArea");
	
	if (activeWidgetArea===null){
		activeWidgetArea = [widgetId]
	} else {
		activeWidgetArea = activeWidgetArea.split(",");
		if (isArray(activeWidgetArea)) {
			var index = indexOf(activeWidgetArea, widgetId);

			if (index===-1) {
				activeWidgetArea.push(widgetId)
			}
		} else {
			activeWidgetArea = [widgetId]
		}
	}

	localStorage.setItem("activeWidgetArea", activeWidgetArea.join(","));
}
