$( document ).ready(function() {

    $('table').addClass('uk-table uk-table-divider');
    $('blockquote').addClass('uk-alert-primary');

    tocbot.init({
        tocSelector: '#doc_nav',
        contentSelector: '#documentation',
        headingSelector: 'h1, h2, h3, h4',

        listClass: 'uk-nav',
        activeLinkClass: 'exp-active'
    });

    $('#doc_nav > ul').addClass('uk-nav-default');
    $('#doc_nav > ul > li ul').addClass('uk-nav-sub');

});
