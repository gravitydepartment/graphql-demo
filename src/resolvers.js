import { movies } from './db';

const resolvers = {
    Query: {
        movie: (parent, { id }, context, info) => {
            return movies.find(movie => movie.id == id);
        },
        movies: (parent, args, context, info) => {
            return movies;
        }
    },
    Mutation: {
        createMovie: (parent, { id, title, year, name, role }, context, info) => {
            const index = movies.findIndex(movie => movie.id == id);

            if (index >= 0) {
                throw new Error('A movie with index ' + id + ' already exists.');
            }

            const newMovie = { id, title, year, name, role };
            movies.push(newMovie);
            return newMovie;
        },
        updateMovie: (parent, { id, title, year, name, role }, context, info) => {
            let newMovie = movies.find(movie => movie.id == id);

            if (typeof title !== 'undefined') { newMovie.title = title; }
            if (typeof year  !== 'undefined') { newMovie.year  = year; }
            if (typeof name  !== 'undefined') { newMovie.name  = name; }
            if (typeof role  !== 'undefined') { newMovie.role  = role; }

            return newMovie;
        },
        deleteMovie: (parent, { id }, context, info) => {
            const index = movies.findIndex(movie => movie.id == id);

            if (index === -1) {
                throw new Error('Movie not found.');
            }

            const deletedMovies = movies.splice(index, 1);

            return deletedMovies[0];
        }
    }
};

export default resolvers;
