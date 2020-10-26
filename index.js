'use strict';

// put your own value below!
const apiKey = 'VQFYajv2hr4ZmP0pTKgRyhrGkb8j929bbcXcJBcC'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?stateCode=California&api_key=VQFYajv2hr4ZmP0pTKgRyhrGkb8j929bbcXcJBcC';

function createUrl(state, maxResults=10){
    return `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${maxResults}&api_key=${apiKey}`;
}

function getParks(query, maxResults){
    const url = createUrl(query, maxResults);
    fetch(url)
        .then(response=> {
            if (response.ok) {
              return response.json();
            }
          throw new Error(response.statusText);
          })
          .then(responseJson => displayResults(responseJson))
          .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
          });
};



function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty(responseJson);
}
  // iterate through the items array
  /*for (let i = 0; i < responseJson.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.items[i].snippet.title}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
      </li>`
    );}
  //display the results section  
  $('#results').removeClass('hidden');
}
/*
function getYouTubeVideos(query, maxResults=10) {
  const params = {
    key: apiKey,
    q: query,
    part: 'snippet',
    maxResults,
    type: 'video'
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);*/

  /*
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}*/

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const state = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(state, maxResults);
  });
}

$(watchForm);