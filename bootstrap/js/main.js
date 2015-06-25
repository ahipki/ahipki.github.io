$( function() {

	$(".item-plus .btn").click(function(){
		$(this).parent().next().toggle();
	});

});