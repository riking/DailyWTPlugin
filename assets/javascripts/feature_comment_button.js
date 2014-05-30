
Discourse.PostMenuView.reopen({
  renderFeature: function(post, buffer) {
    if (!Discourse.User.current().admin) return;

    // Make sure this is Article Discussion
    if (post.get('topic.category.id') !== 8) return;

    buffer.push("<button class='create' data-action='feature' title='Feature this comment'>");
    buffer.push("<i class='fa fa-paper-plane'></i>");
    buffer.push("</button>");
  },

  clickFeature: function() {
    var post = this.get('post'),
        postStream = this.get('post.topic.postStream');

    if (!postStream.get('firstPostPresent')) {
      // non-admins should never see this unless they try
      // or read the code
      bootbox.alert("Please load the first post. This is required because this is a ghetto plugin.");
      return;
    }

    var firstPost = postStream.findLoadedPost(postStream.get('firstPostId'));
    if (!firstPost) {
      // The first post should be loaded, because I just checked. If not, we have a porblem.
      bootbox.alert("Incorrect assumption. Fix the code.");
      return;
    }

    var articleIdMatcher = firstPost.get('cooked').match(/<!--ARTICLEID:(\d+)-->/i);
    if (!articleIdMatcher) {
      bootbox.alert("The topic has no article ID defined.");
      return;
    }
    var articleId = articleIdMatcher[0];

    var url = "http://thedailywtf.com/Admin/FeatureComment.ashx?postId='" + post.get('id') + "'&articleId='" + articleId + "'";
    window.open(url, '_blank');
  }
});
