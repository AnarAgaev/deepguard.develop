$(function () {

	$('.logo_t').on('click', '#show_ss', function(){
		$('.header-right').addClass('open');
	});

	$('.header-main').on('click', '#close-header', function(){
		$('.header-right').removeClass('open');
	});


	$(document).on("click", ".video-close", function(){
		$(".video-open").removeClass("video-open");
		media = document.querySelector('#video_full');
		media.pause();
		media.currentTime = 0;
	})

	$(document).on("click", ".video-close-always", function(){
		$(".video").remove()
	})

	$(document).on("click", ".video", function(e){
		if($(e.target).is(".video-close") || $(e.target).is(".video-close-always")) return false
			var vd = $(this)
		if(!vd.hasClass("video-open")){
			vd.addClass("video-open");
			media = document.querySelector('#video_full');
			media.play();
		}
	});



	$('.popup-modal-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#username',
		modal: true
	});
	$('.popup-modal-final').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#username',
		modal: true
	});
	$('.popup-modal-th').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#username',
		modal: true
	});
	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

	$(document).on('click', '.goto-site', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

		// $('input[type=tel]').inputmask('+7 (999) 999-99-99',{
		//     "greedy": true,
		//     "digits": 9
		// });

	});


$('.gost-img >div').lightGallery({counter:false});
$('.komp-img>div').lightGallery({counter:false});
$('.price > div > div').lightGallery({counter:false});

if ($.fn.owlCarousel) {
	$('.owl-op').owlCarousel({
		loop: true,
				// center:true,
				nav:false,
				dots:true,
				responsive: {
					0: {
						items: 1
					},
					767: {
						items: 2
					},
					1000: {
						items: 2
					}
				}
			});

	$('.owl-carousel-top').owlCarousel({
		loop: true,
		autoHeight: false,
		center:true,
		nav:false,
		dots:true,
						// video:true,
						responsive: {
							0: {
								items: 1
							},
							500: {
								items: 1
							},
							1000: {
								items: 1
							}
						}
					});


	$(".rev-left").click(function () {
		$(this).parent().find('.owl-op').trigger('prev.owl.carousel');
	});

	$(".rev-right").click(function () {
		$(this).parent().find('.owl-op').trigger('next.owl.carousel');
	});

}



let $date = document.querySelector('#date');
var options = {
	month: 'long',
	day: 'numeric',
};
let addDays = 7;
let date = new Date();
date.setDate(date.getDate() + addDays);
let m = date.getMonth() + 1;
let d = date.getDate();
date = date.toLocaleString("ru", options)
$('.JSdate').html(date);


Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

$('body').on('click input blur focus change keyup keydown', '.form_call_form input[type="tel"]', function () {
	if ($(this).val().length > 9 && $(this).val().length < 14) {
		$('.form_call_form').find('.btn1').removeAttr('disabled');
	} else {
		$(this).closest('.form_call_form').find('.btn1').attr('disabled', 'disabled');
	}
});

$('body').on('click input blur focus change keyup keydown', '.form-result input[type="tel"]', function () {
	if ($(this).val().length > 9 && $(this).val().length < 14) {
		$(this).closest('.form-result').find('.btn1').removeAttr('disabled');
	} else {
		$(this).closest('.form-result').find('.btn1').attr('disabled', 'disabled');
	}
});

$('body').on('click input blur focus change keyup keydown', '.form-id input[type="tel"]', function () {
	if ($(this).val().length > 9 && $(this).val().length < 14) {
		$(this).closest('.form-id').find('.btn1').removeAttr('disabled');
	} else {
		$(this).closest('.form-id').find('.btn1').attr('disabled', 'disabled');
	}
});


// Спасибо после заказать консультацию
$(document).ready(function () {
	$("form.ajax").submit(function () {
		var data_f = new FormData($("form.ajax")[0]);

		$.ajax({
			cache: false,
			contentType: false,
			processData: false,
			timeout: 60000,
			type: "POST",
			url: '/mail.php',
			data: data_f,
			success: function (e) {
				$("form.ajax").find("input[type='tel'], input[type='text']").val("");
				$.magnificPopup.close();
				$('.popup-modal-final').magnificPopup('open');
			},
			error: function () {
			}
		})

		return false;
	});

});

$(function () {

	$('.popup-with-form')
	.click(function(){
		var dataTariff = $(this).data('tariff');
		console.log('dataTariff = ' + dataTariff);
		$('#tariff_modal h5').text(dataTariff);
	})
	.magnificPopup({
		type: 'inline',
		preloader: false,
	});

	$('.go_to').click(function() {
		var scroll_el = $(this).attr('href');
		if ($(scroll_el).length != 0) {
			$('html, body').animate({
				scrollTop: ($(scroll_el).offset().top - 200)
			}, 500)
		}
		return !1
	});

	var lastScrollTop = 0, delta = 5;
	$(window).scroll(function () {
		var nowScrollTop = $(this).scrollTop();
		if (Math.abs(lastScrollTop - nowScrollTop) >= delta) {
			if (nowScrollTop > lastScrollTop) {
				$('body').removeClass('fixed-header');
			} else {
				$('body').addClass('fixed-header');
			}
			lastScrollTop = nowScrollTop;
		}
		if ($(this).scrollTop() < 80) {
			$('body').removeClass('fixed-header');
		}
		if ($(this).scrollTop() > 1200 && $('.nav-mob').hasClass('nav-mob-res')) {
			$('body').removeClass('fixed-header');
		}

	});
	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom',
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300
		}
	});
});

