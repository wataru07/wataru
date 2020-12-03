(function($){
	var settings = {};

	var methods = {
    	init : function( options ) {
    	settings = $.extend({
        'uri'   : room,
        'conn'  : null,
        'message' : '#message',
        'display' : '#display',
	     }, options);
	     $(settings['message']).keypress( methods['checkEvent'] );
	     $(this).chat('connect');
	    },

checkEvent : function ( event ) {
  if (event && event.which == 13) {
    // var message = $(settings['message']).val();
    // var json = methods.parseJson($('#form').serializeArray());
    var json = {
      name : $('#name').val(),
      message : $('#message').val()
    };
    json = JSON.stringify(json);
    if (json && settings['conn']) {
      var res = settings['conn'].send(json);
      $(this).chat('drawText',json,'left');
      $(settings['message']).val('');
    }
  }	
},

parseJson : function(data){
  returnJson = {};
  for (idx = 0; idx < data.length; idx++) {
    returnJson[data[idx].name] = data[idx].value
  }
  return returnJson;
},

connect : function () {
	if (settings['conn'] == null) {
	    settings['conn'] = new WebSocket(settings['uri']);
	    settings['conn'].onopen = methods['onOpen'];
	    settings['conn'].onmessage = methods['onMessage'];
	    settings['conn'].onclose = methods['onClose'];
	    settings['conn'].onerror = methods['onError'];
	  }
	},

    onOpen : function ( event ) {
      $(this).chat('drawText','サーバに接続','left');
    },
    
    onMessage : function (event) {
      if (event && event.data) {
        $(this).chat('drawText',event.data,'right');
      }
    },
        
    onError : function(event) {
      $(this).chat('drawText','エラー発生!','left');
    },
    
    onClose : function(event) {
      $(this).chat('drawText','サーバと切断','left');
      settings['conn'] = null;
      setTimeout(methods['connect'], 1000);
    },
    
    drawText : function (message, align='left') {
      if ( align === 'left' ) {
        var inner = $('<div class="left"></div>').text(message);
      } else {
        var inner = $('<div class="right"></div>').text(message);
      }
      var box = $('<div class="box"></div>').html(inner);
      $('#chat').prepend(box);
    },
  }; // end of methods

  $.fn.chat = function( method ) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist' );
    }
  } // end of function
})( jQuery );

$(function() {
  $(this).chat({
    'uri': room,
    'message' : '#message',
    'display' : '#chat',
  });
});
