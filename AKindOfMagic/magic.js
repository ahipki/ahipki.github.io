$( function() {
	var musique = $("#status button");
	var buttons = $(".section button"); 
	var divs = $("div.section"); //toutes les sections de jeu
	var validation = $("#valider"); // bouton de validation de l'enigme
	var couleur = $("span.couleur"); // boutons de changement leger de décor
	var inventaire;

	var	bonhomme2 = 0; // on ne peut faire que 2 bonhommes de neige
	var	maison = 0; // on ne peut retourner qu'une seule fois a la maison
	var	boule = 0;  // la boule ne peut etre qu'observee 2 fois

	// Affichage de depart //
	divs.not($("#intro")).hide();
	$(".force").hide();
	$("#inventaire").hide();

	// Gestion de l'arret de la musique //
	musique.click(function(){
		$("audio").remove();
		$(this).hide();
	});

	// Gestion du changement leger de decor // 
	couleur.click(function(){
		var color = $(this).attr("id");
		$("div.deco").css("background", color);
	});

	// Gestion du clic sur les boutons de choix de chemin //
	buttons.click( function() {
		$(this).closest("div").hide();
		gotoSection($(this).attr("go"));
		if ($(this).attr("go") == "choisirVoie"){
			startGame();
		}
	} );

	// Validation de l'énigme //
	validation.click( function(){
		if ($("input[value='1']").is(':checked')){
			setLife("&infin;");
			$(".vie .valeur").css("font-size","30px");
			$(".vie ").css("background","lightgreen");
			gotoSection("eternite");
			endGame();
		}
		else{
			loseBonus();
			gotoSection("enigme");
			if (getBonus() == 0){
				if (getForce() == 400){
					gotoSection("puissanceMagique");
				}
				if (getForce() == 0){
					gotoSection("fin");
				}
				endGame();
				$("#enigme").hide();

			}
		}

	});

	// Navigation entre les sections //
	function gotoSection(key) {
		var nouvelle = $("#"+key);
		nouvelle.show();

		// modification de statut //
		if (nouvelle.hasClass("perteVie")){
			loseLife();
		}
		if (nouvelle.hasClass("bonus")){
			winBonus();
		}
		if (nouvelle.hasClass("bonusx2")){
			winBonus();
			winBonus();
		}

		// gestion des incohérences et de la recursivité //
		if (key == "maison"){
			maison = 1;
		}
		if (key == "bonhomme"){
			if (bonhomme2 >= 1){
				$("#bonhomme button:first").hide();
			}
			if (maison == 1){
				$("#bonhomme button + button:first").hide();
			}
			bonhomme2++;
		}
		if (key == "boule"){
			if (boule == 1){
				$("#boule button[go='boule']").hide();
			}
			boule =1;
		}

		// gestion de l'inventaire //
		if (key == "ours"){
			$("#stylo").after("<li class='inventaire magie'>Boule Magique  <button> jeter </button> </li>");

		}
		if (key == "sac"){
			$("#stylo").after("<li class='inventaire bouffe'>Pain  <button> manger </button> </li>");
			$("#stylo").after("<li class='inventaire bouffe'>Chips  <button> manger </button> </li>");
			$("#stylo").after("<li class='inventaire potion'>Potion Verte <button> boire </button> </li>");
			$("#stylo").after("<li class='inventaire potion'>Potion Bleue <button> boire </button> </li>");
			$("#stylo").after("<li class='inventaire potion'>Potion Rouge <button> boire </button> </li>");
		}
		inventaire = $(".inventaire button");
		

		inventaire.click( function(){
			if ($(this).parent().hasClass("potion") || $(this).parent().hasClass("bouffe")){
				$(this).parent().hide();
				// propriété magique du mur donne 60 de plus
				if ($("#"+key).hasClass("mur")){
					winLife(60);
				}
				else{
					winLife(10);
				}
			}
			if ($(this).parent().hasClass("magie")){
				$("button[go='boule']").hide();
				$(this).parent().hide();
				if ($("#"+key).hasClass("mur")){
					setForce(400);
					$(".force").show();
					$(".force").css("display","inline-block");


				}
			}
		});

		// Nouvelle musique lors de l'apparition du mur //
		if (key == "sortie"){
			$("audio").attr("src", "./music/aKindOfMagic.mp3")
		}

		// gestion de la mort //
		if ((getLife() == 0)){
			$(".vie ").css("background","red");
			$(".vie ").css("color","white");
			nouvelle.hide();
			$("#mort").show();
			endGame();
		}

		if (key == "intro"){
			location.reload(true);
		}



	}

	// Gestion du statut //
	/// Gestion de la vie ///
	function getLife() {
		var life = $(".vie .valeur").html();
		return parseInt(life);
	}
	
	function setLife(v) {
		$(".vie .valeur").html(v);
	}
	
	function loseLife() {
		var life = getLife()-10;
		$(".vie .valeur").html(life.toString());
	}

	function winLife(v) {
		var life = getLife()+v;
		$(".vie .valeur").html(life.toString());
	}
	
	/// Gestion des points bonus ///
	function getBonus() {
		return parseInt($(".bonus .valeur").html());
	}
	
	function setBonus(v) {
		$(".bonus .valeur").html(v);
	}
	
	function loseBonus() {
		$(".bonus .valeur").html((getBonus()-10).toString());
	}

	function winBonus() {
		$(".bonus .valeur").html((getBonus()+10).toString());
	}

	/// Gestion de la force ///
	function getForce(){
		return parseInt($(".force .valeur").html());
	}
	function setForce(v){
		$(".force .valeur").html(v);
	}

	// Initialisation du statut //
	function startGame() {
		setLife(40);
		setBonus(10);
		setForce(0);
		$("#inventaire").show();
	}
	
	
	function endGame() {
		$("#inventaire").hide(); // pour ne pas utiliser les objets après

	}
	
	// Gestion des konami codes pour la reponse //
	var listener = new window.keypress.Listener();
	listener.sequence_combo("r e p o n s e", function() {
		solution();
	}, true);

	listener.sequence_combo("s o l u t i o n", function() {
		solution();
	}, true);

	function solution(){
		alert("Ne pas refaire de bonhomme de neige pour ne pas mourir");
		alert("Repondre à l'énigme par le premier choix pour la vie éternelle");
		alert("Utiliser ses items devant le mur pour plus de bonus");
	}

} );