var carousel = (function () {
    var currentPosition = 0;



    return {
        init: function () {
            var
                _this = this;

            $('.btn').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);

                if (currentPosition < 0 && $this.hasClass('clients__btn-right')) {
                    _this.moveCarousel('forward');
                } else if (currentPosition > -800 && $this.hasClass('clients__btn-left')) {
                    _this.moveCarousel('backward');
                }
            });
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
        },
        moveCarousel : function(direction){
            var
                firstSlide = $('.carousel__item.first'),
                margin = 200;

            if (direction === 'forward') {
                currentPosition = currentPosition + margin;
                firstSlide.css('margin-left', currentPosition);
            } else if (direction === 'backward') {
                currentPosition = currentPosition - margin;
                firstSlide.css('margin-left', currentPosition);
            }
        }
    }
}());

$(document).ready(function(){

    if($('.carousel').length){
        carousel.init();
    }
});