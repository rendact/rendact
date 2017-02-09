const getMonthList = function(){
	var monthList = [];
	monthList.push("January");
	monthList.push("February");
	monthList.push("March");
	monthList.push("April");
	monthList.push("May");
	monthList.push("June");
	monthList.push("July");
	monthList.push("August");
	monthList.push("September");
	monthList.push("October");
	monthList.push("Novemver");
	monthList.push("December");
	return monthList;
}

const functions = {
	getMonthList: getMonthList,
}

module.exports = functions;