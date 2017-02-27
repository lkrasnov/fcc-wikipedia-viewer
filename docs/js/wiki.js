$(document).ready(function() {
  $("#searchForm").submit(function(event) {
    const search = $("#searchText").val();
    $.ajax({
      cache: false,
      url: "https://en.wikipedia.org/w/api.php",
      data: {
        "action": "query",
        "format": "json",
        "prop": "extracts|info",
        "generator": "search",
        "exsentences": "1",
        "exlimit": "max",
        "exintro": 1,
        "explaintext": 1,
        "inprop": "url",
        "gsrsearch": search,
        "gsrnamespace": "0"
      },
      dataType: "jsonp",
      success: function(data) {
        updateSearchResults(data.query.pages);
      }
    });
    event.preventDefault();
  });
});

function updateSearchResults(pages) {
  $("#results").empty();
  const results = [];

  Object.keys(pages).forEach(key => results.push(pages[key]));

  results.sort((a, b) => a.index - b.index);
  results.forEach(appendSearchResult);
}

const appendSearchResult = result => (
  $("#results").append(
    `<a href="${result.fullurl}" target="_blank" class="list-group-item list-group-item-action mt-2">
      <h4>${result.title}</h4>
      <div class="container p-0">
        <p class="text-justify text-left">${result.extract}</p>
      </div>
    </a>`
  )
);
