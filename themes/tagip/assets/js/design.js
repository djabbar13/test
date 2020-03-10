var w_h = 0;
var t_1;
var animation = false;
var animation2 = false;

jQuery(document).ready(function(){
	var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
	
	testMobile = isMobile.any();
	
	jQuery('a[href^="#"]').click(function(){  
		var el_objet_echap = new Array('connexion', 'content1', 'content2', 'content3', 'content4');
		
		var el_objet_tmp = jQuery(this).attr("href");
		el_objet_tmp = el_objet_tmp.replace('#', '');
		var el_objet = jQuery("#" + el_objet_tmp);
		
		if(el_objet_echap.indexOf(el_objet_tmp) == -1){
			if(el_objet.length == 0){
				return false;
			}
			jQuery('html, body').animate({  
				scrollTop: jQuery(el_objet).offset().top - 60
			}, 1600); 
			
			return false;
		}
	});
	
	jQuery('#menuToggle').click(function(){
		jQuery('.js-menu')
			.addClass('is-active')
			.css('z-index', 10001);
		
		jQuery(this).addClass('tg-open');
	});
	
	jQuery('.js-menuCloseBtn').click(function(){
		jQuery('.js-menu').removeClass('is-active');
		jQuery('#menuToggle').toggleClass('tg-open');
		setTimeout(function(){
			jQuery('.js-menu').css('z-index', -1);
		}, 300);
	});
	
	
	jQuery('.tg-alert-rapport').click(function(){
		jQuery('#' + jQuery(this).data('content')).slideToggle("slow");
		jQuery(this).toggleClass('tg-active');
	});
	
	jQuery('.tg-abonnement-tbl2 img').click(function(){
		jQuery(this).toggleClass('tg-active');
		jQuery(this).parent().children('p').slideToggle('slow');
	});
	
	
	jQuery('.tg-plus').webuiPopover({
		animation : 'fade',
		closeable : true,
		content : jQuery('#tg_societe_liste').html(),
		delay: {
			show : 300,
			hide : 500
		},
		placement : 'bottom',
		trigger : 'hover',
		width : 350,
	});
	
	if(jQuery('#tg-activite-1').length > 0){
		for(var $ref = 1; $ref < 5; $ref++){
			setTimeout(vivus_, ($ref * 600), $ref);
		}
	}
	
	function vivus_($ref){
		new Vivus(
			'tg-activite-' + $ref, 
			{
				duration : 150,
				type : 'delayed',
				file : jQuery('#tg-activite-' + $ref).data('svg'),
			}
		);
	}
	jQuery('.tg-avantage, .tg-avantage2').find('p').addClass('tg-item tg-animate tg-animate2 animated2 visible-section').attr({'data-animate' : 'fadeIn', 'data-cache' : 'fadeOut'});
	
	
	jQuery('#content1').not('.page-id-55b').addClass('tg-active');
	w_h = (jQuery(window).height() / 2) + 150;
	
	jQuery(window).scroll(function(){
		if(jQuery(window).width() >= 320){
			
			jQuery('.tg-item').filter('.tg-animate').each(function(){
				var courant = jQuery(this);
				var bufferChecker = Math.min(0.7 * jQuery(this).outerHeight(), w_h);
				var debut_objet = courant.offset().top + bufferChecker;
				var fin_fenetre = jQuery(window).scrollTop() + jQuery(window).height();
				if( fin_fenetre > debut_objet ){
					courant.addClass("visible-section");
					courant.removeClass("hidden-section");
					if(typeof jQuery(courant).data('cache') != 'undefined'){
						courant.removeClass(jQuery(courant).data('cache'));
					}
					if(typeof jQuery(courant).data('animate') != 'undefined' && jQuery(courant).hasClass('visible-section')){
						courant.addClass(jQuery(courant).data('animate') + ' animated');
					}
					if(courant.hasClass('tg-forms-geeks')){
						jQuery("#tgFormsGeeks").find('.tg-text-3').typed({
							strings: [jQuery('.tg-forms-geeks-ct').val()],
							backDelay: 5,
							typeSpeed: 0,
						});
					}
				} else {
					courant.removeClass("visible-section");
					if(typeof jQuery(courant).data('animate') != 'undefined'){
						courant.removeClass(jQuery(courant).data('animate'));
						if(typeof jQuery(courant).data('cache') != 'undefined'){
							courant.addClass(jQuery(courant).data('cache'));
						}else{
							courant.addClass('fadeOutDown');
						}
					}
					courant.addClass("hidden-section animated");
				}
			});
		}else{
			jQuery('.page-id-4 #tg-ct-0').css('opacity', 1);
			jQuery('.page-id-4 #tg-ct-0').css('background-size', 'cover');
			
			if((jQuery('.tg-forms-geeks').children('.tg-text-3').text()).length == 0){
				jQuery('.tg-forms-geeks').children('.tg-text-3').text(jQuery('.tg-forms-geeks-ct').val());
			}
		}
		
	});
	
	
	
	jQuery('.tg-smart-menu li a').on('click', function(e){
		e.preventDefault();
		var href = jQuery(this).attr('href');
		jQuery('.tg-content').css('display', 'none');
		jQuery('.tg-smart-menu li').removeClass('active');
		jQuery(this).parent().addClass('active');
		jQuery(href).css('display', 'block');
		
		jQuery(this).parent('li').trigger('click');
		return false;
	});
	jQuery('.tg-smart-menu-footer2 li a').on('click', function(e){
		e.preventDefault();
		jQuery('.tg-smart-menu-footer2 li').removeClass('active');
		jQuery('.tg-smart-menu2 li').removeClass('active');
		jQuery(this).parent().addClass('active');
		var href = jQuery(this).parent('li');
		
		jQuery('.tg-smart-menu li').eq(jQuery('.tg-smart-menu-footer2 li').index(href)).trigger('click');
		jQuery('.tg-smart-menu2 li').eq(jQuery('.tg-smart-menu-footer2 li').index(href)).addClass('active');
		jQuery('#menuToggle2').removeClass('open');
		jQuery('#menuToggle2').parent().children('.list-unstyled').slideUp();
		
		setTimeout(function(){ jQuery('html, body').animate({ scrollTop: jQuery('body.page2').offset().top }, 1000); }, 1000);
	});
	
	jQuery('.tg-smart-menu li').on('click', function(){
		var obj = jQuery(this);
		var href = obj.find('a').attr('href');
		jQuery('.tg-content').css('display', 'none');
		jQuery('.tg-smart-menu li, .tg-smart-menu-footer2 li').removeClass('active');
		obj.addClass('active');
		jQuery('.tg-smart-menu-footer2 li').removeClass('active');
		jQuery('.tg-smart-menu-footer2 li').eq(jQuery('.tg-smart-menu li').index(obj)).addClass('active');
		jQuery(href).css('display', 'block');
		
		jQuery('body').removeClass('index1 index2 index3 index4').addClass(jQuery(this).children('a').data('classbody'));
		setTimeout(function(){ jQuery('html, body').animate({ scrollTop: jQuery('body.page2').offset().top }, 1000); }, 1000);
		
		if(animation){
			animation.destroy();
		}
		
		switch(jQuery(this).children('a').data('classbody')){
			case 'index1':
				params = {
					path: '/images/json/page1.json',
					loop: true,
				};
				animation = smartAnimation(params);
				animation.play();
				jQuery('.tg-smart-menu').attr('data-menu', 1);
				jQuery(window).trigger('resize');
				resizeImg('page1');
				break;
			
			case 'index2':
				if(jQuery(window).width() > 767){
					params = {
						path: '/images/json/page2b.json?v3',
					};
					animation = smartAnimation(params);
					animation.play();
					jQuery('.tg-smart-menu').attr('data-menu', 2);
				}else{
					if(animation2){
						animation2.destroy();
					}
					params = {
						container: document.getElementById('imagefond2'),
						path: '/images/json/page2b.json',
						loop: false, 
					};
					animation2 = smartAnimation(params);
					animation2.play();
				}
				resizeImg('page2');
				break;
			
			case 'index3':
				resizeImg('page3');
				jQuery('.tg-smart-menu').attr('data-menu', 3);
				setTimeout(function(){ jQuery(window).trigger('resize'); }, 500);
				break;
				
			case 'index4':
				resizeImg('page4');
				jQuery('.tg-smart-menu').attr('data-menu', 4);
				break;
			
		}
	});
	jQuery('.tg-smart-menu li').eq(0).click();
	
	// Page 3
	params = {
		container: document.getElementById('imagefond3a'),
		path: '/images/json/page3a.json',
		loop: true, 
	};
	smartAnimation(params).play();
	
	params = {
		container: document.getElementById('imagefond3b'),
		path: '/images/json/page3b.json',
		loop: true, 
	};
	smartAnimation(params).play();
	
	params = {
		container: document.getElementById('imagefond3c'),
		path: '/images/json/page3c.json',
		loop: true, 
	};
	smartAnimation(params).play();
	
	// Page 4
	params = {
		container: document.getElementById('imagefond4'),
		path: '/images/json/page4.json',
		loop: true, 
	};
	smartAnimation(params).play();
	
	jQuery(window).trigger('scroll');
	if(jQuery('.tg_track').length){ jQuery(window).trigger('scroll'); }
	
	jQuery(window).resize(function(){ jQuery(window).trigger('mousewhell'); });
	jQuery(window).trigger('resize');
	
	jQuery('#menuToggle2').on('click', function(){
		if(jQuery(this).hasClass('open')){
			jQuery(this).removeClass('open');
			jQuery(this).parent().children('.list-unstyled').slideUp();
		}else{
			jQuery(this).addClass('open');
			jQuery(this).parent().children('.list-unstyled').slideDown();
		}
	});
	
	jQuery('.tg-smart-menu-item').on('click', function(e){
		e.preventDefault();
		let active = jQuery(this).parent('li');
		jQuery('.tg-smart-menu2').find('li').each(function(){
			jQuery(this).removeClass('active');
		});
		active.addClass('active');
		jQuery('#menuToggle2').trigger('click');
		jQuery('.tg-smart-menu li').eq(active.index()).trigger('click');
	});
	
	jQuery('#content1 .tg-bloc-noir').click(function(){
		if(jQuery('#content1 video').get(0).paused){
			jQuery('#content1 video').get(0).play();
		}else{
			jQuery('#content1 video').get(0).pause();
		}
	});
	jQuery('#content1 video').on('ended', function(){
		jQuery(this).get(0).load();
	});
});

