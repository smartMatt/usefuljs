ujsApp.filter('searchTags', function() {
  return function(posts, search) {

    var returnPosts = [];

    if(posts && !search) {
      return posts;
    }

    if(posts) {
      for (var i =0; i< posts.length; i++) {
        for (var y = 0; y < posts[i].tags.length; y++) {
          if(posts[i].tags[y].indexOf(search) != -1) {
            returnPosts.push(posts[i]);
            break;
          }
        }
      }

      return returnPosts;
    }


  };
});