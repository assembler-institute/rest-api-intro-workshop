function getSeedMovies() {
  return [
    {
      title: "The Shawshank Redemption",
      releaseYear: 1994,
      duration: 142,
      genres: ["Drama"],
      cast: ["Keanu Reeves", "Leonardo DiCaprio", "Johnny Depp"],
      crew: ["Steven Spielberg", "Rachel Portman"],
    },
    {
      title: "The Green Mile",
      releaseYear: 1999,
      duration: 188,
      genres: ["Drama", "Fantasy"],
      cast: ["Tom Cruise", "Will Smith", "Robert Downey Jr."],
      crew: ["John Williams", "Alfred Hitchcock"],
    },
    {
      title: "Saving Private Ryan",
      releaseYear: 1998,
      duration: 169,
      genres: ["Drama", "Historical"],
      cast: ["Haley Bennett", "Zoe Perry", "Robert Downey Jr."],
      crew: ["Stanley Kubrick", "Javier Navarrete"],
    },
    {
      title: "Forrest Gump",
      releaseYear: 1994,
      duration: 142,
      genres: ["Comedy", "Drama"],
      cast: ["Will Smith", "Tom Cruise", "Zoe Perry"],
      crew: ["Rachel Portman OBE", "Quentin Tarantino"],
    },
    {
      title: "Fight Club",
      releaseYear: 1999,
      duration: 139,
      genres: ["Drama"],
      cast: ["Keanu Reeves", "Zoe Perry", "Will Smith"],
      crew: ["Rachel Portman OBE", "Javier Navarrete", "Quentin Tarantino"],
    },
    {
      title: "The Notebook",
      releaseYear: 2004,
      duration: 154,
      genres: ["Romance"],
      cast: ["Haley Bennett", "Leonardo DiCaprio", "Johnny Depp"],
      crew: ["Stanley Kubrick", "Alfred Hitchcock"],
    },
    {
      title: "Dilwale Dulhania Le Jayenge",
      releaseYear: 1995,
      duration: 109,
      genres: ["Western"],
      cast: ["Robert Downey Jr.", "Will Smith", "Johnny Depp"],
      crew: ["Rachel Portman", "Quentin Tarantino", "Steven Spielberg"],
    },
  ];
}

module.exports = { getSeedMovies };
