// Your code here
import { createMain } from './main.js';

function initializePage(){
    let container = document.createElement('div');
    container.setAttribute('class', 'container');
    document.body.appendChild(container);
}

const saveData = () => {
    let saveState = {
        url: document.querySelector('.pic').src,
        score: document.querySelector('#score').innerText,
        comments: document.querySelector('.comment-list').innerHTML,
    }

    localStorage.setItem('saveState', JSON.stringify(saveState));
}

window.onload = () => {
    initializePage();
    createMain();
}

window.addEventListener('beforeunload', () => {
    saveData();
})
