$(document).ready(function() {
  $('.fade-in').fadeIn(1000);
  $('form').on('submit', function(e) {
    e.preventDefault();
    alert('OTP dikirim ke email/HP Anda. Verifikasi untuk lanjut.');
  });

  // Sorting lowongan
  $('.sortable th').click(function() {
    var table = $(this).parents('table').eq(0);
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
    if (!this.asc) { rows = rows.reverse(); }
    for (var i = 0; i < rows.length; i++) { table.append(rows[i]); }
  });
  function comparer(index) {
    return function(a, b) {
      var valA = getCellValue(a, index), valB = getCellValue(b, index);
      return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    }
  }
  function getCellValue(row, index) { return $(row).children('td').eq(index).text(); }

  // Chat send message
  $('#send-message').click(function() {
    var msg = $('#message-input').val();
    if (msg) {
      var safe = $('<div>').text(msg).html();
      $('.chat-window').append('<div class="chat-message sent">' + safe + '</div>');
      $('#message-input').val('');
      $('.chat-window').scrollTop($('.chat-window')[0].scrollHeight);
    }
  });

  // Rating stars interaktif
  $('.rating-stars i').click(function() {
    $(this).addClass('fas').removeClass('far').prevAll().addClass('fas').removeClass('far');
    $(this).nextAll().addClass('far').removeClass('fas');
  });

  // Filter ribbon toggle (improve UI)
  $('.filter-toggle').click(function() {
    $(this).next('.ribbon-filter').slideToggle();
  });

  // Favorite toggle
  $('.favorite-btn').click(function() {
    $(this).toggleClass('text-danger');
  });

  // GatePay top-up simulation
  $('#top-up-btn').click(function() {
    alert('Saldo ditambah Rp50.000!');
  });

  // Tarik dana simulation
  $('#tarik-dana-form').submit(function(e) {
    e.preventDefault();
    alert('Permintaan tarik dana Rp' + $('#nominal').val() + ' ke ' + $('#tujuan').val() + ' diproses!');
  });

  // Interaktif review/melamar
  $('.review-btn').click(function() {
    $(this).text('Sudah Direview').addClass('disabled');
    alert('Review diselesaikan!');
  });

  $('.lamar-btn').click(function() {
    $(this).text('Sudah Dilamar').addClass('disabled');
    alert('Lamaran terkirim!');
  });

  // Filter notifikasi waktu
  $('#filter-waktu').change(function() {
    var selected = $(this).val();
    $('.notif-item').hide();
    $('.notif-' + selected).show();
  });

  $('a.nav-link[href^="#"], a.learn-more[href^="#"], a[href^="#how-it-works"], a[href^="#why-gate"], a[href^="#transparansi"]').on('click', function(e){
    var href = $(this).attr('href');
    if (href && href.charAt(0) === '#') {
      var target = $(href);
      if (target.length) {
        e.preventDefault();
        var navOffset = 86; 
        $('html, body').animate({
          scrollTop: target.offset().top - navOffset
        }, 600, 'swing', function() {
          target.attr('tabindex','-1').focus();
        });
      }
    }
  });

  // Navbar active highlighting based on scroll position
  var sectionIds = ['#how-it-works', '#why-gate', '#transparansi'];
  var $navLinks = $('.navbar .nav-link');
  function updateActiveOnScroll(){
    var scrollPos = $(window).scrollTop() + 90;
    var activeFound = false;
    for (var i = sectionIds.length - 1; i >= 0; i--) {
      var id = sectionIds[i];
      var $sec = $(id);
      if ($sec.length && scrollPos >= $sec.offset().top) {
        $navLinks.removeClass('active');
        $('.navbar .nav-link[href$="' + id + '"]').addClass('active');
        activeFound = true;
        break;
      }
    }
    if (!activeFound) $navLinks.removeClass('active');
  }
  updateActiveOnScroll();
  $(window).on('scroll resize', updateActiveOnScroll);

  // Reveal on scroll for elements with .reveal
  function revealOnScroll() {
    $('.reveal').each(function(){
      var $el = $(this);
      var top = $el.offset().top;
      var winTop = $(window).scrollTop() + $(window).height() * 0.86;
      if (winTop > top) $el.addClass('visible');
    });
  }
  // mark main sections to reveal (if exist)
  $('#how-it-works, #why-gate, #transparansi, .cta-section').addClass('reveal');
  revealOnScroll();
  $(window).on('scroll resize', revealOnScroll);
  $('.media-thumb').on('click', function(e) {
    e.preventDefault();
    var $el = $(this);
    var type = $el.attr('data-type') || ($el.find('video').length ? 'video' : 'image');
    var src = $el.attr('data-src') || ($el.find('img').length ? $el.find('img').attr('src') : ($el.find('video source').length ? $el.find('video source').attr('src') : ''));

    var $container = $('#mediaContainer').empty();
    if (!src) return;

    if (type === 'video') {
      var $video = $('<video controls playsinline>').css({width:'100%'}).append(
        $('<source>').attr('src', src).attr('type','video/mp4')
      );
      $container.append($video);
    } else {
      var $img = $('<img>').attr('src', src).css({width:'100%'}).attr('alt','');
      $container.append($img);
    }

    // show modal if bootstrap available, else open in new tab
    if (typeof $ === 'function' && typeof $.fn.modal === 'function') {
      $('#mediaModal').modal('show');
    } else {
      window.open(src, '_blank');
    }
  });

  // clear modal content when closed to stop video playback
  if (typeof $ === 'function' && typeof $.fn.modal === 'function') {
    $('#mediaModal').on('hidden.bs.modal', function () {
      $('#mediaContainer').empty();
    });
  }

  // Hover preview for muted video thumbnails (progressive enhancement)
  $('.media-thumb video').each(function(){
    var vid = this;
    $(vid).on('mouseenter', function(){ vid.play().catch(function(){}); });
    $(vid).on('mouseleave', function(){ vid.pause(); vid.currentTime = 0; });
  });

  /* End of document ready */
});

