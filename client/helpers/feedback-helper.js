export const nextQuestion = (scroll) => {
  if($('.feedback').find('.visible').next('.question').hasClass('question')){
    var target = $('.feedback').find('.visible').next()
    scroll+=239
    $('.feedback').animate({
      scrollTop: scroll
    }, 200)
    setTimeout(function () {
      target.prev().removeClass('visible')
      target.addClass('visible')
    }, 200)
  }
  return scroll
}

export const prevQuestion = (scroll) => {
  if($('.feedback').find('.visible').prev('.question').hasClass('question')){
    var target = $('.feedback').find('.visible').prev()
    scroll-=239
    $('.feedback').animate({
      scrollTop: scroll
    }, 200)
    target.next().removeClass('visible')
    target.addClass('visible')
  }
  return scroll
}

export const setStars = (stars, index) =>{
  stars[index].checked = !stars[index].checked
  for(var i = index; i>=0;i--){
    stars[i].checked = true

  }
  if(index!==4){
    index++
    for(i = index; i < stars.length ;i++){
      stars[i].checked = false
    }
  }
  return stars
}

export const saveFeedback = () => {
    var i = 0,
    feedback = {};
    while($(".feedback").find(".checked").find(':checkbox')[i]){
      feedback.rating = $(".feedback").find(".checked").find(':checkbox')[i].value;
      i++;
    }

    feedback.rating = parseInt(feedback.rating);
    feedback.suggestion = $(".feedback").find('textarea')[0].value;
    if(feedback.rating){
    //   data = $.param({
    //
    //   });
    //   $http({
    //     method: 'POST',
    //     url: 'http://localhost:8888/househunter/config/set-feedback.php/',
    //     dataType: 'json',
    //     data: JSON.stringify({"rating": feedback.rating, "suggestion": feedback.suggestion, "user_id": $scope.user.id,}),
    //     headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    //   }).
    //   success(function(data, status, headers, config) {
    //     if (data.msg !== '')
    //     {
    //       console.warn(data.msg);
    //     }else{
    //       console.error(data.error);
    //     }
    //   }).error(function(data, status, header, config) { // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     console.error(status, data, config);
    //   });
    }else{
      // output error message, rating must be filled
    }
  };
