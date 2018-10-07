var View = require("app/views/View");

class GridView extends View {
	constructor(model) {
		super();
		var me = this;

		var searchModel = new SearchModel();
		var recordSelectionModel = new RecordSelectionModel();
		me.searchView = me.addChild(new SearchView(model, searchModel));
		me.recordInfo = me.addChild(new RecordInfo(recordSelectionModel));
		me.grid = me.addChild(new Grid(model, searchModel, recordSelectionModel));

		// handle this signal here to control the order of child views' updates
		model.onChanged.bind(function() {
			recordSelectionModel.clear();
			searchModel.onChanged.mute();
			me.searchView.apply();
			searchModel.onChanged.mute(-1);
			me.grid.redraw();
		});
	}
	getHtml() {
		return `
			<div id="${this.uid}" class="gridview">
				<div class="gridview_sidebar">
					${this.searchView.getHtml()}
					${this.recordInfo.getHtml()}
				</div>
				${this.grid.getHtml()}
			</div>
		`;
	}
}

GridView.isSupportedObject = function(obj) {
	return obj instanceof m.Apartment || obj instanceof m.NonResidentialPremise;
};

module.exports = GridView;

var Grid = require("app/views/Grid");
var SearchView = require("app/views/SearchView");
var SearchModel = require("app/model/SearchModel");
var RecordSelectionModel = require("app/model/RecordSelectionModel");
var RecordInfo = require("app/views/RecordInfo");
var m = require("app/model/ModelClasses");
