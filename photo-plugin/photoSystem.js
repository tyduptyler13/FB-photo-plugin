
//Jquery is required for this to function.
/**
 * @author Tyler Scott
 * 
 * <p>This library/plugin allows developers to put facebook
 *  photos and albums on their website in an easy way and allows
 *  for the maximum customization.
 *  </p>
 */
PhotoSystem = function(){
	//Edit this to choose what the program will show.
	this.settings = { //Class format = .class, ID format = #id
			photos : "#photos", //Where to put the photos.
			albums : "#albums", //where to put the folders
			searchbar : "#search", //which input to check tags against. Leave empty to disable tag searches.
			facebookid : "Coke", //Where to get the pictures.
			accessToken : "" //Use this if you need permissions or run into rate limits.
	};
	this.albums = [];
	this.photos = [];
	
	this.calls = 0;

	this.getAlbums(this.getPhotos);
	this.checkLock(function(){
		this.addPhotos();
		this.setupEvents();
	});
	
};

PhotoSystem.prototype.constructor = PhotoSystem;

PhotoSystem.prototype.checkLock = function(callback){
	var scope = this;
	if (this.calls>0){
		setTimeout(function(){
			scope.checkLock(callback);
		}, 100);
	} else {
		callback.call(scope);
	}
};

/**
 * 
 * @param callback
 */
PhotoSystem.prototype.getAlbums = function(callback){
	var albums = $(this.settings.albums);
	var scope = this;
	this.get(this.settings.facebookid, "albums", function(data){
		scope.albums = data.albums.data;
		albums.text("");
		$.each(scope.albums, function(index, element){

			/**
			 * Change this to change the appearance of your album button.
			 * 
			 * If you would like to get a cover photo use the following:
			 * src="graph.facebook.com/"+element.cover_photo+"/picture";
			 * It will redirect to the album cover.
			 */
			albums.append("<a class='album' id="+ element.id +">"+element.name+"</a>");

		});

		callback.call(scope);

	});

};

PhotoSystem.prototype.getPhotos = function(albumId){

	var scope = this;

	var getPhotos = function(albumId){

		scope.get(albumId, "photos", function(data){

			try{
				scope.photos = scope.photos.concat(data.photos.data);
			} catch (e) {
				console.warn("An album likely has no visible images.", e);
			}

		});

	};

	if (albumId == undefined){//Get all

		$.each(this.albums, function(index, element){

			getPhotos(element.id);

		});

	} else {

		getPhotos(albumId);

	}
};

PhotoSystem.prototype.addPhotos = function(){

	var photos = $(this.settings.photos);
	photos.text("");
	
	$.each(this.photos, function(index, element){

		/**
		 * Edit this to your liking for how images will be added.
		 */
		photos.append("<img class='photo' id='"+ element.id +"' src='"+element.picture+"'>");

	});

};

/**
 * Filters out the photos by album.
 * @param albumId
 */
PhotoSystem.prototype.filter = function(albumId){

};

PhotoSystem.prototype.setupEvents = function(){
	
};

PhotoSystem.prototype.findPhoto = function(id){
	for(var i=0; i<this.photos.length; ++i){
		if (photos[i].id == id){
			return photos[i];
		}
	}
	return null;
};

PhotoSystem.prototype.get = function(target, fields, callback){
	this.calls++;//Increase lock.
	var scope = this;
	var access = (this.settings.accessToken!="")?"&access_token="+this.settings.accessToken:"";
	var wrap = function(callback){
		return function(data){
			callback.call(this, data);
			scope.calls--;//Reduce lock.
		};
	};
	$.getJSON("https://graph.facebook.com/"+target+"?fields="+fields+access, wrap(callback));
};
