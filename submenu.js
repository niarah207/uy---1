// submenu.js — menu "Explorar" (desktop: hover/clique; mobile: sanfona) — Updated Yesterday
// Carregue em TODAS as páginas que tenham o cabeçalho com o menu "Explorar".
(function () {
    var itens = document.querySelectorAll('.item-submenu, .item-submenu-mobile');

    function fechar(item) {
        item.classList.remove('aberto');
        var b = item.querySelector('button');
        if (b) b.setAttribute('aria-expanded', 'false');
    }

    itens.forEach(function (item) {
        var botao = item.querySelector('button');
        if (!botao) return;
        botao.addEventListener('click', function (e) {
            e.stopPropagation();
            var abrir = !item.classList.contains('aberto');
            itens.forEach(fechar);
            if (abrir) {
                item.classList.add('aberto');
                botao.setAttribute('aria-expanded', 'true');
            }
        });
        // No desktop, o hover já abre o submenu; ao tirar o mouse, fecha também o estado por clique.
        if (item.classList.contains('item-submenu')) {
            item.addEventListener('mouseleave', function () { fechar(item); });
        }
    });

    document.addEventListener('click', function () { itens.forEach(fechar); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') itens.forEach(fechar); });

    // Marca a página atual dentro do submenu (e o botão "Explorar" como ativo).
    var atual = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.submenu a, .submenu-mobile a').forEach(function (a) {
        var alvo = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
        if (alvo && alvo === atual) {
            if ((a.getAttribute('href') || '').indexOf('#') === -1) a.setAttribute('aria-current', 'page');
            var pai = a.closest('.item-submenu, .item-submenu-mobile');
            var b = pai && pai.querySelector('button');
            if (b) b.classList.add('ativo');
        }
    });
})();
