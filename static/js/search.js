const search = instantsearch({
  appId: 'RM5UBNYOIM',
  apiKey: '76f79ffe28e10e3d95fbf8503a08f846',
  indexName: 'oe7drt-hugo',
  routing: true
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    showReset: false,
    placeholder: 'Search for articles',
    autofocus: true,
    poweredBy: true,
    reset: true,
    loadingIndicator: false,
    cssClasses: {
      root: 'root',
      form: 'form',
      input: 'input form-control',
      submit: 'btn btn-default',
      reset: 'btn btn-default',
    },
  }),

  instantsearch.widgets.stats({
    container: '#stats',
  }),

  // instantsearch.widgets.hitsPerPage({
  //   container: '#hits-per-page',
  //   items: [
  //     { label: '5 hits per page', value: 5, default: true },
  //     { label: '10 hits per page', value: 10 },
  //   ],
  //   // Optional parameters
  //   //cssClasses: object,
  //   //transformItems: function,
  // }),
]);

var hitTemplate =
  '<div class="hit"><a href="{{relpermalink}}">' +
  '<h4 class="hit-heading">{{title}}</h4>' +
  '<p class="hit-summary">{{summary}}</p>' +
  '</a></div>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

search.addWidgets([
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 5,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
      // item: '{{{ _highlightResult.title.value }}}'
    },
    cssClasses: {
      list: 'list',
    },
  }),
  // instantsearch.widgets.pagination({
  //   container: '#pagination',
  //   hitsPerPage: 5,
  //   // scrollTo: '#hits',
  //   scrollTo: false,
  //   cssClasses: {
  //     root: 'root',
  //     list: 'pagination',
  //     disabledItem: 'disabledItem',
  //     selectedItem: 'selectedItem',
  //   },
  // }),
]);

search.start();
