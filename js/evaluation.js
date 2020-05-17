$(function() {
	/* 个人性别 */
	var gen = null;

	var gender = $("#gen img").click(function() {
		$("#gen img").removeClass('img_active');
		$(this).addClass('img_active');
		var a = $(this).attr('title');
		sessionStorage.setItem('gender', a);
	});
	$("#gen").on('click', function(event) {
		//使用事件阻止
		event.preventDefault();
	});

	/* 家庭结构 */
	$('.famliy-wrap div').click(function() {
		$('.famliy-wrap div').removeClass('active');
		$(this).addClass('active');
		var a = $(this).children('span').text();
		sessionStorage.setItem('famliy', a);
		// 选择生日
		if ($(this).children('span').text() === '单身') {

			fade($('#selfbirth'));
			fade($('#myMedical'));
			fade($('#trip'));
			fade($('#hobby'));
		} else if ($(this).children('span').text() === '已婚无孩') {
			fade($('#spousebirth'));
			fade($('#spouseMedical'));
			fade($('#spouseTrip'));
			fade($('#spouseHobby'));
		} else {
			fade($('#spouseMedical'));
			fade($('#spouseTrip'));
			fade($('#spouseHobby'));
		}
	});

	/* 孩子数量选择 */
	$('#numb a').click(function() {
		$('#numb a').removeClass('active');
		$(this).addClass('active');
		
		//下一选择 孩子性别和孩子生日
		if ($(this).text() === '1孩') {
			sessionStorage.setItem('child', 1);
			fade($('#oneChild'));
			$("#threeChild input[name^='gender-']").prop('checked',false);
			$("#twoChild input[name^='gender-']").prop('checked',false);
			
			fade($('#Onebirth'));
		} else if ($(this).text() === '2孩') {
			sessionStorage.setItem('child', 2);
			fade($('#twoChild'));
			$("#oneChild input[name^='gender-']").prop('checked',false);
			$("#threeChild input[name^='gender-']").prop('checked',false);
			fade($('#Twobirth'));
		} else if ($(this).text() === '3孩') {
			sessionStorage.setItem('child', 3);
			fade($('#threeChild'));
			$("#oneChild input[name^='gender-']").prop('checked',false);
			$("#twoChild input[name^='gender-']").prop('checked',false);
			fade($('#Threebirth'));
		}
		//单选框
		checkAll();
	});

	/* 赡养父母 */
	$("#supportParent a").click(function() {
		$('#supportParent a').removeClass('active');
		$(this).addClass('active');

		var a = $(this).attr('title');
		sessionStorage.setItem('parent', a);

		clickOn();
	});


	/* 选择不同消失 */
	function fade(event) {
		event.css('display', 'block');
		event.siblings('div').css('display', 'none');
	}

	/* 个人的收入 房车*/
	$('#myincome').on('input', function() {
		var a = $(this).val();
		sessionStorage.setItem('myincome', a);
	});

	$('#myhouse').on('input', function() {
		var a = $(this).val();
		sessionStorage.setItem('myhouse', a);
	});

	$('#mycar').on('input', function() {
		var a = $(this).val();
		sessionStorage.setItem('mycar', a);
	});

	/* 医保 */
	$('.med').click(function() {
		var a = $(this).val();
		sessionStorage.setItem('med', a);
	});
	/* 自驾 */
	$('.selfdri').click(function() {
		var a = $(this).val();
		sessionStorage.setItem('selfdri', a);
	});
	$('.outwork').click(function() {
		var a = $(this).val();
		sessionStorage.setItem('outwork', a);
	});

	/* 年龄 */
	getbirth($('#start_date1'), 'age');
	getbirth($('#start_date2'), 'age');
	getbirth($('#start_date3'), 'spouseage');
	getbirth($('#start_date4'), 'age');
	getbirth($('#start_date5'), 'spouseage');
	getbirth($('#start_date6'), 'oneChildage');
	getbirth($('#start_date7'), 'age');
	getbirth($('#start_date8'), 'spouseage');
	getbirth($('#start_date9'), 'oneChildage');
	getbirth($('#start_date11'), 'age');
	getbirth($('#start_date12'), 'spouseage');
	getbirth($('#start_date13'), 'oneChildage');

	/* 写出数据 */
	if (sessionStorage.getItem("gender") != null) {
		$('#gend').text(sessionStorage.getItem("gender") + '性,');
	}

	if (sessionStorage.getItem("age") != null) {
		$("#age").text(sessionStorage.getItem('age') + '岁')
	}

	if (sessionStorage.getItem('famliy') != null) {
		$('#fami').text(sessionStorage.getItem('famliy') + ',');
	}

	if (sessionStorage.getItem('parent') != null) {
		$('#par').text(sessionStorage.getItem('parent'));
	}

	if (sessionStorage.getItem('myincome') != null) {
		$('#inc').text(sessionStorage.getItem('myincome') + '万,');
	} else {
		$('#inc').text('无');
	}


	if (sessionStorage.getItem('myhouse') != null) {
		if (sessionStorage.getItem('myhouse') != 0) {
			$('#hous').text(sessionStorage.getItem('myhouse') + '万房贷，');
		} else {
			$('#hous').text('无房贷,');
		}
	} else {
		$('#hous').text('无房贷,');
	}

	if (sessionStorage.getItem('mycar') != null) {
		if (sessionStorage.getItem('mycar') != 0) {
			$('#car').text(sessionStorage.getItem('mycar') + '万车贷');
		} else {
			$('#car').text('无车贷');
		}
	} else {
		$('#car').text('无车贷');
	}

	if (sessionStorage.getItem('med') != null) {
		$('#medic').text('本人' + sessionStorage.getItem('med') + '社保');
	}
	if (sessionStorage.getItem('selfdri') != null) {
		$('#dri').text('本人出行' + sessionStorage.getItem('selfdri') + '自驾车');
	}
	if (sessionStorage.getItem('outwork') != null) {
		$('#out').text('本人' + sessionStorage.getItem('outwork') + '经常出差');
	}

	function getbirth(id, sessionName) {
		$(id).click(function() {
			$(id).on('input', function() {
				var dataArr = $(this).val().split('-');
				var birthYear = dataArr[0];
				var d = new Date()
				var nowYear = d.getFullYear();
				if (nowYear == birthYear) {
					return sessionStorage.setItem(sessionName, '0');
				} else {
					if(birthYear != 0  && birthYear != null){
						return sessionStorage.setItem(sessionName, nowYear - birthYear);
					}
					
				}
			});
		});
	}
	
	function checkAll() {
		var length = sessionStorage.getItem('child');
		//console.log(length);
		$("input[name^='gender-']:visible").on('click', function() {
			//console.log($("input[name^='gender-']:checked").length);
			//console.log($("input[name^='gender-']").prop('checked'));
			if ($("input[name^='gender-']:checked").length == length) {
				swiper.slideTo(4);
			}
		});
	}
	function clickOn() {
		var visNum = $("#birthWrap>div:visible").index();
		$('#birthWrap .next').on('click', function() {
			if (sessionStorage.getItem('age') != null) {
				switch (visNum) {
					case 0:
						swiper.slideTo(6);
						break;
					case 1:
						if (sessionStorage.getItem('spouseage') != null) {
							swiper.slideTo(6);
						} else {
							layer.open({
								title: '提示',
								content: '请填写完整信息'
							});
						};
						break;
					default:
						if (sessionStorage.getItem('oneChildage') != null && sessionStorage.getItem('spouseage') != null) {
							swiper.slideTo(6);
						} else {
							layer.open({
								title: '提示',
								content: '请填写完整信息'
							});
						};
						break;
				}
			} else {
				layer.open({
					title: '提示',
					content: '请填写完整信息'
				});
			}
		});

	};



})