function resizeImg(type){
	h = (jQuery(window).outerHeight());
	w = (jQuery(window).outerWidth());
	surplusH = 35;
	
	switch(type){
		case 'page1' :
			if(h > 900){
				// Page 1
				if(jQuery('#content1').css('display') != 'none'){
					maxHeight1 = jQuery('#content1 .tg-ct-0b').outerHeight(false);
					titremarge1 = 0;
					marge1 = Math.floor((h - maxHeight1 - surplusH) / 2);
					jQuery('#content1 .tg-ct-0b').css({'marginBottom' : marge1 + titremarge1, 'marginTop' : marge1 - titremarge1});
				}
			}else{
				jQuery('#content1 .tg-ct-0b').removeAttr('style');
			}
			
			if(w > 767 && h <= 900){
				setTimeout(function(){ jQuery('body.index1 .imagefond svg').css('min-height', jQuery('#content1 .tg-ct-0b').outerHeight(false)); }, 200);
			}
			
			break;
			
		case 'page2' : 
			if(h > 900){
				// Page 2
				if(jQuery('#content2').css('display') != 'none'){
					maxHeight2 = jQuery('#content2 .tg-ct-0b').outerHeight(false);
					titremarge2 = parseInt(jQuery('#content2 h1').css('marginTop'));
					marge2 = Math.floor((h - maxHeight2 - surplusH) / 2);
					jQuery('#content2 .tg-ct-0b').css({'marginBottom' : marge2 + titremarge2, 'marginTop' : marge2 - titremarge2});
				}
			}else{
				jQuery('#content2 .tg-ct-0b').removeAttr('style');
			}
			break;
		
		case 'page3' :
			maxHeight = jQuery('#content3 .tg-ct-titre').outerHeight(true);
			maxHeight += surplusH;
			
			maxHeightct2 = 0;
			maxHeightimg = 0;
			jQuery('#content3').find('.tg-content2').each(function(){
				maxHeightct2 = Math.max(maxHeightct2, parseInt(jQuery(this).outerHeight(false)));
			});
			jQuery('#content3').find('.imagefond3').each(function(){
				maxHeightimg = Math.max(maxHeightimg, parseInt(jQuery(this).find('svg').attr('height')));
			});
			
			if(h - maxHeight - maxHeightct2 < 80){
				jQuery('#content3').find('.imagefond3 div').css('maxHeight', 80);
				jQuery('#content3').find('.imagefond3 div svg').css('maxHeight', 'inherit');
				jQuery('#content3').find('.tg-content2').css('marginTop', 80);
				
				jQuery('#content3 .tg-avantage').css('height', h - maxHeight);
				jQuery('#content3 .tg-ct-txt2').removeAttr('style');
			}else if(h - maxHeight - maxHeightct2 <= maxHeightimg){
				jQuery('#content3').find('.imagefond3 div').css('maxHeight', h - maxHeight - maxHeightct2);
				jQuery('#content3').find('.imagefond3 div svg').css('maxHeight', 'inherit');
				jQuery('#content3').find('.tg-content2').css('marginTop', h - maxHeight - maxHeightct2 + Math.floor(surplusH / 2));
				
				jQuery('#content3 .tg-avantage').css('height', h - maxHeight);
				jQuery('#content3 .tg-ct-txt2').removeAttr('style');
			}else{
				jQuery('#content3').find('.imagefond3 div').removeAttr('style');
				jQuery('#content3').find('.imagefond3 div svg').css('maxHeight', '100%');
				jQuery('#content3').find('.tg-content2').css('marginTop', maxHeightimg + surplusH);
				
				jQuery('#content3 .tg-avantage').css('height', maxHeightct2 + maxHeightimg + surplusH);
				marge = Math.floor((h - maxHeight - maxHeightct2 - maxHeightimg) / 2);
				jQuery('#content3 .tg-ct-txt2').css({'marginBottom' : marge, 'marginTop' : marge});
			}
			
			if(w > 767){
				jQuery('#content3').find('.imagefond3').each(function(){
					parent = jQuery(this).parent();
					element = jQuery(this).detach();
					if(element){
						jQuery(element).insertBefore(jQuery(parent).children('.tg-content2'));
					}
				});
			}else{
				jQuery('#content3').find('.imagefond3').each(function(){
					parent = jQuery(this).parent();
					element = jQuery(this).detach();
					if(element){
						jQuery(element).insertAfter(parent.children('.tg-content2'));
					}
				});
			}
			break;
		
		case 'page4' : 
			himagefond4 = h - parseInt(jQuery('.tg-ct-txt').outerHeight(false));
			himagefond4 -= parseInt(jQuery('#content4 .tg-ct-img').css('marginTop'));
			himagefond4 -= surplusH;
			
			maxHeight = parseInt(jQuery('#imagefond4').css('maxHeight'));
			if(himagefond4 > maxHeight){
				marge = Math.floor((himagefond4 - maxHeight) / 2);
				jQuery('.tg-ct-txt').css({'marginBottom' : marge, 'marginTop' : marge});
			}else{
				jQuery('.tg-ct-txt').css({'marginBottom' : 0, 'marginTop' : 0});
			}
			jQuery('#imagefond4').css('height', himagefond4); 
			break;
	}
}
var tempo = true;
jQuery(window).on('wheel', function(event){ scrollPage(event); });
	function scrollPage(event){
		if(jQuery(window).width() > 1024){
			scrollLeftPage = parseInt(jQuery('.tg-smart-menu').attr('data-menu'));
			
			if(tempo){
				if(event.originalEvent.deltaY > 0){
					// Déplacement Droite
					switch(scrollLeftPage){
						case 1 :
							scrollLeftPage = 2;
							jQuery('.tg-smart-menu').attr('data-menu', scrollLeftPage);
							jQuery('.tg-smart-menu .tg-list-menu').find('li').eq(scrollLeftPage - 1).trigger('click');
							jQuery('.tg-smart-menu2 li').removeClass('active').eq(scrollLeftPage - 1).addClass('active');
							break;
							
						case 2 :
							scrollLeftPage = 3;
							jQuery('.tg-smart-menu').attr('data-menu', scrollLeftPage);
							jQuery('.tg-smart-menu .tg-list-menu').find('li').eq(scrollLeftPage - 1).trigger('click');
							jQuery('.tg-smart-menu2 li').removeClass('active').eq(scrollLeftPage - 1).addClass('active');
							break;
							
						case 3 :
							scrollLeftPage = 4;
							jQuery('.tg-smart-menu').attr('data-menu', scrollLeftPage);
							jQuery('.tg-smart-menu .tg-list-menu').find('li').eq(scrollLeftPage - 1).trigger('click');
							jQuery('.tg-smart-menu2 li').removeClass('active').eq(scrollLeftPage - 1).addClass('active');
							break;
					}
				}else{
					// Déplacement Gauche
					switch(scrollLeftPage){
						case 2 :
							scrollLeftPage = 1;
							jQuery('.tg-smart-menu').attr('data-menu', scrollLeftPage);
							jQuery('.tg-smart-menu .tg-list-menu').find('li').eq(scrollLeftPage - 1).trigger('click');
							jQuery('.tg-smart-menu2 li').removeClass('active').eq(scrollLeftPage - 1).addClass('active');
							break;
							
						case 3 :
							scrollLeftPage = 2;
							jQuery('.tg-smart-menu').attr('data-menu', scrollLeftPage);
							jQuery('.tg-smart-menu .tg-list-menu').find('li').eq(scrollLeftPage - 1).trigger('click');
							jQuery('.tg-smart-menu2 li').removeClass('active').eq(scrollLeftPage - 1).addClass('active');
							break;
							
						case 4 :
							scrollLeftPage = 3;
							jQuery('.tg-smart-menu').attr('data-menu', scrollLeftPage);
							jQuery('.tg-smart-menu .tg-list-menu').find('li').eq(scrollLeftPage - 1).trigger('click');
							jQuery('.tg-smart-menu2 li').removeClass('active').eq(scrollLeftPage - 1).addClass('active');
							break;
					}
				}
				tempo = false;
				setTimeout(function(){ tempo = true; }, 1000);
			}
		}
		
	}


