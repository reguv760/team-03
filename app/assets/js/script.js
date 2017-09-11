$(document).ready(function()
{

  // //window scroll
  //  $(window).scroll(function()
  //   {
  //     var myHeader = $('header');
  //     var currentScrollTop = $(window).scrollTop();
  //     var headerHeight = myHeader.height();

  //     //calculate overflow based on current res height
  //     //Get navbar overflow bsed on current res height set by media query. Remove all non-digits nd convert to integer;
  //     var overflow = parseInt($(' .navbar-overflow').css("height").replace(/\D/g,''));

  //     //lighten image on scroll up
  //     var fadeOpacity = $('.fade-to-black').css('opacity', currentScrollTop/$('.fade-to-black').height());

  //     // hide nav bar when not at top of viewport
  //     // find height of div that contains the following id
  //     var content = $('#myContent').offset().top;

  //     //turn on .main-nav based on height of page viewport heght
  //     if (currentScrollTop <= content + headerHeight + overflow)
  //     {

  //     } else
  //    if ((currentScrollTop >= content - overflow) && (currentScrollTop <= content + headerHeight + overflow))
  //     {
  //       console.log("content section");

  //     } else
  //     {
  //        console.log("trigger off");
  //     }
  //   });

    // init mobile button nav
    console.log("document ready!");
    $(".button-collapse").sideNav();
     $('select').material_select();

});

