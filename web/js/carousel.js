var carousel = (function () {
    var currentPosition = 0;
    var flag = true;



    return {
        init: function () {
            var
                carousel = $('.carousel__list');

            $('.clients__btn-right').on('click', (function(e){
                e.preventDefault();

                if (flag &&currentPosition > -800 ) {
                    flag = false;
                    currentPosition -= 200;

                    carousel.animate({
                        opacity: 0.5,
                        left: '-=200'
                    }, 500, function () {
                        carousel.animate({
                            opacity: 1
                        }, 100);

                        flag = true;
                    });
                }
            }));

            $('.clients__btn-left').on('click', (function(e){
                e.preventDefault();

                if (flag && currentPosition < 0 ) {
                    flag = false;
                    currentPosition += 200;

                    carousel.animate({
                        opacity: 0.5,
                        left: '+=200'
                    }, 500, function () {
                        carousel.animate({
                            opacity: 1
                        }, 100);

                        flag = true;
                    });
                }
            }));

            //====== scroll section =======
            $(document).ready(function(){
                var margin,
                    lastMargin = 0,
                    firstSlide = $('.carousel__item.first');

                $('.carousel').mousedown(function( event){
                    var startPoinerPosition = event.pageX;

                    $(document).mousemove(function(event){
                        var currentPoinerPosition = event.pageX;

                        margin = currentPoinerPosition - startPoinerPosition + lastMargin;
                        firstSlide.css("marginLeft", margin + "px");
                    });
                });

                $(document).mouseup(function() {
                    lastMargin = margin;
                    $(document).off("mousemove");
                    if (margin > 0) {
                        firstSlide.css("marginLeft", 0 + "px");
                        lastMargin = 0;
                    }
                    if (margin < -800) {
                        firstSlide.css("marginLeft", -800 + "px");
                        lastMargin = -800;
                    }
                });
            });
        }
    }
}());

$(document).ready(function(){

    if($('.carousel').length){
        carousel.init();
    }
});