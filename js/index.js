//-----------------------------Slide1--------------------------------------------
//背景图片随着鼠标位置改变
var slideH = document.documentElement.clientHeight;
$('#slide1').height(slideH)
$('#slide1').on('mousemove', function(ev) {
	function calPercentL() {
		var perL = (ev.clientX / $('#contenter').width()) * 100;
		return perL
	}

	function calPercentR() {
		var perR = (ev.clientY / $('#contenter').height()) * 100;
		return perR
	}
	var mountL = 50 + 0.2 * calPercentL();
	//改变contenter的背景图片位置
	$("#contenter").css("backgroundPosition", mountL + "% 0%");
	var clouder1L = 4.9 + calPercentL() * 0.05;
	var clouder1B = 60.5 + calPercentR() * 0.05;
	var clouder2L = 20 + calPercentL() * 0.05;
	var clouder2B = 80 + calPercentR() * 0.05;
	var clouder3L = 40 + calPercentL() * 0.05;
	var clouder3B = 50 + calPercentR() * 0.05;
	var clouder4L = 10 + calPercentL() * 0.05;
	var clouder4B = 30 + calPercentR() * 0.05;
	$('#clouder1').css({
		'left': clouder1L + "%",
		'bottom': clouder1B + '%'
	});
	$('#clouder2').css({
		'left': clouder2L + "%",
		'bottom': clouder2B + '%'
	});
	$('#clouder3').css({
		'left': clouder3L + "%",
		'bottom': clouder3B + '%'
	});
	$('#clouder4').css({
		'left': clouder4L + "%",
		'bottom': clouder4B + '%'
	});

});

//clouder4添加动画效果
(function() {
	var num = 0;
	setInterval(function() {
		num++;
		num %= 15;
		clouder4.style.backgroundPositionX = -num * 476 + 'px';
	}, 80)
	var num1 = 0;
	$('#slide1_text a').on('click', function() {
		var Top = $('#slide3').offset().top
		var timer = setInterval(function() {
			num1 += 20;
			window.scrollTo(0, num1)
			if(num1 >= Top) {
				clearInterval(timer)
				num1 = 0;
			}
		}, 16)

	});
	$('#slide1_text a').hover(function() {
		this.style.transition = '0.5s';
		this.style.background = '#942f86';

	}, function() {
		this.style.transition = '0.5s';
		this.style.background = '';
	})
})();

//-----------------------------------------slide2----------------------------------------------------
$('#slide2').height(slideH);
( //middleCharacters添加动画效果
	function() {
		var num = 0;
		setInterval(function() {
			num++;
			num %= 15;
			middleCharacters.style.backgroundPositionX = -num * 270 + 'px'
		}, 80)
	}
)();

//middleCharacters下拉位置改变；
//初始化位置
middleCharacters.style.left = (document.documentElement.clientWidth - middleCharacters.clientWidth) / 2 + 'px';
//窗口缩放时的位置改变
$(window).on('resize', function() {
	middleCharacters.style.left = (document.documentElement.clientWidth - middleCharacters.clientWidth) / 2 + 'px';
})
var go=false;
$(window).on('scroll', function() {
		var Top = -600 + document.body.scrollTop;
		var H = $('#slide2').height();
		if(Top < H) {
			middleCharacters.style.top = Top + 'px';

		}
		if(go){
			return
		}
		if(Top + 600 > $('#slide1').height() / 2) {
			go = true;
			var a = -1;
			var len = Math.ceil($('.list li').length / 2);
				var timer = setInterval(function() {
					a++;
					move(a);
					if(a == len - 1) {
						clearInterval(timer)
					}
				}, 1000);
		}

	}

);

function move(i) {
	$('.cf').eq(i).find('span').get(0).style.transform = 'scale(1)';

	setTimeout(function() {
		$('.cf').eq(i).find('p').animate({
			'opacity': 1,
			'margin-left': 0
		}, 500);
		$('.cf').eq(i).find('a').animate({
			'opacity': 1,
			'margin-left': 0
		}, 500);
		if($('.vertical-separator div').eq(i)) {
			$('.vertical-separator div').eq(i).animate({
				'height': 60
			}, 800);
		}

	}, 500)
}

//-------------------------------------slide3-------------------------------------------------------
$('#slide3').height(slideH);
//slide3的背景树随鼠标移动背景图片左右位置会发生相应改变
$("#trees_contener").on('mousemove', function(ev) {
		function perFnL() {
			var perL = ev.clientX / $("#trees_contener").width() * 100;
			return perL;
		}

		var treeL = 50 + 0.5 * perFnL();
		$('#trees_contener').css('backgroundPositionX', treeL + "%")
	})
	//slide3 的背景图片随鼠标滚轮的滑动位置变化
