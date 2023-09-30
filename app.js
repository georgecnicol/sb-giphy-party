// console.log("Let's get this party started!");

const baseURL = 'https://api.giphy.com/v1/gifs/search';
const myKey = '5chVR6pIg0rKbSz6yvg57ViwMRx9rFx1';
// yes, you aren't supposed to include creds. In this case, it is a non-production API key with limited
// bandwidth on a throwaway account. I won't be using it for anything else, and it serves to power this
// demo. so.....there it is.

const imageContainer = $('#images-container');
maxResults = 35; // we are going to choose a random element from the top number of maxResults so we can reshuffle


function randomize(){
    return Math.floor(Math.random() * maxResults);
}

async function queryGiphy(q, api_key, limit, shuffle, target){
    const res = await axios.get(baseURL, {params : {q, api_key, limit}});
    const dataObj = {
        src : res.data.data[randomize()].images.fixed_height.url,
        data : q
    }
    if (shuffle){
        target.src = dataObj.src;
        target.dataset.q = dataObj.data;
    }else{
        makeNewGif(dataObj);
    }


}

function makeNewGif(obj){
    const newGif = document.createElement('img');
    newGif.src = obj.src;
    newGif.dataset.q = obj.data;
    imageContainer.append(newGif);
}


// if you click on an image it will shuffle to some other based on maxResults
$('#images-container').on('click', (e) => {
    queryGiphy(e.target.dataset.q, myKey, maxResults, true, e.target);
})

$('#submit-button').on('click', (e) => {
    e.preventDefault();
    queryGiphy($('#search-box').val(), myKey, maxResults, false);
    $('#search-box').val('');
});

$('#remove-button').on('click', () => {
    imageContainer.empty();
})


/* dark mode stuff */
const toggleSwitch = document.querySelector('#checkbox');

if(localStorage.darkmode == 'true'){
  toggleSwitch.checked = 'true';
  document.body.className = 'dark';
};

toggleSwitch.addEventListener('click', function(e){
  const {checked} = toggleSwitch;
  document.body.className = checked ? 'dark' : '';
  localStorage.darkmode = checked;
});