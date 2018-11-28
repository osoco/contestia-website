if( "caches" in window ){
  function cacheFile( file ){
    caches.open( file.filecache ).then(function( cache ) {
      cache.put( file.filepath, new Response( file.filetext,
        {headers: {'Content-Type': file.filetype }}
      ));
    });
  }

  var toCache = document.querySelectorAll( "[data-cache]" );
  for( var i = 0; i < toCache.length; i++ ){
    var elem = toCache[ i ];
    cacheFile({
      filepath: elem.getAttribute( "data-path" ),
      filetype: elem.getAttribute( "data-type" ),
      filecache: elem.getAttribute( "data-cache" ),
      filetext: elem.innerHTML
    });
  }
}