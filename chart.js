
window.onload = function () {
	ajaxcall();

	// ajax function
	var coins_array = ["ETH", "ZEC", "ZEC", "ZEC", "ZEC"];
	var validname_arr = [];
	var validvalue_arr = [];
	startvalue_arr = [];
	function ajaxcall() {
		$.ajax({
			url:
				"https://min-api.cryptocompare.com/data/pricemulti?fsyms=" +
				coins_array +
				"&tsyms=USD",
			success: function (result) {
				coins_object = result;
				// chart:
				for (let index = 0; index < 5; index++) {
					if (coins_object[coins_array[index]] == undefined) {
						validname_arr[index] = "no data";
						validvalue_arr[index] = 0;

					}
					else {
						validname_arr[index] = coins_array[index];
						validvalue_arr[index] = coins_object[coins_array[index]].USD;

					}
				}
				console.log(validname_arr);
				console.log(validvalue_arr)

			},
		});
	}

	setInterval(ajaxcall, 2000);












	// chart function
	var dataPoints1 = [];
	var dataPoints2 = [];
	var dataPoints3 = [];
	var dataPoints4 = [];
	var dataPoints5 = [];

	var options = {
		title: {
			text: "Electricity Generation in Turbine"
		},
		axisX: {
			title: "chart updates every 2 secs"
		},
		axisY: {
			suffix: "Wh",
			includeZero: false
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			verticalAlign: "top",
			fontSize: 22,
			fontColor: "dimGrey",
			itemclick: toggleDataSeries
		},
		data: [{
			type: "line",
			xValueType: "dateTime",
			yValueFormatString: "###.00Wh",
			xValueFormatString: "hh:mm:ss TT",
			showInLegend: true,
			name: validname_arr[0],
			dataPoints: dataPoints1
		},
		{
			type: "line",
			xValueType: "dateTime",
			yValueFormatString: "###.00Wh",
			showInLegend: true,
			name: validname_arr[1],
			dataPoints: dataPoints2
		},
		{
			type: "line",
			xValueType: "dateTime",
			yValueFormatString: "###.00Wh",
			showInLegend: true,
			name: validname_arr[2],
			dataPoints: dataPoints3
		},
		{
			type: "line",
			xValueType: "dateTime",
			yValueFormatString: "###.00Wh",
			showInLegend: true,
			name: validname_arr[3],
			dataPoints: dataPoints4
		},
		{
			type: "line",
			xValueType: "dateTime",
			yValueFormatString: "###.00Wh",
			showInLegend: true,
			name: validname_arr[4],
			dataPoints: dataPoints5
		}
		]
	};

	var chart = $("#chartContainer").CanvasJSChart(options);

	function toggleDataSeries(e) {
		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		e.chart.render();
	}

	var updateInterval = 2000;
	// initial value
	var yValue1 = validvalue_arr[0];
	var yValue2 = validvalue_arr[1];
	var yValue3 = validvalue_arr[2];
	var yValue4 = validvalue_arr[3];
	var yValue5 = validvalue_arr[4];

	var time = new Date;
	// starting at 10.00 am
	time.getHours();
	time.getMinutes();
	time.getSeconds();
	time.getMilliseconds();

	function updateChart(count) {
		count = count || 1;
		var deltaY1, deltaY2, deltaY3, deltaY4, deltaY5;
		for (var i = 0; i < count; i++) {
			time.setTime(time.getTime() + updateInterval);
			deltaY1 = 0;
			deltaY2 = 0;
			deltaY3 = 0;
			deltaY4 = 0;
			deltaY5 = 0;

			// adding random value and rounding it to two digits. 
			yValue1 = validvalue_arr[0];
			yValue2 = validvalue_arr[1];
			yValue3 = validvalue_arr[2];
			yValue4 = validvalue_arr[3];
			yValue4 = validvalue_arr[4];

			// pushing the new values
			dataPoints1.push({
				x: time.getTime(),
				y: yValue1
			});
			dataPoints2.push({
				x: time.getTime(),
				y: yValue2
			});
			dataPoints3.push({
				x: time.getTime(),
				y: yValue3
			});
			dataPoints4.push({
				x: time.getTime(),
				y: yValue4
			});
			dataPoints5.push({
				x: time.getTime(),
				y: yValue5
			});
		}

		// updating legend text with  updated with y Value 
		options.data[0].legendText = "Turbine 1 : " + "yValue1" + "Wh";
		options.data[1].legendText = "Turbine 2 : " + yValue2 + "Wh";
		options.data[2].legendText = "Turbine 3 : " + yValue3 + "Wh";
		options.data[3].legendText = "Turbine 3 : " + yValue3 + "Wh";
		options.data[4].legendText = "Turbine 3 : " + yValue3 + "Wh";
		$("#chartContainer").CanvasJSChart().render();
	}
	// generates first set of dataPoints 
	updateChart(1);
	setInterval(function () { updateChart() }, updateInterval);

}
