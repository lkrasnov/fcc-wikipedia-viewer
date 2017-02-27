$(document).ready(function() {
  $("#searchForm").submit(function(event) {
    var search = $("#searchText").val();
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
  clearResults();
  var results = [];

  Object.keys(pages).forEach(key => {
    results.push(pages[key]);
  });

  results.sort(function(a, b) {
    return a.index - b.index;
  });

  results.forEach(function(result) {
    appendSearchResult(result);
  });
}

function appendSearchResult(result) {
  $("#results").append(
    '<a href="' + result.fullurl + '" target="_blank" class="list-group-item list-group-item-action mt-2">'+
      '<h4>' + result.title + '</h4>'+
      '<p class="text-justify">' + result.extract + '</p>'+
    '</a>'
  );
}

function clearResults() {
  $("#results").empty();
}
