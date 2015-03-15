ujsApp.filter('searchTags', function() {
  return function(posts, search, storedTags) {

    var returnPosts = [];

    if(posts && !search && storedTags.length == 0) {
      return posts;
    }


    if(posts) {
      for (var i =0; i< posts.length; i++) {

        var storedTagResult = compareToStoredTags(posts[i].tags, posts[i].title),
            tagTitleResult = compareToPostTitle(posts[i].title);


        if (tagTitleResult && storedTagResult) {
          returnPosts.push(posts[i]);
          continue;
        }


        for (var y = 0; y < posts[i].tags.length; y++) {
          if(compareTagToSearch(posts[i].tags[y]) && storedTagResult) {
            returnPosts.push(posts[i]);
            break;
          }
        }
      }

      return returnPosts;
    }

    function compareToStoredTags (postTags, title) {

      if(storedTags.length == 0) {
        return true;
      }

      for (var i = 0; i < storedTags.length; i++) {
        if(!searchStoredTags(storedTags[i], postTags, title)) {
          return false;
        }
      }

      return true;
    }

    function compareToPostTitle (title) {
      if(title.toLowerCase().indexOf(search.toLowerCase()) != -1) {
        return true;
      }
      return false;
    }

    function searchStoredTags (tag, postTags, title) {

      if(title.toLowerCase().indexOf(tag.toLowerCase()) != -1) {
        return true;
      }

      for (var i = 0; i < postTags.length; i++) {
        if(tag.toLowerCase() == postTags[i].toLowerCase()) {
          return true;
        }
      }

      return false;

    }

    function compareTagToSearch(tag) {

      if (!search || tag.toLowerCase().indexOf(search.toLowerCase()) != -1) {
        return true;
      }

      return false;
    }


  };
});