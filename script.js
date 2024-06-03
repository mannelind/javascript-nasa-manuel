document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('nameInput');
    const submitButton = document.getElementById('submitButton');
    const nameDisplay = document.getElementById('nameDisplay');
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    const apiKey = 'meZ8f32bACyEFZVb1HSgNGMOvKbZVIvs8PZ2jtoz';
    
    // Aktivera/inaktivera knappen baserat på antal tecken
    input.addEventListener('input', () => {
        submitButton.disabled = input.value.length < 3;
    });

    // hantering av inmatning
    document.getElementById('nameForm').addEventListener('submit', (event) => {
        event.preventDefault();
        nameDisplay.textContent = `Hej, ${input.value.trim()}!`;
        input.value = '';
        submitButton.disabled = true;
    });

    // Hämta och visa Mars-bilder
    function fetchMarsPhotos() {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('marsImagesContainer');
                container.innerHTML = data.photos.slice(0, 10).map(photo => `
                    <div class="marsImageCard">
                        <img src="${photo.img_src}" alt="Mars Photo by ${photo.camera.full_name}">
                    </div>
                `).join('') || '<p>Inga bilder hittades för vald dag.</p>';
            })
            .catch(() => {
                document.getElementById('marsImagesContainer').innerHTML = '<p>Ett fel inträffade vid hämtning av bilder.</p>';
            });
    }

    // Växla mellan ljus och mörkt läge och ändra knappens text
    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleDarkModeButton.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    // Hämta bilder vid sidladdning
    fetchMarsPhotos();
});