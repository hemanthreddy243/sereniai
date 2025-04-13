// Floating circles animation
const floatingCircles = document.getElementById('floatingCircles');
const colors = ['#7bb5b3', '#b6d7a8', '#9fc5e8', '#d5a6bd', '#f8f4e3'];

for (let i = 0; i < 15; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    
    const size = Math.random() * 100 + 50;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.backgroundColor = color;
    circle.style.left = `${Math.random() * 100}%`;
    circle.style.top = `${Math.random() * 100}%`;
    
    floatingCircles.appendChild(circle);
}

const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
    const duration = Math.random() * 10 + 10;
    const xMovement = Math.random() * 20 - 10;
    const yMovement = Math.random() * 20 - 10;
    
    circle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${xMovement}px, ${yMovement}px)` },
        { transform: 'translate(0, 0)' }
    ], {
        duration: duration * 1000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
});

// Random quotes
const quotes = [
    { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer" },
    { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.", author: "Lori Deschene" },
    { text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: "Unknown" },
    { text: "Take a deep breath. It's just a bad day, not a bad life.", author: "Unknown" },
    { text: "It's okay to not be okay, as long as you are not giving up.", author: "Karen Salmansohn" },
    { text: "Self-care is how you take your power back.", author: "Lalah Delia" },
    { text: "Be gentle with yourself. You're doing the best you can.", author: "Unknown" }
];

function changeQuote() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quoteElement.textContent = `"${randomQuote.text}"`;
    authorElement.textContent = `- ${randomQuote.author}`;
}

setInterval(changeQuote, 10000);

// Activity tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Breathing exercise
const breathCircle = document.getElementById('breathCircle');
const breathText = document.getElementById('breathText');
const startBreathingBtn = document.getElementById('startBreathing');
const breathDurationInput = document.getElementById('breathDuration');
let isBreathing = false;

startBreathingBtn.addEventListener('click', () => {
    if (isBreathing) {
        stopBreathing();
        startBreathingBtn.textContent = 'Start Exercise';
    } else {
        startBreathing();
        startBreathingBtn.textContent = 'Stop Exercise';
    }
    isBreathing = !isBreathing;
});

function startBreathing() {
    breathIn();
}

function stopBreathing() {
    breathCircle.style.animation = 'none';
    breathText.textContent = 'Breathe In';
}

function breathIn() {
    const duration = parseInt(breathDurationInput.value) || 4;
    breathText.textContent = 'Breathe In';
    breathCircle.style.animation = `breatheIn ${duration}s linear forwards`;
    
    breathCircle.onanimationend = () => {
        breathHold();
    };
}

function breathHold() {
    breathText.textContent = 'Hold';
    const duration = parseInt(breathDurationInput.value) || 4;
    setTimeout(breathOut, duration * 1000 / 2);
}

function breathOut() {
    breathText.textContent = 'Breathe Out';
    const duration = parseInt(breathDurationInput.value) || 4;
    breathCircle.style.animation = `breatheOut ${duration * 1.5}s linear forwards`;
    
    breathCircle.onanimationend = () => {
        if (isBreathing) {
            setTimeout(breathIn, 1000);
        }
    };
}

// Drawing canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearCanvas');
const saveDrawingBtn = document.getElementById('saveDrawing');
const colorDots = document.querySelectorAll('.color-dot');

let isDrawing = false;
let currentColor = '#7bb5b3';
let lastX = 0;
let lastY = 0;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;
ctx.strokeStyle = currentColor;

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
});

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveDrawingBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    saveJournalEntry([`Drawing saved from canvas.`], new Date(), dataURL);
    alert('Drawing saved to journal!');
});

colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentColor = dot.getAttribute('data-color');
        ctx.strokeStyle = currentColor;
        
        colorDots.forEach(d => d.style.transform = 'scale(1)');
        dot.style.transform = 'scale(1.2)';
    });
});

// Memory game
const memoryGame = document.getElementById('memoryGame');
const restartMemoryBtn = document.getElementById('restartMemory');
let currentLevel = 1;
const levelConfigs = [
    { pairs: 4, emojis: ['😊', '🌸', '🌈', '🦋'] },
    { pairs: 6, emojis: ['😊', '🌸', '🌈', '🦋', '🌞', '🐢'] },
    { pairs: 8, emojis: ['😊', '🌸', '🌈', '🦋', '🌞', '🐢', '🌴', '🍎'] }
];
let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

function createMemoryGame() {
    const config = levelConfigs[Math.min(currentLevel - 1, levelConfigs.length - 1)];
    const cardValues = [...config.emojis, ...config.emojis];
    cards = [];
    matchedPairs = 0;
    
    cardValues.sort(() => Math.random() - 0.5);
    
    memoryGame.innerHTML = '';
    
    cardValues.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.value = emoji;
        card.dataset.id = index;
        card.addEventListener('click', flipCard);
        card.textContent = '?';
        
        memoryGame.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;
    
    if (isMatch) {
        disableCards();
        matchedPairs++;
        
        if (matchedPairs === levelConfigs[Math.min(currentLevel - 1, levelConfigs.length - 1)].pairs) {
            setTimeout(() => {
                alert(`Level ${currentLevel} complete! Moving to next level.`);
                currentLevel = Math.min(currentLevel + 1, levelConfigs.length);
                createMemoryGame();
            }, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    
    setTimeout(() => {
        firstCard.textContent = '?';
        secondCard.textContent = '?';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

restartMemoryBtn.addEventListener('click', () => {
    currentLevel = 1;
    createMemoryGame();
});

// Journal and Mood Tracking
const journalEntriesContainer = document.getElementById('journalEntries');
const clearJournalBtn = document.getElementById('clearJournal');
const moodChartCanvas = document.getElementById('moodChart');
let journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

// Simulated chat data (for initial testing)
const simulatedChats = [
    { messages: ["I'm feeling really stressed about work.", "Can you help me relax?"], timestamp: new Date(Date.now() - 24*60*60*1000) },
    { messages: ["Today was tough, I'm sad about a friend moving away."], timestamp: new Date(Date.now() - 2*24*60*60*1000) },
    { messages: ["I'm feeling calm today, just want to chat."], timestamp: new Date(Date.now() - 3*24*60*60*1000) },
    { messages: ["Can't focus today, too many distractions."], timestamp: new Date(Date.now() - 4*24*60*60*1000) }
];

// Chatbot integration with voice
const openChatBtn = document.getElementById('openChat');
const sendMessageBtn = document.getElementById('sendMessage');
const chatInput = document.getElementById('chatInput');

// Mock bot responses for simulation
const mockResponses = [
    "I'm here for you. Would you like to try a breathing exercise?",
    "That sounds tough. Want to share more?",
    "I'm glad you're opening up. How can I help?",
    "Let's take it one step at a time. What's on your mind?"
];

// Ensure chat input is hidden by default
chatInput.style.display = 'none';
sendMessageBtn.style.display = 'none';

openChatBtn.addEventListener('click', () => {
    if (window.Chatling) {
        window.Chatling.open();
        waitForChatbotIframe();
    } else {
        console.warn('Chatling not loaded. Using fallback input.');
        chatInput.style.display = 'block';
        sendMessageBtn.style.display = 'block';
    }
});

sendMessageBtn.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) {
        console.log('No message entered');
        return;
    }
    
    simulateChatSessionWithText(userMessage);
    chatInput.value = '';
});

let recognition = window.SpeechRecognition || window.webkitSpeechRecognition ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() : null;

if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onstart = () => console.log('Speech recognition started');
    recognition.onerror = handleRecognitionError;
    recognition.onend = handleRecognitionEnd;
} else {
    console.warn('Speech Recognition not supported in this browser.');
}

function waitForChatbotIframe() {
    let attempts = 0;
    const maxAttempts = 30;
    const interval = setInterval(() => {
        const iframe = document.getElementById('chatling-chat-iframe');
        if (attempts >= maxAttempts) {
            clearInterval(interval);
            console.error('Failed to detect Chatling iframe after maximum attempts.');
            return;
        }
        if (iframe && !iframe.contentWindow) {
            console.log(`Attempt ${attempts + 1} to detect Chatling iframe...`);
            attempts++;
        } else if (iframe) {
            clearInterval(interval);
            console.log('Chatling iframe detected, adding voice button...');
            addVoiceButtonNextToIframe(iframe);
        }
    }, 1000);
}

function addVoiceButtonNextToIframe(iframe) {
    const voiceBtnContainer = document.createElement('div');
    voiceBtnContainer.style.position = 'absolute';
    voiceBtnContainer.style.bottom = '175px';
    voiceBtnContainer.style.right = '20px';
    voiceBtnContainer.style.zIndex = '2147483648';

    const voiceBtn = document.createElement('button');
    voiceBtn.id = 'voiceInputBtn';
    voiceBtn.textContent = '🎤 Voice Input';
    voiceBtn.style.padding = '5px 10px';
    voiceBtn.style.marginLeft = '10px';
    voiceBtn.style.backgroundColor = 'var(--primary, #7bb5b3)';
    voiceBtn.style.border = 'none';
    voiceBtn.style.borderRadius = '5px';
    voiceBtn.style.cursor = 'pointer';
    voiceBtn.style.fontSize = '14px';
    voiceBtn.style.color = 'white';

    voiceBtn.addEventListener('click', () => {
        if (!recognition) {
            alert('Voice input is not supported in this browser.');
            return;
        }

        if (!voiceBtn.classList.contains('active')) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(() => {
                    recognition.start();
                    voiceBtn.textContent = '🎤 Stop Voice';
                    voiceBtn.style.backgroundColor = '#ff6b6b';
                    voiceBtn.classList.add('active');
                    console.log('Microphone access granted, starting recognition...');
                })
                .catch(err => {
                    console.error('Microphone permission denied:', err);
                    alert('Microphone access is required. Please allow permission in edge://settings/content/microphone and reload.');
                });
        } else {
            recognition.stop();
            voiceBtn.textContent = '🎤 Voice Input';
            voiceBtn.style.backgroundColor = 'var(--primary, #7bb5b3)';
            voiceBtn.classList.remove('active');
        }
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        console.log('Voice input:', transcript);
        
        chatInput.value = transcript;
        sendMessageBtn.click();
        
        recognition.stop();
        voiceBtn.textContent = '🎤 Voice Input';
        voiceBtn.style.backgroundColor = 'var(--primary, #7bb5b3)';
        voiceBtn.classList.remove('active');
    };

    voiceBtnContainer.appendChild(voiceBtn);
    document.body.appendChild(voiceBtnContainer);
    console.log('Voice button added next to iframe.');
}

function handleRecognitionError(event) {
    console.error('Speech recognition error:', event.error);
    const voiceBtn = document.querySelector('#voiceInputBtn');
    if (voiceBtn && voiceBtn.classList.contains('active')) {
        recognition.stop();
        voiceBtn.textContent = '🎤 Voice Input';
        voiceBtn.style.backgroundColor = 'var(--primary, #7bb5b3)';
        voiceBtn.classList.remove('active');
    }
    alert('Voice input failed: ' + event.error + '. Please try again or type your message.');
}

function handleRecognitionEnd() {
    const voiceBtn = document.querySelector('#voiceInputBtn');
    if (voiceBtn && voiceBtn.classList.contains('active')) {
        recognition.start();
    } else {
        console.log('Speech recognition ended.');
    }
}

// Voice output
let isVoiceOutputActive = false;
let synth = window.speechSynthesis;
if (!synth) {
    console.warn('Native Speech Synthesis not supported. Using ResponsiveVoice.');
    synth = {
        speak: (utterance) => {
            responsiveVoice.speak(utterance.text, 'UK English Female', { rate: 1.0 });
        }
    };
}

function speakText(text) {
    if (isVoiceOutputActive && synth) {
        const utterance = { text };
        synth.speak(utterance);
    }
}

// Initialize sentiment analysis
let sentiment;
function initializeSentiment() {
    if (window.Sentiment) {
        sentiment = new Sentiment();
        console.log('Sentiment library initialized');
    } else {
        console.warn('Sentiment library not available, using fallback');
        sentiment = { analyze: () => ({ score: 0 }) }; // Fallback to neutral
    }
}

// Enhanced mood detection
function summarizeChat(messages) {
    const summary = messages.join(" ").substring(0, 100) + (messages.join(" ").length > 100 ? "..." : "");
    
    const messageText = messages.join(" ");
    const analysis = sentiment.analyze(messageText);
    const score = analysis.score;
    
    let mood;
    if (score <= -3) mood = "sad";
    else if (score <= -1) mood = "unfocused";
    else if (score === 0) mood = "neutral";
    else if (score <= 2) mood = "calm";
    else if (score <= 4) mood = "hopeful";
    else mood = "happy";
    
    const lowerText = messageText.toLowerCase();
    if (lowerText.includes("hope") || lowerText.includes("optimistic")) {
        mood = mood === "sad" || mood === "unfocused" ? "mixed" : "hopeful";
    }
    
    return { summary, mood };
}

// Save journal entry
function saveJournalEntry(messages, timestamp, image = null) {
    try {
        const { summary, mood } = summarizeChat(messages);
        const entry = {
            summary,
            mood,
            timestamp: timestamp || new Date(),
            id: Date.now(),
            image
        };
        
        journalEntries.push(entry);
        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
        renderJournal();
        updateMoodChart();
    } catch (error) {
        console.error('Failed to save journal entry:', error);
        alert('Error saving journal entry. Please try again.');
    }
}

// Render journal entries
function renderJournal() {
    if (!journalEntriesContainer) {
        console.error('Journal entries container not found');
        return;
    }
    journalEntriesContainer.innerHTML = '';
    journalEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('journal-entry');
        entryElement.innerHTML = `
            <h4>${new Date(entry.timestamp).toLocaleDateString()}</h4>
            <p class="mood">Mood: ${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</p>
            <p>${entry.summary}</p>
            ${entry.image ? `<img src="${entry.image}" alt="Journal Drawing" style="max-width: 200px; margin-top: 10px;" />` : ''}
        `;
        journalEntriesContainer.appendChild(entryElement);
    });
}

// Clear journal
clearJournalBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your journal? This cannot be undone.')) {
        journalEntries = [];
        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
        renderJournal();
        updateMoodChart();
    }
});

// Mood tracking chart
const moodChart = new Chart(moodChartCanvas, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Mood Score',
            data: [],
            borderColor: 'var(--primary)',
            backgroundColor: 'rgba(138, 43, 226, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 6,
                ticks: {
                    stepSize: 1,
                    callback: value => {
                        const moodLabels = ['Sad', 'Unfocused', 'Neutral', 'Calm', 'Hopeful', 'Happy', 'Mixed'];
                        return moodLabels[value] || '';
                    }
                },
                title: {
                    display: true,
                    text: 'Mood'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Update mood chart
function updateMoodChart() {
    const moodScores = {
        sad: 0,
        unfocused: 1,
        neutral: 2,
        calm: 3,
        hopeful: 4,
        happy: 5,
        mixed: 6
    };
    
    const sortedEntries = journalEntries.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const labels = sortedEntries.map(entry => new Date(entry.timestamp).toLocaleDateString());
    const data = sortedEntries.map(entry => moodScores[entry.mood] || 2);
    
    moodChart.data.labels = labels;
    moodChart.data.datasets[0].data = data;
    moodChart.update();
}

// Simulate chat session
function simulateChatSessionWithText(text) {
    try {
        const messages = [text];
        const botResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        saveJournalEntry(messages.concat([botResponse]), new Date());
        const lastResponse = botResponse;
        if (isVoiceOutputActive) speakText(lastResponse);
    } catch (error) {
        console.error('Error in simulateChatSessionWithText:', error);
    }
}

// Fetch crisis lines
function fetchCrisisLines() {
    const crisisLinesContainer = document.getElementById('crisisLines');
    crisisLinesContainer.innerHTML = '<p>Loading...</p>';
    
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const country = data.country_name;
            const crisisLines = {
                'United States': ['National Suicide Prevention Lifeline: 988', 'Crisis Text Line: Text HOME to 741741'],
                'United Kingdom': ['Samaritans: 116 123', 'Shout: Text SHOUT to 85258'],
                'Canada': ['Crisis Services Canada: 1-833-456-4566', 'Kids Help Phone: 1-800-668-6868'],
                'Default': ['International Suicide Hotlines: <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank">IASP Directory</a>']
            };
            
            const lines = crisisLines[country] || crisisLines['Default'];
            crisisLinesContainer.innerHTML = lines.map(line => `<p>${line}</p>`).join('');
        })
        .catch(() => {
            crisisLinesContainer.innerHTML = '<p><a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank">Find a local crisis line</a></p>';
        });
}

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
    initializeSentiment(); // Initialize sentiment after DOM load
    changeQuote();
    createMemoryGame();
    colorDots[0].style.transform = 'scale(1.2)';
    renderJournal();
    updateMoodChart();
    fetchCrisisLines();
    
    if (journalEntries.length === 0) {
        simulatedChats.forEach(chat => saveJournalEntry(chat.messages, chat.timestamp));
    }
    
    if (!recognition) {
        console.warn('Speech Recognition not supported. Falling back to text input.');
        const voiceBtn = document.querySelector('#voiceInputBtn');
        if (voiceBtn) {
            voiceBtn.disabled = true;
            voiceBtn.title = 'Voice input not supported. Please use the text input below.';
        }
    }

    // Verify button bindings
    if (!sendMessageBtn) {
        console.error('Send message button not found');
    }
    if (!chatInput) {
        console.error('Chat input not found');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});