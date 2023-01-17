const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: "I'm Thirsty"
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: "I'm Hungry"
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: "I'm Tired"
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: "I'm Hurt"
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: "I'm Happy"
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: "I'm Angry"
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: "I'm Sad"
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: "I'm Scared"
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
Footer