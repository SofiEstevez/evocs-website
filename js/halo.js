(function() {
      window.haloSetTab = function(tab) {
        document.querySelectorAll('.halo-panel').forEach(function(p) {
          p.classList.remove('active');
        });
        var panel = document.getElementById('halo-panel-' + tab);
        if (panel) panel.classList.add('active');
        document.querySelectorAll('.halo-tab-btn').forEach(function(btn) {
          btn.classList.toggle('active', btn.dataset.tab === tab);
        });
      };
      document.addEventListener('DOMContentLoaded', function() {
        window.haloSetTab('develop');
      });
    })();
