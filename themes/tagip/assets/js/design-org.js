var w_h = 0;
var t_1;

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
	
	// Ancre fluide
	jQuery('a[href^="#"]').click(function(){  
		// Ancre à échapper
		var el_objet_echap = new Array('connexion');
		
		var el_objet_tmp = jQuery(this).attr("href");
		el_objet_tmp = el_objet_tmp.replace('#', '');
		var el_objet = jQuery("#" + el_objet_tmp);
		
		if(el_objet_echap.indexOf(el_objet_tmp) == -1){
			// Objet non idendifié
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
	
	
	// Pophover
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
	
	// Vivus
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
	
	
	// console.log(window.navigator.userAgent);
	jQuery('#content1').addClass('tg-active');
	// Animation sur scroll
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
	
	jQuery(window).trigger('scroll');
	if(jQuery('.tg_track').length){ jQuery(window).trigger('scroll'); }
});


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
		
		// Slide accueil
		if(jQuery(window).width() >= 380){
			if(h <= 360){
				jQuery('.tg-ct-0').css('minHeight', 320);
			}else{
				jQuery('.tg-ct-0').css('height', (w <= 1024 ? (w <= 479 ? (h - 70) : (h - 90)) : h));
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