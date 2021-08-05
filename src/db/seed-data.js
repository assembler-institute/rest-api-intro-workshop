function getSeedMovieGenres() {
  return [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime and mystery",
    "Drama",
    "Fantasy",
    "Historical",
    "Horror",
    "Romance",
    "Satire",
    "Science Fiction",
    "Thriller",
    "Western",
  ];
}

function getSeedMovies() {
  return [
    {
      title: "The Shawshank Redemption",
      releaseYear: 1994,
      originalLanguage: "English",
      posterPath:
        "https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i",
      plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      budget: 25000000,
      duration: 142,
      genres: ["Drama"],
    },
    {
      title: "The Green Mile",
      releaseYear: 1999,
      originalLanguage: "English",
      posterPath:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQuvf_VftTT1yl108n-djjrs73_e6Rzx6iIeZLt8V7W66XxNfmx",
      plot: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
      budget: 60000000,
      duration: 188,
      genres: ["Drama", "Fantasy"],
    },
    {
      title: "Saving Private Ryan",
      releaseYear: 1998,
      originalLanguage: "English",
      posterPath:
        "https://images-na.ssl-images-amazon.com/images/I/41zN6HGkL1L._AC_.jpg",
      plot: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
      budget: 70000000,
      duration: 169,
      genres: ["Drama", "Historical", "War"],
    },
    {
      title: "Forrest Gump",
      releaseYear: 1994,
      originalLanguage: "English",
      posterPath:
        "https://pics.filmaffinity.com/Forrest_Gump-212765827-large.jpg",
      plot: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
      budget: 55000000,
      duration: 142,
      genres: ["Comedy", "Drama"],
    },
    {
      title: "Fight Club",
      releaseYear: 1999,
      originalLanguage: "English",
      posterPath:
        "https://pics.filmaffinity.com/fight_club-320750671-large.jpg",
      plot: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
      budget: 63000000,
      duration: 139,
      genres: ["Drama"],
    },
  ];
}

module.exports = {
  getSeedMovies: getSeedMovies,
  getSeedMovieGenres: getSeedMovieGenres,
};