$(window).scroll(function() {
	var windowH = window.innerHeight;
	var clientH = $('#slide3').get(0).getBoundingClientRect().top;
	var sca = clientH / windowH
		//console.log(clientH);
	$('#trees_contener').css('backgroundPositionY', sca * 150 + "%")
});
//slide3 中间的部分随着鼠标点击会上下按压
(function() {
	var num = 0;
	$('#slide3_center').attr({
			'onoff': true,
			'statue': 'noPlay'
		}).on('click', function() {
			if(this.statue == 'Play') return; //如果statue处于play状态不能进行点击
			this.statue = 'Play'; //每次鼠标点击后staue的状态设置为play
			if(this.onoff) {
				num = 0;
				$('#slide3_Right').animate({
					bottom: '250px',
					opacity: 1
				}, 500);

				$('#slide3_Left').animate({
					bottom: 0,
					opacity: 0
				}, 500);
				$('#clickHereL').animate({
					opacity: 1
				}, 600);
				shake($('#clickHereL').get(0));
				$('#clickHereR').animate({
					opacity: 0
				}, 600);
				var timer = setInterval(function() {
					num++;
					if(num == 17) {
						clearInterval(timer)
						$('#slide3_center').get(0).statue = 'noPlay';
					}
					$('#slide3_center').css('backgroundPositionX', -num * 430 + 'px')
				}, 50)
			} else {
				num = 18;
				$('#slide3_Left').animate({
					bottom: '250px',
					opacity: 1
				}, 500)
				$('#slide3_Right').animate({
					bottom: 0,
					opacity: 0
				}, 500);
				$('#clickHereR').animate({
					opacity: 1
				}, 600);
				shake($('#clickHereR').get(0));
				$('#clickHereL').animate({
					opacity: 0
				}, 600)
				var timer = setInterval(function() {
					num++;
					if(num == 33) {
						clearInterval(timer)
						$('#slide3_center').get(0).statue = 'noPlay';
					}
					$('#slide3_center').css('backgroundPositionX', -num * 430 + 'px')
				}, 50)
			}
			this.onoff = !this.onoff;

		})
		//clickHere上下抖动；
	function shake(obj) {
		var arr = [110, 112, 114, 116, 118, 120, 118, 116, 114, 112]
		var num1 = 0;
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			num1++;
			num1 %= arr.length;
			obj.style.bottom = arr[num1] + 'px'
				//		console.log(num1)
		}, 200)
	}
	shake($('#clickHereL').get(0));

})();
//-------------------------------slide4-----------------------------------------
//图标列表鼠标滑过上移
function animateServices() {
	//	console.log(2)
	$('#services li').each(function(index, item) {
		setTimeout(function() {
			$(item).fadeIn(1000);
		}, 300 * index);
	});
}
$(window).scroll(function(e) {
	var top = $('#slide4').get(0).getBoundingClientRect().top;
	//      console.log(top)
	if(top <= 300) {
		animateServices();
	}
});
var service = $('#service');
var lis = service.find('li');
lis.each(function(index, value) {
		var as = $(value).find('a');
		$(value).hover(function() {
			$(this).animate({
				'marginTop': -30
			}, 500)
			as.eq(0).animate({
				'opacity': 1
			}, 500)
		}, function() {
			$(this).animate({
				'marginTop': 0
			}, 800)
			as.eq(0).animate({
				'opacity': 0
			}, 800)
		})
	})
	//sort_work_list鼠标移入事件
$('#sort_work_list li').hover(function() {
		$(this).addClass('hover')
	}, function() {
		if($(this).hasClass('click')) return;
		$(this).removeClass('hover')
	})
	//sort_work_list点击事件
var li = $('#sort_work_list').find('li')
$('#sort_work_list li').on('click', function() {
		li.each(function(index, value) {
			$(value).removeClass('click')
			$(value).removeClass('hover')
		})
		$(this).addClass('click')
		$(this).addClass('hover')

	})
	//#img_list鼠标滑过事件
$('#img_list li').hover(function() {
		var img = $(this).find('img');
		img.animate({
			'top': '-220px'
		}, 300)
	}, function() {
		var img = $(this).find('img');
		img.animate({
			'top': 0
		}, 300)
	})
	//把所有的li转换成绝对定位
$('#img_list li').each(function(index, item) {
	item.top = item.offsetTop + 'px';
	item.left = item.offsetLeft + 'px';
	item.width = $(item).width() + 'px';
	item.height = $(item).height() + 'px';
	console.log(item.width)
})
$('#img_list li').each(function(index, item) {
		item.style.position = "absolute";
		item.style.margin = "0";
		item.style.left = item.left;
		item.style.top = item.top;
		item.style.height = item.height;
		item.style.width = item.width;
	})
	//图片切换函数
