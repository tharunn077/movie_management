import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Movie from 'App/Models/Movie'

export default class extends BaseSeeder {
  public async run() {
    await Movie.query().delete()

    await Movie.createMany([
      { title: 'Inception', director: 'Christopher Nolan', releaseYear: 2010, imdbRating: 8.8 },
      {
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        releaseYear: 2008,
        imdbRating: 9.0,
      },
      { title: 'Interstellar', director: 'Christopher Nolan', releaseYear: 2014, imdbRating: 8.7 },
      { title: 'Pulp Fiction', director: 'Quentin Tarantino', releaseYear: 1994, imdbRating: 8.9 },
      { title: 'KGF', director: 'Prashanth Neel', releaseYear: 2018, imdbRating: 8.2 },
      {
        title: 'Inglourious Basterds',
        director: 'Quentin Tarantino',
        releaseYear: 2009,
        imdbRating: 8.4,
      },
      { title: 'The Matrix', director: 'Lana Wachowski', releaseYear: 1999, imdbRating: 8.7 },
      { title: 'Karuppu', director: 'RJ Balaji', releaseYear: 2026, imdbRating: 7.5 },
      { title: 'Parasite', director: 'Bong Joon Ho', releaseYear: 2019, imdbRating: 8.5 },
      { title: 'Dragon', director: 'Ashwanth', releaseYear: 2025, imdbRating: 7.8 },
      { title: 'La La Land', director: 'Damien Chazelle', releaseYear: 2016, imdbRating: 8.0 },
      { title: 'Gladiator', director: 'Ridley Scott', releaseYear: 2000, imdbRating: 8.5 },
      { title: 'Leo', director: 'Lokesh Kanagaraj', releaseYear: 2023, imdbRating: 7.2 },
      { title: 'Jailer', director: 'Nelson', releaseYear: 2023, imdbRating: 7.5 },
      {
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        releaseYear: 1972,
        imdbRating: 9.2,
      },
      { title: 'Fight Club', director: 'David Fincher', releaseYear: 1999, imdbRating: 8.8 },
      { title: 'KRK', director: 'Vignesh Shivan', releaseYear: 2022, imdbRating: 6.5 },
      { title: 'Master', director: 'Lokesh Kanagaraj', releaseYear: 2021, imdbRating: 7.3 },
      { title: 'Jai Bhim', director: 'T. J. Gnanavel', releaseYear: 2021, imdbRating: 8.7 },
      { title: 'Doctor', director: 'Nelson', releaseYear: 2021, imdbRating: 7.4 },
    ])
  }
}
