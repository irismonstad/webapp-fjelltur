async function hentPersoner() {
    const response = await fetch('/api/personer_alle');
    const personer = await response.json();
    const dropdown = document.querySelector("#personDropdown");

    for (const person of personer) {
        const option = document.createElement('option');
        option.value = person.brukernavn;
        option.textContent = person.brukernavn;
        dropdown.appendChild(option);
    }
};

document.querySelector('#personDropdown').addEventListener('change', async function () {
    const brukernavn = this.value;
    console.log(`Valgt person: ${brukernavn}`);

    if (brukernavn) {
        const response = await fetch(`/api/fjellturer/${encodeURIComponent(brukernavn)}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const fjellturer = await response.json();

        console.log(fjellturer);

        const turerDiv = document.querySelector('#fjellturContainer');
        const testing = document.createElement('p');
        testing.innerText="testing";
        turerDiv.appendChild(testing);

        turerDiv.innerHTML = `<h2>Fjellturer for ${brukernavn}</h2>`;
        const ul = document.createElement('ul');
        for (const tur of fjellturer) {
            const li = document.createElement('li');
            li.textContent = tur.fjellnavn;
            ul.appendChild(li);
        }
        turerDiv.appendChild(ul);
    
    }


})

document.addEventListener('DOMContentLoaded', hentPersoner);