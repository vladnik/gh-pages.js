'use strict';

(function(){
  var self = {};
  var markedOptions = {
    renderer: (function(){
      var renderer = new marked.Renderer();
      renderer.code = function(code, language){
        return '<pre><code class="highlight '+ language +'">'+ code +'</code></pre>';
      };
      return renderer;
    })(),
    smartypants: true
  };

  var githubJsonp = function(url, callback, data) {
    $.ajax({
      // url for GitHub API
      url: 'https://api.github.com/repos/'+ self.config.repo + '/contents/'+ url,
      // the name of the callback parameter, as specified by the YQL service
      jsonpCallback: 'foo',
      // tell jQuery we're expecting JSONP
      dataType: "jsonp",
      // optional data
      data: data,
      // Cache responses
      cache: true,
      // work with the response
      success: function(response) {
        return callback(atob(response.data.content));
      }
    });
  };

  var getFile = function (url, callback, data) {
    if (self.config.local) {
      $.get(url, callback);
    } else {
      githubJsonp(url, callback, data);
    }
  };

  var loadConfig = function(){
    $.getJSON('config.json', function(data) {
      self.config = data;
      return loadPage();
    });
  };

  var renderContent = function(data){
    return marked(data, markedOptions);
  };

  var loadIncludes = function(includes, settings){
    var promises = [];
    $.each(includes, function(_, include) {
      var deferred = new $.Deferred();
      promises.push(deferred);
      getFile(include, function(response) {
        self.content += renderContent(response);
        return deferred.resolve();
      });
    });
    $.when.apply($, promises).done(function(){
      $('.content').html(self.content);
      setLanguages(settings.language_tabs, settings);
    });
  };

  var processSettings = function(settings){
    if (settings.title){
      $('title').html(settings.title);
    }
    if (settings.includes){
      loadIncludes(settings.includes, settings);
    } else {
      $('.content').html(self.content);
      setLanguages(settings.language_tabs, settings);
    }
  };

  var setLanguages = function(languages, settings){
    if (settings.toc_footers) {
      $('.toc-footer').html('<li>'+ settings.toc_footers.join('</li><li>') +'</li>');
    }
    var languages_html = '';
    $.each(languages, function( index, value ) {
      languages_html += '<a href="#" data-language-name="'+ value +'">'+ value +'</a>';
    });
    $('.lang-selector').html(languages_html);
    $(document).trigger('loaded');
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    setupLanguages(languages);
  };

  var loadPage = function() {
    getFile(self.config.main, function(response){
      var settings;
      var data = response.split(/\n+---\n+/);
      self.content = renderContent(data[1]);
      settings = jsyaml.load(data[0]);
      processSettings(settings);
    });
  };
  // Load user config
  loadConfig();
})();