function fil(col) {
	var len = $("#img_list li." + col).length;
	var row = Math.ceil(len / 4);
	var hei = $("#img_list li").height();
	//设置imglist的高度，自适应内容高度
	$("#img_list").animate({
		height: row * hei
	}, "1s");
	$("#img_list li." + col).each(function(index, item) {
		item.style.transition = "1s";
		item.style.opacity = 1;
		//获得元素相应位置上的left和top值；
		item.style.left = $("#img_list li").get(index).left;
		item.style.transform = "scale(1)";
		item.style.top = $("#img_list li").get(index).top;
	})
	$("#img_list li:not(." + col + ")").each(function(index, item) {
		item.style.transform = "scale(0)";
		item.style.left = item.left;
		item.style.top = item.top;
		item.style.opacity = 0;
		item.style.transition = "1s";
	})

}

//图片切换按钮添加点击事件
$('#sort_work_list li').eq(0).on('click', function() {
	fil('all');

})
$('#sort_work_list li').eq(1).on('click', function() {
	fil('web');
})
$('#sort_work_list li').eq(2).on('click', function() {
	fil('mobile');
})
$('#sort_work_list li').eq(3).on('click', function() {
	fil('logo');

})
$('#sort_work_list li').eq(4).on('click', function() {
	fil('ptoject');

});
//点击getintouch按钮页面跳转到最后一页

$('#touch').on('click', function() {
	var num1 = $('#touch').offset().top;
	var num2 = num1;
	var Top = $('#slide6').offset().top
	var timer = setInterval(function() {
		console.log(1)
		num1 += 10;
		window.scrollTo(0, num1)
		if(num1 >= Top) {
			clearInterval(timer)
			num1 = num2;
		}
	}, 16)
});
$('#touch').hover(function() {
		this.style.transition = '0.5s';
		this.style.background = '#942f86';

	}, function() {
		this.style.transition = '0.5s';
		this.style.background = '#beba3f';
	})
	//-----------------------------------------slide5--------------------------------------------
	//slide5 的背景图片随鼠标滚轮的滑动位置变化
$('#slide5').height(slideH);
(
	function() {
		var windowH = window.innerHeight;
		$(window).on('scroll', function() {
			var clientH = $('#slide5').get(0).getBoundingClientRect().top;
			var sca = clientH / windowH;
			$('#slide5').css('backgroundPositionY', -sca * 300);
			$('#air_ball').css('top', -sca * 50)
		});
	}
)();

//--------------------------------------------slide6-------------------------------------------
$('#slide6').height(slideH);
( //slide6Center添加动画效果

	function() {
		var num = 0;
		setInterval(function() {
			num++;
			num %= 15;
			$('#slide6_center').get(0).style.backgroundPositionX = -num * 343 + 'px';
		}, 70)
	}
)();
//slide6背景图随鼠标位置移动
(function() {
	var Left = $('#slide6_center').offset().left;
	var Top = $('#slide6_left').get(0).offsetTop;
	var Height = window.innerHeight;
	$(window).scroll(function() {
		var clientH = $('#slide6').get(0).getBoundingClientRect().top;
		var per = clientH / Height;
		$('#slide6_left').get(0).style.top = Top - per * 400 + 'px';
	})
	$('#slide6').on('mousemove', function(ev) {
		function calPercentL() {
			var perL = (ev.clientX / $('#slide6').width()) * 100;
			return perL;
		}
		var bgL = 50 + 0.4 * calPercentL();
		var pL = Left + 0.5 * calPercentL();
		$('#slide6').css('backgroundPosition', bgL + '% 0%');
		$('#slide6_center').css('left', pL);

	})
})();
//-----------------------------------sidebar----------------------------------
$(window).on('scroll', function() {
	var content = $('.content');
	var lis = $('#sidebar li');
	content.each(function(index, value) {
		var Top = $(value).get(0).getBoundingClientRect().top;
		if(Top <= 100) {
			lis.each(function(index, item) {
				$(item).removeClass('active')
			})
			lis.eq(index).addClass('active')
		}
	})
});
(function() {
	var num = 0;
	var index1 = 0;
	$('#sidebar li').on('click', function() {
		$('#sidebar li').each(function(index, value) {
			$(value).removeClass('active');
		})
		$(this).addClass('active');
		var index = $(this).index();
		var Top = $('.content').eq(index).offset().top;
		var timer = setInterval(function() {
			if(index > index1) {
				num += 20;
				window.scrollTo(0, num);
				if(num >= Top) {
					clearInterval(timer);
				}
				console.log(1)
			} else if(index < index1) {
				num -= 20;
				window.scrollTo(0, num);
				if(num <= Top) {
					clearInterval(timer);
				}
				console.log(2)
			} else {
				return;
			}

		}, 16)
		setTimeout(function() {
			index1 = index;
		}, 5000)

	})
})();