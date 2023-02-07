//Receiving a list of movies as Objects such as:
// {
//     "id": 1,
//     "title": "Friday the 13th",
//     "release_year": 1980,
//     "description": "Camp counselors are stalked and murdered by an unknown assailant while trying to reopen a summer camp that was the site of a child's drowning.",
//     "image": "./assets/f13-1.jpeg",
//     "watched": false,
//     "blood_amount": 0
//   }
const nav = document.querySelector('#movie-list')
const detailImage = document.querySelector('#detail-image')
const title = document.querySelector('#title')
const yearReleased = document.querySelector('#year-released')
const description = document.querySelector('#description')
const watched = document.querySelector('#watched')
const bloodAmount = document.querySelector('#amount')
const addBloodForm = document.querySelector('#blood-form')

const fetchMovies = () => {
	fetch('http://localhost:3000/movies')
		.then((res) => res.json())
		.then((movies) => {
			appendImages(movies)
			getMovie(movies[0])
		})
}

const appendImages = (movies) => {
	movies.forEach((movie) => {
		const imageElement = document.createElement('img')
		imageElement.setAttribute('src', movie.image)
		imageElement.setAttribute('id', movie.id)
		imageElement.addEventListener('click', () => getMovie(movie))
		nav.appendChild(imageElement)
	})
}

const getMovie = (movies) => {
	detailImage.setAttribute('src', movies.image)
	title.textContent = movies.title
	yearReleased.textContent = movies.release_year
	description.textContent = movies.description
	watched.textContent = movies.watched ? 'Watched!' : 'Unwatched!'
	watched.addEventListener('click', () => {
		watchedFlip(movies)
	})
	addBloodForm.addEventListener('submit', (e) => {e.preventDefault();
	addBlood(e, movies)})
	bloodAmount.textContent = movies.blood_amount
}

//with another Fetch request
// const getMovieDetails = (movie) => {
// 	// console.log(`http://localhost:3000/movies/${movie.target.id}`)
// 	fetch(`http://localhost:3000/movies/${movie.target.id}`)
// 		.then((res) => res.json())
// 		.then((movieDetails) => {
// 			detailImage.setAttribute('src', movieDetails.image)
// 			title.textContent = movieDetails.title
// 			yearReleased.textContent = movieDetails.release_year
// 			description.textContent = movieDetails.description
// 			watched.textContent = movieDetails.watched ? 'Watched!' : 'Unwatched!'
// 			bloodAmount.textContent = movieDetails.blood_amount
// 		})
// }

const watchedFlip = (movie) => {
	const updatedMovie = !movie.watched
	fetch(`http://localhost:3000/movies/${movie.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ watched: updatedMovie })
	})
		.then((res) => res.json())
		.then((updatedMovie) => {
			watched.textContent = updatedMovie.watched ? 'Watched!' : 'Unwatched!'
		})
}

const addBlood = (e, movie) => {
	const updatedBlood = movie.blood_amount+= parseInt(e.target[0].value)
	fetch(`http://localhost:3000/movies/${movie.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ blood_amount: updatedBlood })
	})
		.then((res) => res.json())
		.then((updatedMovie) => {
			bloodAmount.textContent = updatedMovie.blood_amount
		})
}

//Jackie's solution
// function updateWatch(input){
//     const updatedWatchedStatus = !input.watched
//     input.watched = updatedWatchedStatus;
//     // console.log(updatedWatchedStatus);
//     fetch(`http://localhost:3000/movies/${input.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             watched: updatedWatchedStatus
//         })
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
// }

fetchMovies()
