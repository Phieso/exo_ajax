$(document).ready(function(){
	var btn = $('#charger');
	btn.on('click', function(){
		$.getJSON("https://jsonplaceholder.typicode.com/posts")
			.done(function(data){
				
				data.forEach(function(i) {
					var div = $('<div class="article"></div>');
					var h2 = $('<h2></h2>');
					var p = $('<p></p>');
					var hr = $('<hr>');

					btn.after(div);

					h2.text(i.title);
					div.append(h2);

					p.text(i.body);
					div.append(p);
					
					div.after(hr);
				})
				
				//équivalent à :
				/**	
					for(var i=0; i<data.length; i++){
					var div = $('<div class="article"></div>');
					var btn = $('#charger');
					var h2 = $('<h2></h2>');
					var p = $('<p></p>');
					var hr = $('<hr>');

					btn.after(div);

					h2.text(data[i].title);
					div.append(h2);

					p.text(data[i].body);
					div.append(p);
					
					div.after(hr); 

					} **/
			})

			.fail(function(jqXHR, status) {
				console.log(status)
			});
		});
});