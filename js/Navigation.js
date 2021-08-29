/** 
 * Navigation.js 
 * Code for the high-level navigation through the plugin, opening and closing of different tabs. 
 */
$(document).ready(function() {
    let previousActiveTabIndex = 0; // Initialise the previous tab variable

    $(".tab-label").on('click keypress', function (event) {

        // event.which === 13 means the "Enter" key is pressed
        if ((event.type === "keypress" && event.which === 13) || event.type === "click") {

            const tabClicked = $(this).data("tab-index"); // Get the index of the clicke
    
            // If different tab from the previous one is selected
            if(tabClicked != previousActiveTabIndex ) { 
                //Remove highlight from the rest of the tabs and add it only to the current one
                $(".tab-label").removeClass('current');
                $(this).addClass('current');

                $("#allTabsContainer .tab-container").each(function () {
                    // If the index of the clicked tab matches the tab index
                    if($(this).data("tab-index") == tabClicked) {
                        $(".tab-container").hide();
                        $(this).fadeIn();
                        // Show only the content of this specific container
                        previousActiveTabIndex = $(this).data("tab-index");
                        return;
                    } 
                });
            } 
        }
    });

});

$(".header").click(function(){
    $('.hidden').hide();
    $(this).next().fadeToggle();
  });

/**
 ** Inspired by:  https://jsfiddle.net/incorelabs/mg6e4ren/74/,
 **                 http://jsfiddle.net/arunpjohny/h9V9E/
 */ 