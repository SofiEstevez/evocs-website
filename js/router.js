function showPage(id) {
    document.querySelectorAll('.page').forEach(function(p) {
      p.classList.remove('active');
    });
    var page = document.getElementById('page-' + id);
    if (page) {
      page.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.location.hash = id === 'home' ? '' : id;
    }
  }

  function scrollToId(id, event) {
    if (event) event.preventDefault();
    var el = document.getElementById(id);
    if (!el) return;
    var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;
    var top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  // Handle hash on load
  (function() {
    var hash = window.location.hash.replace('#', '');
    var validPages = ['home', 'products', 'bari', 'piro', 'osimo', 'halo', 'helix', 'merlin'];
    if (hash && validPages.indexOf(hash) !== -1) {
      showPage(hash);
    }
  })();