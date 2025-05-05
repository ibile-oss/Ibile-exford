const form = document.querySelector('form');
const resuldiv = document.querySelector('.result');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) =>{
    try {
        resuldiv.innerHTML = `<h2>Loading...</h2>`;
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        let definitions = data[0].meanings[0].definitions[0];
        resuldiv.innerHTML = `
            <h2><strong>${data[0].word}</strong></h2>
            <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech[0]}</p>
            <p><strong>Meaning:</strong> ${definitions.definition === undefined ? 'Not found' : definitions.definition}</p>
            <p><strong>Example:</strong> ${definitions.example === undefined ? 'Not found' : definitions.example}</p>
            <p><strong>Antonym:</strong></p>
        `;
        if(definitions.antonyms.length === 0) {
            resuldiv.innerHTML += `<span>Not found</span>`;
        }else{
            for (let x = 0; x < definitions.antonyms.length; x++) {
                resuldiv.innerHTML += `<li>${definitions.antonyms[x]}</li>`;
                
            }
        }
        resuldiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read more</a></div>`;
    } catch (error) {
        resuldiv.innerHTML += `<p>Word not found</p>`;
        resuldiv.innerHTML += `<a href="https://www.google.com/search?q=${word}" target="_blank">Search on Google</a>`;
        console.error('Error fetching word info:', error);
    }
    
}