var carousel = (function () {
    var currentPosition = 0; //stores css margin-left value of carousel
    var flag = true; // used to prevent animation mess, get false value when .animate method executes


    return {
        init: function () {
            var _this = this,
                lastMouseMoveMargin = 0, // variable for storage carousel margin during "mouse events"
                carousel = $('.carousel__list'),
                carouselWidth = _this.parseWidth(carousel),
                slidesQuantity = $('.carousel ul li').length,
                slideWidth = _this.parseWidth($('.carousel__item.first')),
                slideMargin = _this.parseMargin($('.carousel__item:not(.first)')),
                // in the end of allSlidesWidth's calculation we subtract one slideMargin
                // (one carousel__item always have margin-right: 0;)
                allSlidesWidth = (slidesQuantity * (slideWidth+slideMargin)) - slideMargin,
                hiddenCarouselWidth = allSlidesWidth - carouselWidth;




            $('.clients__btn-right').on('click', (function(e){
                e.preventDefault();

                if (flag && currentPosition > -hiddenCarouselWidth ) {
                    flag = false;
                    currentPosition -= 200;

                    carousel.animate({
                        opacity: 0.5,
                        marginLeft: '-=200'
                    }, 500, function () {
                        carousel.animate({
                            opacity: 1
                        }, 100);
                        flag = true;
                        lastMouseMoveMargin = currentPosition;

                        if (_this.parseMargin(carousel) < -hiddenCarouselWidth)  {
                            carousel.css("marginLeft", -800 + "px");
                            currentPosition = -800;
                        }
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
                        marginLeft: '+=200'
                    }, 500, function () {
                        carousel.animate({
                            opacity: 1
                        }, 100);

                        flag = true;
                        lastMouseMoveMargin = currentPosition;

                        if (_this.parseMargin(carousel) > 0 &&
                            _this.parseMargin(carousel) < 200)  {
                            carousel.css("marginLeft", 0 + "px");
                            currentPosition = 0;
                        }
                    });
                }
            }));

            //====== scroll section =======

            carousel.mousedown(function( event){
                var startPoinerPosition = event.pageX;

                $(document).mousemove(function(event){
                    var currentPoinerPosition = event.pageX;
                    $('body').css('user-select', 'none'); // prevent text selection while mousemove method in-use
                    currentPosition = currentPoinerPosition - startPoinerPosition + lastMouseMoveMargin;
                    carousel.css("marginLeft", currentPosition + "px");
                });
            });

            $(document).mouseup(function() {
                lastMouseMoveMargin = currentPosition;
                $(document).off("mousemove");
                if (currentPosition > 0) {
                    carousel.css("marginLeft", 0 + "px");
                    lastMouseMoveMargin = currentPosition = 0;
                }
                if (currentPosition < -hiddenCarouselWidth) {
                    carousel.css("marginLeft", -hiddenCarouselWidth + "px");
                    lastMouseMoveMargin = currentPosition = -hiddenCarouselWidth;
                }
                $('body').css('user-select', 'auto'); // enable text selection after mouseup method done
            });
        },
        // return numeric value of css margin-left value
        parseMargin: function(carouselMargin) {
            return parseInt(carouselMargin.css('marginLeft'), 10);
        },

        parseWidth: function(width) {
            return parseInt(width.css('width'), 10);
        }

    }
}());

$(document).ready(function(){

    if($('.carousel').length){
        carousel.init();
    }
});