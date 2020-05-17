var myChart = echarts.init(document.getElementById('main'));
myChart.title = '环形图';

var option = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b}: {c} ({d}%)"
	},
	color: ['#E3F3FF', '#4A97FF'],
	legend: {
		orient: 'vertical',
		x: 'left',
		data: ['已访问人数', '总数']
	},
	series: [{
		name: '访问人数',
		type: 'pie',
		radius: ['50%', '63%'],
		avoidLabelOverlap: false,
		label: {
			normal: {
				show: false,
				position: 'center'
			},
			emphasis: {
				show: false,
			}
		},
		labelLine: {
			normal: {
				show: false
			}
		},
		data: [{value: 99999,name: ''},{value: 25234,name: ''},
		]
	}]
};
myChart.setOption(option);

/* 获取后台数据 */
/* function getPersonData(people){
	var peopleNum = 0;
	
	$ajax({
		url:'',
		type:'get',
		async:false,
		data:{},
		dataType:'json',
		success: function(data){
			peopleNum = data. //数据的内容
		}
	});
	
	return peopleNum;
} */
