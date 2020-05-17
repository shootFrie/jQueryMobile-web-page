/* 获取不同的session */
function changeDiv(sessionName) {
	if (sessionName == '单身') {
		$("#singleRisk").show().siblings('div').hide();
	} else if (sessionName == '已婚无孩') {
		$("#spouseRisk").show().siblings('div').hide();
	} else if (sessionName == '已婚有孩') {
		$("#childRisk").show().siblings('div').hide();
	}
}

/* 弹出框的事件 */
$('.modal-content .inp_1').bind("input propertychange", function() {
	console.log($('#phone').val());
	if ($('#phone').val() == null || $('#phone').val() === '') {
		$('.register').css('background', '#D8D8D8');
	} else {
		$('.register').css('background', '#4A9FFF');
	}
});

/* 验证码没有填写 */
$('.register').on('click',function(){
	if($('.inp_2').val() == null || $('.inp_2').val() ===''){
		 $('.inp_2').attr('placeholder','请输入验证码');
	}
});


/* 表格元素获取 */
var a = sessionStorage.getItem('age'); //获取session值 个人
var b = sessionStorage.getItem('spouseage'); //获取伴侣年龄
var c = sessionStorage.getItem('oneChildage'); //孩子年龄
var gender = sessionStorage.getItem('gender'); //个人性别
var famliy = sessionStorage.getItem('famliy'); //家庭结构

function nullNum(number){
	if(number != null){
		return number;
	}else{
		return 0;
	}
}


$(function() {
	changeDiv(famliy);
})

var dataMale = [2,1.8,1.7,1.6,1, 1,1,1,1,1, 1,1,1,1,1, 1,1.4,1.6,1.8,2, 2.2,2.3,2.5,2.7,3,  5,5,7,7,9, 9,9,9,9,10, 10,11,11,12,12, 13,14,15,17,19, 20,21,22,23,25, 27,30,30,32,35, 38,43,48,50,52];
var dataFamale = [2,1.8,1.7,1.6,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1.5,  2,2,2.4,2.6,2.6,5, 5,5,6,7,9, 9,9,9,9,10.1, 11,13,14,16,18, 19,20,20,21,22, 25,27,28,30,32, 36,40,45,48,50];
	//动态value获取
	function valueSelect(age, data) {
		var data1 =['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18','19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37','38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56','57', '58', '59', '60'];
		if(age != null){
			for (var i = 0; i < data1.length; i++) {
			/* 			var tb = expandedForm(age); */
						if (data1[i] === age.toString()) {
							console.log();
							return data[i];
						}
					}
		}else{
			return 0;
		}
		
	}

/* 折线图 */
var myChart = echarts.init(document.getElementById('risk-chart'));
myChart.title = '折线图';

option = {
	responsive: true,
	title: {
		text: '家人未来20年内，重疾或身故的风险',
		x: 'center',
		textStyle: {
			fontSize: 14,
			fontWeight: 400,
			color: '#333'
		},
	},
	tooltip: {
		show: true,
		trigger: 'item',
		backgroundColor: 'rgb(0,132,255,0.7)',
	},
	legend: {
		data: ['男性', '女性'],
		padding: 40,
		textStyle: {
			color: '#333'
		},
		x: 'center'
	},
	grid: {
		left: '4%',
		padding:20,
		top: '30%',
		containLabel: true
	},
	calculable: true,
	xAxis: [{
		name: '岁',
		type: 'category',
		boundaryGap: false,
		data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18','19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37','38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56','57', '58', '59', '60'],
		axisTick: {
			show: false,
		},
		axisLine: {
			lineStyle: {
				type: 'dotted',
				color: '#333',
			}
		}

	}],

	yAxis: [{
		type: 'value',
		axisLabel: {
			formatter: '{value}%'
		},
		axisLine: {
			lineStyle: {
				width: 0
			}
		},
		axisTick: {
			show: false
		},
		splitLine: {
			lineStyle: {
				color: ['#333', '#666', '#333', '#666'],
				type: 'dotted'
			}
		}
	}],
	series: genderSelect(gender, famliy)
};

