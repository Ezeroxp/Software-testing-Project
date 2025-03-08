const albums = await fetch('/api/albums')
if (!albums.ok) {
  console.error('Failed to fetch albums')
  console.log(albums)
}

let data = await albums.json()
console.log(data)

// Test data
data = [
  {
    title: 'Album 1',
    artist: 'Artist 1',
    cover: 'https://placehold.co/600x400',
  },
  {
    title: 'Album 1',
    artist: 'Artist 1',
    cover: 'https://placehold.co/600x400',
  },
  {
    title: 'Album 1',
    artist: 'Artist 1',
    cover: 'https://placehold.co/600x400',
  },
  {
    title: 'Album 1',
    artist: 'Artist 1',
    cover: 'https://placehold.co/600x400',
  },
  {
    title: 'Album 1',
    artist: 'Artist 1',
    cover: 'https://placehold.co/600x400',
  },
  {
    title: 'Album 1',
    artist: 'Artist 1',
    cover: 'https://placehold.co/600x400',
  },
  {
    title: 'Album 1',
    artist: 'Artist 1',
    cover: 'https://placehold.co/600x400',
  },
  {
    title: 'Album 1',
    artist: 'Artist 1',
    cover: 'https://placehold.co/600x400',
  },
  {
    title: 'Album 1',
    artist: 'Artist 1',
    cover: 'https://placehold.co/600x400',
  },
]

const length = data.length
// Retrieve the grid parent element
const hero = document.getElementById('grid-hero')

// Loop through the data and create a div for each album
for (let i = 0; i < length; i++) {
  const album = data[i]
  const albumDiv = document.createElement('div')
  albumDiv.className = 'album'
  albumDiv.innerHTML = `
        <img src="${album.cover}" alt="${album.title}">
        <h3>${album.title}</h3>
        <p>${album.artist}</p>
    `
  hero.appendChild(albumDiv)
}

// Set the grid-template columns based on the number of albums
hero.style.gridTemplateColumns = `repeat(${Math.floor(Math.sqrt(length))}, 1fr)`
