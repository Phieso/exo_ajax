/**- découper la page en deux zones gauche et droite:
liste des albums / affichage des photos d'un album
Au clic sur charger:
- commencer par lister les albums, avec leur titre, grâce à l'API https://jsonplaceholder.typicode.com/albums
- puis au clic sur le titre d'un album, afficher le détail de toutes les photos de l'album, charger la liste des photos correspondantes grâce à l'API https://jsonplaceholder.typicode.com/albums/{id_de_l-album}/photos
**/

$(document).ready(function(){
	var btn = $('#charger');
	var ul = $('<ul>');
	var loader = $('#loader');
	var gauche = $('.gauche');
	var droite = $('.droite');
	
	btn.on('click', function(){
		$('#loader').show();
		$.getJSON('https://jsonplaceholder.typicode.com/albums')
			.done(function(data){
				$('#loader').hide();
				$.each(data, function(i, album){
					var a = $('<a>').addClass('album');
					var li = $('<li>');
					
					a
						.text(album.id + ' ' + album.title)
						.attr('href', "#")
						.attr('data-album_id', album.id);
					
					li.append(a);
					ul.append(li);
				});
				gauche.append(ul);
			})
	});		

	gauche.on('click', 'a.album', function(evt){
		evt.preventDefault();
		droite.empty();

		var albumId = $(this).data('album_id');
		var url = 'https://jsonplaceholder.typicode.com/albums/'+albumId+'/photos';

		$.ajax({
			url : url
		}).done(function(albumContent){
			for(var i = 0; i < albumContent.length; i++) {
				var img = $('<img/>').attr('src', 'photo.thumbnailUrl');
				img.appendTo(droite);
			}
		});
	})
	
});