const main = document.querySelector('#main');

function displayData(mountain) {
    const name = mountain.fjellnavn;
    const height = mountain.hoyde;
    const desc = mountain.beskrivelse;
    const photo = mountain.foto;

    const mountainDiv = document.createElement('div');
    mountainDiv.classList.add('mountain');
    main.appendChild(mountainDiv);

    const infoDiv = document.createElement('div');
    mountainDiv.appendChild(infoDiv);

    const nameElement = document.createElement('p');
    nameElement.classList.add('name');
    nameElement.innerText = `${name}`;
    infoDiv.appendChild(nameElement);

    const heightElement = document.createElement('p');
    heightElement.innerText = `Høyde: ${height} meter`;
    infoDiv.appendChild(heightElement);

    const descElement = document.createElement('p');
    descElement.innerText = `Beskrivelse: ${desc}`;
    infoDiv.appendChild(descElement);

    const photoElement = document.createElement('img');
    photoElement.classList.add('image');
    photoElement.src = `../images/${photo}`;
    mountainDiv.appendChild(photoElement);
}

async function fetchData(){
    const response = await fetch('/api/fjell_info');
    const data = await response.json();
    console.log(data);

    data.forEach(mountain => {
        displayData(mountain)
        
    });
}

fetchData();
