!(function($){
// regular js

// jquery
$(function(){

	// $('.languages').prependTo($('.multilingual'));


	$( "#en" ).click(function() {
      $( "select#ddlLanguages" ).val('1').change();
    });
	$( "#jp" ).click(function() {
      $( "select#ddlLanguages" ).val('4').change();
    });
	
	if ( $( "select#ddlLanguages option:selected" ).val() == 1) {
		  $("#jp").removeClass('active');
	}
	if ( $( "select#ddlLanguages option:selected" ).val() == 4) {
		  $("#en").removeClass('active');
	}
	


	if ($('#site-topnav .user-loggedIn').length) {
		$('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
	}




	var currentPage = window.location.pathname.toLowerCase();

	// remove empty li's on the system pages. 
	$("#side-left li:empty").remove();

	// remove empty left side bar
	if ($('#prefix_left-navigation').children().length == 0) {
		$('#prefix_left-navigation').remove();
	}
	if ($('#side-left').children().length == 0) {
		$('#side-left').remove();
	}

	/* Adding Bootstrap Classes */
	// Section > Div.container
	$('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');

	// dynamic side columns column
	$('#dynamic-side-right-container, #side-right').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
	if ( !$("#r_full-width").length )
	{
		$('#dynamic-side-left-container, #side-left, #job-side-column').addClass('hidden-xs col-sm-4 col-md-3');
		if ( $.trim($('#dynamic-side-left-container, #side-left').html()).length ) {
			$('#dynamic-content, #content').addClass('col-xs-12 col-sm-8 col-md-9');
		} else {
			$('#dynamic-content, #content').addClass('col-sm-12 col-md-12');
		}
	}
	else
	{
		$('#dynamic-content, #content').addClass('col-sm-12 col-md-12');	
		$('#dynamic-side-left-container, #side-left, #job-side-column').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
	} 

	// Dynamic Content column
	if ( $.trim($('#side-left').html()).length ) 
	{
		$('#dynamic-content, #content').addClass('col-xs-12 col-sm-8 col-md-9');
	} 
	else 
	{
		$('#dynamic-content, #content').addClass('col-sm-12 col-md-12');
	}
	
	/* Hidden left nav */
	if ((currentPage == "/member/createjobalert.aspx") || (currentPage == "/advancedsearch.aspx") || (currentPage == "/member/login.aspx") || (currentPage == "/member/register.aspx") ){
		$('.hidden-left-nav').show();
	}
	if((document.URL.indexOf("/advancedsearch.aspx?search=1") >= 0)){
		$('.hidden-left-nav').hide();
	}

	// remove empty li's on the system pages. 
	$("#r_left-navigation li:empty").remove();

	// remove empty left side bar
	if ($('#prefix_left-navigation').children().length == 0) {
		$('#prefix_left-navigation').remove();
	}
	if ($('#r_left-navigation').children().length == 0) {
		$('#r_left-navigation').remove();
	}

	// Repsonsive image
	$('.dynamic-content-holder img').addClass('img-responsive');

	// Responsive table
	$('.dynamic-content-holder table, .content-holder table').wrap('<div class="table-responsive"></div>');
	// $('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');
	$("#no_border").removeClass('table table-bordered');

	// Convert top menu to Boostrap Responsive menu
	$('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
	$('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
	$('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
	$('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
	$('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle','dropdown');
	$('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');

	// add placeholder for search widget text field
	$('#keywords1').attr('placeholder','Keywords search');

	// add active class to links.
	$("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
	$("li.active li.active").parent().closest("li.active").removeClass("active");
	$(".nav li li.active").closest(".nav > li").addClass("active");

	// generate select navigation from sidebar Dynamic menu
	$("#dynamic-content").convertNavigation({
		title: "Related Pages", 
		links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
	});

	// generate actions button on Job Listing page
	$(".job-navbtns").convertButtons({
		buttonTitle: "Actions&hellip;", 
		title: "Please choose&hellip;", 
		links: ".job-navbtns a"
	});

	// generate filters button on Job Listing page
	$(".job-navbtns").convertFilters({
		buttonTitle: "Filters&hellip;", 
		filteredTitle: "Applied Filters", 
		title: "Please choose&hellip;", 
		filtered: ".search-query p", 
		list: "ul#side-drop-menu", 
		excludeFromList: "#AdvancedSearchFilter_PnlCompany"
	});



});

// Resize action
$(window).on('resize', function() {

	var wi = $(this).width();

	// Mobile & Tablet
	if ( wi <= 992 ) {		
		$('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
	}
	//  Desktop
	else {
		$('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
	} 

});

$(document).ready(function() {

	// Resize action
	var $window = $(window);
	// Function to handle changes to style classes based on window width
	function checkWidth() {
		if ($window.width() < 992) {
			$('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');	
		}
	}
	// Execute on load
	checkWidth();			
	// Bind event listener
	$(window).resize(checkWidth);


	// Latest Jobs widget
	/*$("#myJobsList ul").includeFeed({
		baseSettings: { rssURL: "/job/rss.aspx?search=1&addlocation=1" }, 
		elements: { pubDate: formatDate, title: 1, description: 1 }, 
		complete: function(){
			if ($(this).children().length > 2){ 
				$(this).simplyScroll({frameRate:60});
			}
		}
	});*/
		
	// News feed
	$('#myNewsDiv.feed-knowledge').includeFeed({
		baseParams: { contentType: "xml", rssURL: "/newsrss.aspx?category=knowledge-centre", ellipsis: "&hellip;", itemTag: "li", limit: 1, title: 50 }, 
		elements: { description: 0 } 
	});
	$('#myNewsDiv.feed-placements').includeFeed({
		baseParams: { contentType: "xml", rssURL: "/newsrss.aspx?category=placements", ellipsis: "&hellip;", itemTag: "li", limit: 3, title: 50 }
	});

	$("#myNewsDiv.feed-testimonial").includeFeed({
		baseSettings: { rssURL: "/newsrss.aspx?category=testimonials" }, 
		elements: { title: 1, description: 1 }, 
		complete: function(){
			if ($(this).children().length > 1){ 
					$(this).simplyScroll({
						frameRate:15,
						customClass: 'vert',
						orientation: 'vertical'	
					});
			}
		}
	});


	// Equal Height	
	$.fn.eqHeights = function(options) {

		var defaults = {child: false};  
		var options = $.extend(defaults, options); 
		var el = $(this);
		if (el.length > 0 && !el.data('eqHeights')) {
			$(window).bind('resize.eqHeights', function() {
				el.eqHeights();
			});
			el.data('eqHeights', true);
		}
		if( options.child && options.child.length > 0 ){
			var elmtns = $(options.child, this);
		} else {
			var elmtns = $(this).children();
		}

		var prevTop = 0;
		var max_height = 0;
		var elements = [];
		elmtns.height('auto').each(function() {

			var thisTop = this.offsetTop;
			if (prevTop > 0 && prevTop != thisTop) {
				$(elements).css('min-height',max_height);
				max_height = $(this).height();
				elements = [];
			}
			max_height = Math.max(max_height, $(this).height());
			prevTop = this.offsetTop;
			elements.push(this);
		});

		$(elements).css('min-height',max_height);
	};

	//Equal Height - Usage
	 setTimeout(function(){
	  $('.staff-holder').eqHeights(); 
	}, 500);
	

	// if there is a hash, scroll down to it. Sticky header covers up top of content.
	if ( $(window.location.hash).length )
	{
		$("html, body").animate({
			scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - $("#dynamic-content, #content").css("padding-top").replace(/[^-\d\.]/g, '')
		}, 100);
	}

});



})(jQuery);