//自身的性别
function genderSelect(gender, famliy) {
	if (gender === '女') {
		var app = [{
				name: '男性',
				type: 'line',
				smooth: true,
				data: [
					[0, 2],
					[5, 1],
					[10, 1],
					[15, 1],
					[20, 2],
					[25, 3],
					[30, 7],
					[35, 10],
					[40, 12],
					[45, 19],
					[50, 25],
					[55, 35],
					[60, 52]
				],
				itemStyle: {
					normal: {
						color: '#0084FF',
						lineStyle: {
							borderColor: '#0084FF'
						}
					}
				},
				markPoint: {
					symbolSize: 1,
					symbolOffset: [0, 20],
					label: {
						normal: {
							formatter: '{b}：\n 风险概率{c}%  ',
							backgroundColor: 'rgb(0,132,255,0.7)',
							borderColor: 'rgb(0,132,255,0.7)',
							borderWidth: 1,
							borderRadius: 4,
							color: '#fff',
							padding: [4, 1],
							position: 'top'
						},
					},
					data: famliySelectPoint(famliy),
				},
				markLine: {
					data: famliySelectLine(famliy)
				}
			},
			{
				name: '女性',
				type: 'line',
				smooth: true,
				data: [
					[0, 2],
					[5, 1],
					[10, 1],
					[15, 1],
					[20, 1.5],
					[25, 2],
					[30, 6],
					[35, 8],
					[40, 10.1],
					[45, 18],
					[50, 22],
					[55, 32],
					[60, 50]
				],
				itemStyle: {
					normal: {
						color: '#FF7AF1',
						lineStyle: {
							color: '#FF7AF1',
						}
					},
				},
				markPoint: {
					symbolSize: 1,
					symbolOffset: [40, 20],
					label: {
						normal: {
							formatter: '{b}：\n 风险概率{c}%  ',
							backgroundColor: 'rgb(255,122,241,0.7)',
							borderColor: 'rgb(255,122,241,0.7)',
							borderWidth: 1,
							borderRadius: 4,
							color: '#fff',
							padding: [4, 1],
							position: 'right'
						},
					},
					data: [{
						name: '本人',
						value: valueSelect(a, dataFamale),
						xAxis: 20,
						yAxis: 30
					}],
				},
				markLine: {
					data: famliySelfLine(famliy)
				}
			},
		]
	} else {
		var app = [{
				name: '男性',
				type: 'line',
				smooth: true,
				data: [
					[0, 2],
					[5, 1],
					[10, 1],
					[15, 1],
					[20, 2],
					[25, 3],
					[30, 7],
					[35, 10],
					[40, 12],
					[45, 19],
					[50, 25],
					[55, 35],
					[60, 52]
				],
				itemStyle: {
					normal: {
						color: '#0084FF',
						lineStyle: {
							borderColor: '#0084FF'
						}
					}
				},
				markPoint: {
					symbolSize: 1,
					symbolOffset: [40, 10],
					label: {
						normal: {
							formatter: '{b}：\n 风险概率{c}%  ',
							backgroundColor: 'rgb(0,132,255,0.7)',
							borderColor: 'rgb(0,132,255,0.7)',
							borderWidth: 1,
							borderRadius: 4,
							color: '#fff',
							padding: [4, 1],
							position: 'right',
							textStyle:{
								fontSize:12,
								align:'center',
							}
						},
					},
					data: [{
						name: '本人',
						value: valueSelect(a, dataMale),
						xAxis: 35,
						yAxis: 30
					}],
				},
				markLine: {
					data: famliySelfLine(famliy)
				}
			},
			{
				name: '女性',
				type: 'line',
				smooth: true,
				data: [
					[0, 2],
					[5, 1],
					[10, 1],
					[15, 1],
					[20, 1.5],
					[25, 2],
					[30, 6],
					[35, 8],
					[40, 10.1],
					[45, 18],
					[50, 22],
					[55, 32],
					[60, 50]
				],
				itemStyle: {
					normal: {
						color: '#FF7AF1',
						lineStyle: {
							color: '#FF7AF1',
						}
					}
				},
				markPoint: {
					symbolSize: 1,
					symbolOffset: [0, 30],
					label: {
						normal: {
							formatter: '{b}：\n 风险概率{c}%  ',
							backgroundColor: 'rgb(255,122,241,0.7)',
							borderColor: 'rgb(255,122,241,0.7)',
							borderWidth: 1,
							borderRadius: 4,
							color: '#fff',
							padding: [4, 1],
							position: 'top',
						},
						
					},
					data: famliySelectPoint(famliy),
				},
				markLine: {
					data: famliySelectLine(famliy)
				},
			}
		]
	}
	return app;
}
//家庭结构 markPoint
function famliySelectPoint(famliy,gender) {
	if (famliy === '已婚无孩') {
		if(gender === '女'){
			var app = [{
				name: '配偶',
				value: valueSelect(b, dataMale),
				xAxis: 45,
				yAxis: 50
			}]
		}else{
			var app = [{
				name: '配偶',
				value: valueSelect(b, dataFamale),
				xAxis: 45,
				yAxis: 50
			}]
		}
	} else if (famliy === '已婚有孩') {
		if(gender === '女'){
			var app = [{
				name: '配偶',
				value: valueSelect(b, dataFamale),
				xAxis: 45,
				yAxis: 50
			}, {
				name: '子女',
				value: valueSelect(c, dataMale),
				xAxis:10,
				yAxis: 20
			}]
		}else{
			var app = [{
				name: '配偶',
				value: valueSelect(b, dataMale),
				xAxis: 45,
				yAxis: 50
			}, {
				name: '子女',
				value: valueSelect(c, dataMale),
				xAxis:10,
				yAxis: 20
			}]
		}
		
	} else {
		var app = []
	}
	return app;
}
//家庭结构 markLine
function famliySelectLine(famliy) {
	if (famliy === '已婚无孩') {
		var app = [
			[{
					name:nullNum(b)+ '岁',
					xAxis:nullNum(b).toString(),
					yAxis: 0
				},
				{
					xAxis: nullNum(b).toString(),
					yAxis: 60
				}
			]
		]
	} else if (famliy === '已婚有孩') {
		var app = [
			[{
					name: nullNum(b) + '岁',
					xAxis: nullNum(b).toString(),
					yAxis: 0
				},
				{

					xAxis: nullNum(b).toString(),
					yAxis: 60
				}
			],
			[{
					name: nullNum(c) + '岁',
					xAxis: nullNum(c).toString(),
					yAxis: 0
				},
				{

					xAxis:nullNum(c).toString(),
					yAxis: 60
				}
			]
		]
	} else {
		var app = []
	}
	return app;
}

//本人
function famliySelfLine(famliy) {
	if (famliy === '单身') {
		var app = [
			[{
					name:nullNum(a) + '岁',
					xAxis: nullNum(a).toString(),
					yAxis: 0
				},
				{

					xAxis: nullNum(a).toString(),
					yAxis: 60
				}
			]
		]
	} else {
		var app = []
	}
	return app;

}


myChart.setOption(option);
//resize事件自适应
var echartWarp = function(){
	$('#risk-chart').css('width',$('.chartRisk').innerWidth+'px');
	$('#risk-chart').css('height',$('.chartRisk').innerHeight+'px');
};

window.onresize =function(){
	echartWarp();
	myChart.resize();
} 
