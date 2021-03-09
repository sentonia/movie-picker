
//-------- Url Query ------------------------------
export const urlQuery = (query) => {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=cc3a7c7096faaf33994ca70dc7f2e464`
    : `https://api.themoviedb.org/3/movie/popular?api_key=cc3a7c7096faaf33994ca70dc7f2e464`;
  return url
};

//--------- Custom Colors --------------------------
export const custom_orange = '#FCA311'
export const custom_blue= '#14213D'

//---- No Results Mesage ---------------------------
export const no_results_text = "Hmmmmm... We couldn't find any matches for your search! Double check your search for any typos or spelling errors or try a  different search term. :) "