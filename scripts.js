$(document).ready(function() {
  // Animasi fade-in
  $('.fade-in').fadeIn(1000);
  
  // Placeholder untuk OTP verifikasi (simulasi)
  $('form').submit(function(e) {
    e.preventDefault();
    alert('OTP dikirim ke email/HP Anda. Verifikasi untuk lanjut.');
  });
  
  // Sorting dummy lowongan (contoh table sortable)
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
      $('.chat-window').append('<div class="chat-message sent">' + msg + '</div>');
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

  // Interaktif review/melamar (simulasi)
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
});
