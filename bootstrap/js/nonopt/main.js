$( function() {
	var tabColor = ["red", "orange", "blue", "purple", "green", "violet"];

	$(".item-plus .btn").click(function(){
		$(this).parent().next().toggle();
	});
	cheet('c o l o r', function () {
		if (tabColor.indexOf("red") == 0){
			$("[color='red']").attr("color", "#EEEEEE");
			$("[color='orange']").attr("color", "#2980b9");
			$("[color='blue']").attr("color", "#3498db");
			$("[color='purple']").attr("color", "#FFFFFF");
			$("[color='green']").attr("color", "#000000");
			$("[color='violet']").attr("color", "#23527C");
			tabColor = ["#EEEEEE", "#2980b9", "#3498db", "#FFFFFF", "#000000", "#23527C"];
		}
		else{
			$("[color='#EEEEEE']").attr("color", "red");
			$("[color='#2980b9']").attr("color", "orange");
			$("[color='#3498db']").attr("color", "blue");
			$("[color='#FFFFFF']").attr("color", "purple");
			$("[color='#000000']").attr("color", "green");
			$("[color='#23527C']").attr("color", "violet");
			tabColor = ["red", "orange", "blue", "purple", "green", "violet"];
		}
		

	});
	$(".sq").click(function(){
		var i = tabColor.indexOf($(this).attr('color'));
		if (i == 5){ 
			i = -1;
		}
		$(this).attr('color', tabColor[i+1]);
	});
});


