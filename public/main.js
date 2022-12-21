export const createMain = async () => {
    //create h1
    const heading = document.createElement('h1');
    heading.setAttribute('class', 'title');
    heading.innerText = 'Kitty Pic';

    //create img element
    const pic = document.createElement('img');
    pic.setAttribute('class', 'pic');

    const container = document.querySelector(".container");
    container.appendChild(heading);
    container.appendChild(pic);

    //grab img from api
    await fetchImg();

    //add button for another cat
    await getAnotherCat();

    //add upvote/downvote buttons
    await addScore();

    //add comment field
    await addComment();

    //grab saved data if it exists
    await loadData();
}

const fetchImg = async () => {
    try {
        //grab new cat
        const kittenRes = await fetch('https://api.thecatapi.com/v1/images/search');
        const kittenData = await kittenRes.json();
        const kitten = document.querySelector(".pic");
        kitten.src = kittenData[0].url;

        //clear popularity score
        const popularity = document.getElementsByTagName('h3')[0];
        popularity.innerHTML = `Popularity Score: <span id='score'>0</span>`;

        //clear comments
        const commentList = document.querySelector('.comment-list');
        commentList.innerHTML = "";
    } catch (error) {
        console.log('Fetching failed: ', error);
    }
}

const getAnotherCat = async () => {
    const newcat = document.createElement('button');
    newcat.setAttribute('class', 'new-cat');
    newcat.innerText = 'Get Another Cat';
    newcat.addEventListener('click', fetchImg);
    const container = document.querySelector(".container");
    container.appendChild(newcat);
}

const addScore = () => {
    const popularity = document.createElement('h3');
    popularity.innerHTML = `Popularity Score: <span id='score'>0</span>`;
    const upvoteBtn = document.createElement('button');
    upvoteBtn.innerText = 'Upvote';
    upvoteBtn.addEventListener('click', handleUpvote);
    const downvoteBtn = document.createElement('button');
    downvoteBtn.innerText = 'Downvote';
    downvoteBtn.addEventListener('click', handleDownvote);

    const voteContainer = document.createElement('div');
    voteContainer.setAttribute('class', 'vote-container');
    voteContainer.appendChild(upvoteBtn);
    voteContainer.appendChild(downvoteBtn);

    const container = document.querySelector(".container");
    container.appendChild(popularity);
    container.appendChild(voteContainer);
}

const handleUpvote = () => {
    let score = document.getElementById('score').innerText;
    const popularity = document.getElementsByTagName('h3')[0];
    popularity.innerHTML = `Popularity Score: <span id='score'>${++score}</span>`;
}

const handleDownvote = () => {
    let score = document.getElementById('score').innerText;
    if (score > 0){
        const popularity = document.getElementsByTagName('h3')[0];
        popularity.innerHTML = `Popularity Score: <span id='score'>${--score}</span>`;
    }
}


const addComment = () => {
    const commentInput = document.createElement('div');
    commentInput.innerHTML = `
    <label for="comment">Comment: </label>
    <input type="text" id="comment" name="comment" placeholder="Add a comment...">
    <input type="button" id="comment-submit" value="Submit">`;

    const commnetList = document.createElement('ul');
    commnetList.setAttribute('class', 'comment-list');

    const allComments = document.createElement('div');
    allComments.setAttribute('class', 'all-comments');
    allComments.appendChild(commnetList);

    const container = document.querySelector(".container");
    container.appendChild(commentInput);
    container.appendChild(allComments);

    const commentSubmit = document.querySelector('#comment-submit');
    commentSubmit.addEventListener('click', handleAddingComment);
}

const handleAddingComment = () => {
    //grab comment
    const comment = document.querySelector('#comment');
    console.log(comment.value);

    //create new comment
    const newcomment = document.createElement('li');
    newcomment.innerText = comment.value;

    //display new comment
    const commentList = document.querySelector('.comment-list');
    commentList.appendChild(newcomment);

    comment.value = '';
}

const loadData = () => {
    if (localStorage.getItem('saveState')){
        let saveState = JSON.parse(localStorage.getItem('saveState'));
        document.querySelector('.pic').src = saveState.url;
        document.querySelector('#score').innerText = saveState.score;
        document.querySelector('.comment-list').innerHTML = saveState.comments;
    }
}
