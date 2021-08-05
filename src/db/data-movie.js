function getSeedMovies() {
  return [
    {
      title: "The Shawshank Redemption",
      releaseYear: 1994,
      duration: 142,
      genres: ["Drama"],
      cast: [
        { _id: "610c1df54bf6061324eee9cb" },
        { _id: "610c1df54bf6061324eee9cc" },
        { _id: "610c1df54bf6061324eee9d0" },
      ],
      crew: [
        { _id: "610c1df54bf6061324eee9d3" },
        { _id: "610c1df54bf6061324eee9d9" },
      ],
    },
    {
      title: "The Green Mile",
      releaseYear: 1999,
      duration: 188,
      genres: ["Drama", "Fantasy"],
      cast: [
        { _id: "610c1df54bf6061324eee9cd" },
        { _id: "610c1df54bf6061324eee9ce" },
        { _id: "610c1df54bf6061324eee9d1" },
      ],
      crew: [
        { _id: "610c1df54bf6061324eee9d4" },
        { _id: "610c1df54bf6061324eee9d8" },
      ],
    },
    {
      title: "Saving Private Ryan",
      releaseYear: 1998,
      duration: 169,
      genres: ["Drama", "Historical"],
      cast: [
        { _id: "610c1df54bf6061324eee9d0" },
        { _id: "610c1df54bf6061324eee9cf" },
      ],
      crew: [
        { _id: "610c1df54bf6061324eee9d5" },
        { _id: "610c1df54bf6061324eee9d7" },
      ],
    },
    {
      title: "Forrest Gump",
      releaseYear: 1994,
      duration: 142,
      genres: ["Comedy", "Drama"],
      cast: [
        { _id: "610c1df54bf6061324eee9d1" },
        { _id: "610c1df54bf6061324eee9d2" },
        { _id: "610c1df54bf6061324eee9cd" },
      ],
      crew: [
        { _id: "610c1df54bf6061324eee9d6" },
        { _id: "610c1df54bf6061324eee9da" },
      ],
    },
    {
      title: "Fight Club",
      releaseYear: 1999,
      duration: 139,
      genres: ["Drama"],
      cast: [
        { _id: "610c1df54bf6061324eee9cb" },
        { _id: "610c1df54bf6061324eee9cc" },
      ],
      crew: [
        { _id: "610c1df54bf6061324eee9d3" },
        { _id: "610c1df54bf6061324eee9d9" },
      ],
    },
    {
      title: "The Notebook",
      releaseYear: 2004,
      duration: 154,
      genres: ["Romance"],
      cast: [
        { _id: "610c1df54bf6061324eee9cd" },
        { _id: "610c1df54bf6061324eee9ce" },
      ],
      crew: [
        { _id: "610c1df54bf6061324eee9d4" },
        { _id: "610c1df54bf6061324eee9d8" },
      ],
    },
    {
      title: "Dilwale Dulhania Le Jayenge",
      releaseYear: 1995,
      duration: 109,
      genres: ["Western"],
      cast: [
        { _id: "610c1df54bf6061324eee9cf" },
        { _id: "610c1df54bf6061324eee9d0" },
        { _id: "610c1df54bf6061324eee9cb" },
      ],
      crew: [
        { _id: "610c1df54bf6061324eee9d5" },
        { _id: "610c1df54bf6061324eee9d7" },
      ],
    },
  ];
}

module.exports = { getSeedMovies };
