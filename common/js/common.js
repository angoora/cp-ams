

//gnb 관련 함수
function gnbAction() {
  // dep2가 있는 경우 dep1에 btn클래스 부여,  
  $('#gnb .dep1 > li > a').each(function () {
    if ($(this).next('.dep2').length) {
      $(this).addClass('btn');
    }
    if ($(this).closest('li').hasClass('active')) {
      $(this).next('.dep2').slideDown(200);
    }
  });

  //dep1 클릭시 active 표기 하위메뉴 노출
  $('#gnb .dep1 > li > a').on('click', function () {
    if($('.header').hasClass('sm')){
      return false;
    }
    var thisWrap = $(this).closest('li');
    if ($(this).hasClass('btn')) { //하위 메뉴 있는 경우 토글슬라이드
      $(this).next('.dep2').stop().slideToggle(200).closest('li').siblings('li').removeClass('active').find('.dep2').stop().slideUp(200);
      thisWrap.toggleClass('active');
      return false;
    } else {//하위메뉴 없는 경우 active
      thisWrap.toggleClass('active').siblings('li').removeClass('active').find('.dep2').stop().slideUp(200);
    }
  });
 
  //dep3 클릭시 active 표기
  $('.dep3 > li > a').on('click', function () {
    $('.dep3 > li').removeClass('active');
    $(this).closest('li').addClass('active');
  });

  //전체메뉴 펼침
  $('.logo a').on('click',function(){
    if($('.header').hasClass('sm')){
      return false;
    }
    var gnb = $('#gnb .dep1 > li')
    gnb.each(function(){
      if($(this).children('a').hasClass('btn')){
        $(this).find('.dep2').stop().slideDown(200);
      }
      gnb.addClass('active')
    });
  });

  //gnb 감추기
  $('.btn_menu').on('click',function(){
    if($('.header').hasClass('sm')){//gnb펼치기
      $('.header').stop().animate({width:'280px'},200,function(){
        $(this).removeClass('sm');
      });
      $('#container').stop().animate({marginLeft:'280px'},200);
    }else{//gnb줄이기
      $('.header').addClass('sm').stop().animate({width:'80px'},200);
      $('#container').stop().animate({marginLeft:'80px'},200);
      $('#gnb .dep1 > li').removeClass('active');
      $('#gnb .dep2').stop().slideUp(200);
    }
  });
}
$(function () {//document 로드 후 실행
  gnbAction();
});