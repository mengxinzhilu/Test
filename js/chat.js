 //曲线图
$(function(){
	
			var myChart = echarts.init(document.getElementById('main1'));

			// 指定图表的配置项和数据
			var option = {
					title: {
						text: '曲线图数据展示',
						x:'center',
						y:'top',
						textAlign:'center'

					},
					xAxis: {
						type: 'category',
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [],
						type: 'line',
						smooth: true
					}]
				};
			
			$.ajax({
				type : "get",
				async : true, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
				url : " https://edu.telking.com/api/?type=month", 
				dataType : "json", 
				success : function(res) {
					console.log(res)
					//请求成功时执行该函数内容，res即为服务器返回的json对象
					if (res.code == 200) {       
						myChart.setOption({ //加载数据图表
							xAxis : {
								data : res.data.xAxis
							},
							series : [ {
								// 根据名字对应到相应的系列
								name : '销量',
								data : res.data.series
							} ]
						});
					}else{
						alert("后台数据获取失败!");
					}
				},
				error : function(errorMsg) {
					//请求失败时执行该函数
					alert("图表请求数据失败!");
				}
			})
 


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
})

//饼状图
$(function(){
        var myChart2 = echarts.init(document.getElementById('main2'));

			option = {
				title: {
					text: '饼状图数据展示',
					left: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: []
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: [],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}
				]
			};

			
			$.ajax({
				type : "get",
				async : true,
				url : " https://edu.telking.com/api/?type=week", 
				dataType : "json", 
				success : function(res) {
					console.log(res)
					if (res.code == 200) {
						var arrdata = [];
							for (var i = 0; i < res.data.series.length; i++) {
								arrdata.push({
									name:res.data.xAxis[i],
									value:res.data.series[i]
								});
							}
							console.log(arrdata)	
							
						myChart2.setOption({
							series : [ {
								data : arrdata
							} ]
						});
					}else{
						alert("后台数据获取失败!");
					}
				},
				error : function(errorMsg) {
					alert("图表请求数据失败!");
				}
			})
        myChart2.setOption(option);
})

//柱形图
$(function(){
			var myChart3 = echarts.init(document.getElementById('main3'));
			
				option = {
					color: ['#3398DB'],
					title: {
						text: '柱形图数据展示',
						left: 'center'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [
						{
							type: 'category',
							data: [],
							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis: [
						{
							type: 'value'
						}
					],
					series: [
						{
							name: '直接访问',
							type: 'bar',
							barWidth: '60%',
							data: []
						}
					]
				};
			
				$.ajax({
				type : "get",
				async : true, 
				url : " https://edu.telking.com/api/?type=week", 
				dataType : "json", 
				success : function(res) {
					console.log(res)
					if (res.code == 200) {
						myChart3.setOption({
							xAxis : {
								data : res.data.xAxis
							},
							series : [ {
								data : res.data.series
							} ]
						});
					}else{
						alert("后台数据获取失败!");
					}
				},
				error : function(errorMsg) {
					alert("图表请求数据失败!");
				}
			})
        myChart3.setOption(option);
})

