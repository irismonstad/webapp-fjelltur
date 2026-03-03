const main = document.querySelector('#main');

function displayData(mountain) {
    const name = mountain.fjellnavn;
    const height = mountain.hoyde;
    const desc = mountain.beskrivelse;

    const mountainDiv = document.createElement('div');
    mountainDiv.classList.add('mountain');
    main.appendChild(mountainDiv);

    const nameElement = document.createElement('p');
    nameElement.classList.add('name');
    nameElement.innerText = `${name}`;
    mountainDiv.appendChild(nameElement);

    const heightElement = document.createElement('p');
    heightElement.innerText = `Høyde: ${height} meter`;
    mountainDiv.appendChild(heightElement);

    const descElement = document.createElement('p');
    descElement.innerText = `Beskrivelse: ${desc}`;
    mountainDiv.appendChild(descElement);
}

async function fetchData(){
    const response = await fetch('http://localhost:3000/api/fjell_info');
    const data = await response.json();
    console.log(data);

    data.forEach(mountain => {
        displayData(mountain)
        
    });
}

fetchData();
