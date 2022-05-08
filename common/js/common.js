//스크롤바 width 구하기
function getScrollWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);


  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}

//디바이스 너비에 따라 true | false
function deviceChk(width) {
  if ($(window).width() > width - getScrollWidth()) {
    return true;
  } else {
    return false;
  }
}

//gnb 관련 함수
function gnbAction() {
  function openGnb(el) {//gnb 펼치기
    if (deviceChk(1024)) {
      $('#container').stop().animate({ marginLeft: '280px' }, 200);
      $('.header').stop().animate({ width: '280px' }, 200, function () {
        $(this).removeClass('sm');
        slideGnb(el);
      });
    }
  }
  function slideGnb(el) {
    var thisWrap = $(el).closest('li');
    if ($(el).hasClass('btn')) { //하위 메뉴 있는 경우 토글슬라이드
      $(el).next('.dep2').stop().slideToggle(200).closest('li').siblings('li').removeClass('active').find('.dep2').stop().slideUp(200);
      thisWrap.toggleClass('active');
      return false;
    } else {//하위메뉴 없는 경우 active
      thisWrap.toggleClass('active').siblings('li').removeClass('active').find('.dep2').stop().slideUp(200);
    }
  }
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
    if ($('.header').hasClass('sm')) {
      openGnb(this);
    } else {
      slideGnb(this);
    }
  });

  //dep3 클릭시 active 표기
  $('.dep3 > li > a').on('click', function () {
    $('.dep3 > li').removeClass('active');
    $(this).closest('li').addClass('active');
  });
  $('.dep1 a:not(.btn)').on('click', function () {
    if (!deviceChk(1024)) {
      $('.header').removeClass('active');
    }
  });

  //전체메뉴 펼침
  // $('.logo a').on('click',function(){
  //   if($('.header').hasClass('sm')){
  //     return false;
  //   }
  //   var gnb = $('#gnb .dep1 > li')
  //   gnb.each(function(){
  //     if($(this).children('a').hasClass('btn')){
  //       $(this).find('.dep2').stop().slideDown(200);
  //     }
  //     gnb.addClass('active')
  //   });
  // });

  //gnb 감추기
  $('.btn_menu').on('click', function () {
    if (deviceChk(1024)) {
      if ($('.header').hasClass('sm')) {//gnb펼치기
        openGnb();
      } else {//gnb줄이기
        $('.header').addClass('sm').stop().animate({ width: '80px' }, 200);
        $('#container').stop().animate({ marginLeft: '80px' }, 200);
        $('#gnb .dep1 > li').removeClass('active');
        $('#gnb .dep2').stop().slideUp(200);
      }
    } else {
      $('body').css('overflow', 'hidden');
      $('.header').addClass('active');
    }
  });
  $('.btn_mobile').on('click', function () {
    $('body').css('overflow', 'auto');
    $('.header').removeClass('active');
  });

  $(window).resize(function () {
    $('.header,#gnb,#container,body').removeAttr('style').removeClass('active').removeClass('sm');
  });
}

//팝업
function modalPopup() {
  $('[data-pop]').css({display:'none',visibility:'visible'});
  $('[data-pop-btn]').click(function () {
    var popName = $(this).data('pop-btn');
    $('[data-pop="' + popName + '"]').stop().fadeIn(200);
  });
  $('.pop-close').click(function () {
    $(this).closest('[data-pop]').stop().fadeOut(200).find('[data-pop]').stop().fadeOut(200);
  });
}

//페이징
function pagination() {//pagination 클릭하면 active
  $('.page-wrap a').click(function () {
    $(this).addClass('active').siblings('a').removeClass('active');
  });
}

//테이블 
function fxTable(arg) {
  $('.table.fx-hd').each(function () {
    var theadH = $(this).find('thead th').outerHeight();
    var tdH = $(this).find('tbody td').outerHeight();
    var maxHeight = $(this).data('row') * tdH + theadH;
    $(this).find('table').clone().prependTo(this).addClass('clone-tb').attr('tabindex', '-1').next('table').wrap('<div class="scr-y" style="max-height:' + maxHeight + 'px"></div>');
    $(this).find('.clone-tb').css('width', 'calc(100% - ' + arg + 'px)');
    var tbWidth = $(this).find('.scr-y').width();
    var ctbWidth = $(this).find('.clone-tb').width(); //복사된 thead
    if (ctbWidth > tbWidth) {
      $(this).find('.scr-y').css('width', ctbWidth + arg + 'px');
    }
  });
  $(window).on('resize', function () {
    $('.table.fx-hd').each(function () {
      var tbWidth = $(this).find('.scr-y').width();
      var ctbWidth = $(this).find('.clone-tb').width(); //복사된 thead
      if (ctbWidth > tbWidth) {
        $(this).find('.scr-y').css('width', ctbWidth + arg + 'px');
      }
      if (deviceChk(720)) {
        $(this).find('.scr-y').css('width', '100%');
      }
    });
  });
}

function changeContent() {
  if ($('.radio-content').length) {
    $('[type="radio"].change').on('change', function () {

      var val = $(this).val();
      $('.radio-content [data-radio="' + val + '"]').addClass('active').siblings().removeClass('active');
    });
  }
}

function progress() {
  $('.progress').each(function () {
    var html = '<div class="bar"><span></span></div><div class="num"><span class="min"></span><b></b><span class="max"></span></div>';
    var min = $(this).data('min');
    var max = $(this).data('max');
    var val = $(this).find('.txt b').text();
    var n = val / max * 100;
    if (n < 15) {
      n *= 3;
    } else if (n < 30) {
      n *= 1.5;
    } else if (n > 70) {
      n *= 0.9;
    } else if (n > 85) {
      n *= 0.7;
    }
    $(this).append(html);
    $(this).find('.num .min').text(min);
    $(this).find('.num .max').text(max);
    $(this).find('.num b').text(val).css('left', n + '%');
    $(this).find('.bar span').width(n + '%');
  });
}
function progress2() {
  $('.progress-wrap > li').each(function () {
    var min = $(this).data('min');
    var max = $(this).data('max');
    var val = $(this).find('h4 b').text();
    var n = val / max * 100;
    $(this).find('.num .min').text(min);
    $(this).find('.num .max').text(max);
    $(this).find('.bar span').width(n + '%');
  });
}

function dropdown() {//드롭다운 선택상자
  $('.dropdown .btn').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').attr('title', '열기').next('ul').stop().slideUp(200);
    } else {
      $(this).addClass('active').attr('title', '닫기').next('ul').stop().slideDown(200);
    }
  });
  $('.dropdown label').click(function () {
    $(this).closest('.dropdown').find('.btn').removeClass('active').attr('title', '열기').next('ul').stop().slideUp(200);
  });
}

$(function () {//document 로드 후 실행
  var scrollWidth = getScrollWidth();
  fxTable(scrollWidth);
  gnbAction();
  pagination();
  changeContent();
  progress();
  progress2();
  dropdown();
  modalPopup();
});