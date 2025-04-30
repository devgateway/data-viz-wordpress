

    var ***REMOVED*** = function ***REMOVED***(sParam) 
        {
            var sPageURL = ***REMOVED***(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                ***REMOVED***,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                ***REMOVED*** = sURLVariables[i].split('=');

                if (***REMOVED***[0] === sParam) {
                    return ***REMOVED***[1] === undefined ? true : ***REMOVED***[1];
                }
            }
        };

    jQuery(document).ready(function()
        {
            
            jQuery('table.wp-list-table #the-list').sortable({
                
                                                        placeholder: {
                                                                        element: function(currentItem) {
                                                                            var cols    =   jQuery(currentItem).children('td:visible').length + 1;
                                                                            return jQuery('<tr class="ui-sortable-placeholder"><td colspan="' + cols + '">&nbsp;</td></tr>')[0];
                                                                        },
                                                                        update: function(container, p) {
                                                                            return;
                                                                        }
                                                                    },
                
                                                        'items': 'tr',
                                                        'handle': ".check-column",
                                                        'axis': 'y',
                                                        'update' : function(e, ui) {
                                                           
                                                            var post_type           =   CPTO.post_type;
                                                            var order               =   jQuery('#the-list').sortable('serialize');
                                                            
                                                            var paged       =   ***REMOVED***('paged');
                                                            if(typeof paged === 'undefined')
                                                                paged   =   1;
                                                            
                                                            var queryString = { "action": "update-custom-type-order-archive", "post_type" : post_type, "order" : order ,"paged": paged, "archive_sort_nonce"    :   CPTO.archive_sort_nonce};
                                                            //send the data through ajax
                                                            jQuery.ajax({
                                                              type: 'POST',
                                                              url: ajaxurl,
                                                              data: queryString,
                                                              cache: false,
                                                              dataType: "html",
                                                              success: function(data){
                                                
                                                              },
                                                              error: function(html){

                                                                  }
                                                            });
                                                        
                                                        }
                                                    });
       

    });
