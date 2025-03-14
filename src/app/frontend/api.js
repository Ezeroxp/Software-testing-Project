const albums = await fetch('/recentlyPlayed')
if (!albums.ok) {
  console.error('Failed to fetch albums')
  console.log(albums)
}

let data = await albums.json()

const length = data.length
// Retrieve the grid parent element
const hero = document.getElementById('grid-hero')

// Loop through the data and create a div for each album
// On click redirect to each album spotify website
for (let i = 0; i < length && i < 30; i++) {
  const album = data[i]
  const albumDiv = document.createElement('div')
  albumDiv.className = 'album'
  albumDiv.innerHTML = `
        <a href="https://open.spotify.com/album/${album.album_id}">
            <img src="${album.cover_link}" alt="${album.name}" />
        </a>
        <h3>${album.name}</h3>
        <p>${album.artist}</p>
    `
  hero.appendChild(albumDiv)
}

// Set the grid-template columns based on the number of albums
hero.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(length))}, 1fr)`

// If there is no data, display a message
if (length === 0) {
    const noData = document.createElement('div')
    noData.className = 'no-data'
    noData.innerHTML = `
            <h3>No data available</h3>
        `
    hero.appendChild(noData)
    // Center the message
    hero.style.gridTemplateColumns = `1fr`
}