// Animation de fond, image
function smartAnimation(params){
	default_params = {
		container: document.getElementById('imagefond'),
		renderer: 'svg',
		loop: false, 
		autoplay: false,
	};
	params = jQuery.extend(true, {}, default_params, params);
	
	return lottie.loadAnimation(params);
}

/*
 *	Screen container
 *	full ; full-stretched
 */

var panelsStyles = {"fullContainer" : "body"};
jQuery(function(t){
	var e = t(panelsStyles.fullContainer);
	0 === e.length && (e = t("body"));
	var r = function(){
		h = (jQuery(window).outerHeight());
		w = (jQuery(window).outerWidth());
		
		if(jQuery(window).width() >= 380){
			if(h <= 360){
				jQuery('.tg-ct-0').css('minHeight', 320);
			}else{
				jQuery('.tg-ct-0').css('height', (w <= 1024 ? (w <= 479 ? (h - 70) : (h - 90)) : h));
			}
		}
		
		// Page 3
		resizeImg('page3');
		if(jQuery(window).width() >= 768){		
			// Page 1,2
			resizeImg('page1');
			resizeImg('page2');
			
			// Page 3,4
			// resizeImg('page3');
			resizeImg('page4');
		}
		
		if(jQuery(window).width() <= 479){
			if(jQuery('body').hasClass('page2')){
				element = jQuery('#page').find('#masthead').detach();
				if(element){
					jQuery(element).insertBefore('.imagefond');
				}
			}
		}else{
			if(jQuery('body').hasClass('page2')){
				element = jQuery('#masthead').detach();
				if(element){
					jQuery(element).insertBefore('#content1');
				}
			}
		}
		
		t(".full-container").each(function(){
			var r = t(this);
			r.css({
				"margin-left": 0,
				"margin-right": 0,
				"padding-left":0,
				"padding-right": 0
			});
			var i = r.offset().left - e.offset().left;
			var n = e.outerWidth() - i - r.parent().outerWidth();
			
			r.css({
				"margin-left": -i,
				"margin-right": -n,
				"padding-left": "full" === r.data("stretch-type") ? i : 0,
				"padding-right": "full" === r.data("stretch-type") ? n : 0
			});
			var l = r.find("> .panel-grid-cell");
			"full-stretched" === r.data("stretch-type") && 1 === l.length && l.css({"padding-left":0,"padding-right":0});
			r.css({"border-left":0,"border-right":0});
		}), t(".full-container").length && t(window).trigger("panelsStretchRows");
		var w_h = (jQuery(window).height() / 2) + 150;
	};
	
	t(window).resize(r);
	r();
	"undefined" != typeof t.stellar && setTimeout(function(){ t.stellar({horizontalScrolling:!1,responsive:!0})},100);
});


( function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var element = document.getElementById( location.hash.substring( 1 ) );

			if ( element ) {
				if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();