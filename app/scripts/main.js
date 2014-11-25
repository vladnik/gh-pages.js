'use strict';

(function(){
  $.get( 'index.md', function( data ) {
    var settings, content;
    
    data = data.split(/\n+---\n+/);
    settings = jsyaml.load(data[0]);
    content = marked(data[1]);
    $('.content').html(content);

    console.log(settings);
    if (settings.language_tabs) {
      var languages_html = '';
      $.each(settings.language_tabs, function( index, value ) {
        languages_html += '<a href="#" data-language-name="'+ value +'">'+ value +'</a>';
      });

      $('.lang-selector').html(languages_html);
      setupLanguages(settings.language_tabs);
    }

    if (settings.toc_footers) {

    }
    
  });
})();