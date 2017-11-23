

$(document).ready(function() {
    
    // Latest Jobs widget pubDate: formatDate,
    
	$("#myJobsList ul").includeFeed({
		baseSettings: { rssURL: "/job/rss.aspx?search=1&addlocation=1" }, 
		elements: {  title: 1 }, 
		complete: function(){
            console.log($(this));
			if ($(this).children().length > 1){ 
				$(this).simplyScroll({
						
                    auto:false
					});
			}
		}
	});
    
});