'use strict';
// 
(function(){
  var renderPage = function(file) {
    $.ajax({
      url: 'https://api.github.com/repos/'+ file,
      jsonp: 'callback',
      dataType: 'jsonp',
      success: function(data) {
      var settings, content;
      data = atob(data.data.content);
      console.log(data);
      var renderer = new marked.Renderer();
      renderer.code = function(code, language){
        return '<pre><code class="highlight '+ language +'">'+ code +'</code></pre>';
      };

      data = data.split(/\n+---\n+/);
      settings = jsyaml.load(data[0]);
      content = marked(data[1], {renderer: renderer, smartypants: true});
      var finish = function () {
        if (settings.language_tabs) {
          var languages_html = '';
          $.each(settings.language_tabs, function( index, value ) {
            languages_html += '<a href="#" data-language-name="'+ value +'">'+ value +'</a>';
          });
          $('.lang-selector').html(languages_html);
        }

        if (settings.toc_footers) {
          $('.toc-footer').html('<li>'+ settings.toc_footers.join('</li><li>') +'</li>');
        }
        $(document).trigger('loaded');
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
        setupLanguages(settings.language_tabs);
      };
      if (!settings.includes) {
        var promises = [];
        $.each(settings.includes, function( index, include ) {
          promises.push($.get( include + '.md', function(data) {
            content += marked(data, {renderer: renderer, smartypants: true});
          }));
        });
        $.when.apply($, promises).done(function(){
          $('.content').html(content);
          finish();
        });
      } else {
        $('.content').html(content);
        finish();
      }
    }});
  };

  var loadContent= function(){
    $.getJSON('/config.json', function(data) {
      renderPage(data.main);
    });
  };
  loadContent();
})();