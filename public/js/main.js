const modeButton = document.querySelector("#mode-button");
const pentatonicButton = document.querySelector("#ps-button");
const psButton = document.querySelector("#ps-button");

let exerciseChosen = false
let chosenScale = ""
let scale = null;
let keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', "A#", 'B']
let scales = ["Ionian", "Dorian", "Phyrgian", "Lydian", "Mixolydian", "Aeolian", "Locrian"]
let pentaScales = ["Dorian", "Phyrgian", "Mixolydian"]
let generatedScale = ``
let keyInfo = ``
let seconds = 5

let modeOptions = `
            <div class = "question-container">
                <span class = "question">Choose scale:</span>
            </div>
            <div class = "mode-options-container">
                <div class="mode-option-column">
                    <div class = "mode-scale-button-container">
                        <button class = "mode-scale-choice" id="ionian-button">Ionian</button>
                    </div>
                    <div class = "mode-scale-button-container">
                        <button class = "mode-scale-choice" id="dorian-button">Dorian</button>
                    </div>
                    <div class = "mode-scale-button-container">
                        <button class = "mode-scale-choice" id="phyrgian-button">Phyrgian</button>
                    </div>
                    <div class = "mode-scale-button-container">
                        <button class = "mode-scale-choice" id="lydian-button">Lydian</button>
                    </div>
                </div>
                <div class = "mode-options-column">
                    <div class = "mode-scale-button-container">
                        <button class = "mode-scale-choice" id="mixolydian-button">Mixolydian</button>
                    </div>
                    <div class = "mode-scale-button-container">
                        <button class = "mode-scale-choice" id="aeolian-button">Aeolian</button>
                    </div>
                    <div class = "mode-scale-button-container">
                        <button class = "mode-scale-choice" id="locrian-button">Locrian</button>
                    </div>
                    <div class = "mode-scale-button-container">
                        <button class = "mode-scale-choice" id="random-button">Random</button>
                    </div>
                </div>
            </div>
            <div class = "question-container">
                <span class = "question">Time between generations:</span>
            </div>
            <div class = "sleep-container" id="sleep-container">
                <input type = "number" class ="sleep-option" id="sleep-input" placeholder="5" value="5" max="10", min="1">
                <button class="sleep-option" id="submit-button">Start!</button>
            </div>
`

let pentatonicOptions = `
            <div class = "question-container">
                <span class = "question">Choose scale:</span>
            </div>
            <div class = "penta-options-container">
                <div class="penta-option-column">
                    <div class = "penta-scale-button-container">
                        <button class = "penta-scale-choice" id="dorian-button">Dorian</button>
                    </div>
                    <div class = "mode-scale-button-container">
                        <button class = "penta-scale-choice" id="phyrgian-button">Phyrgian</button>
                    </div>
                </div>
                <div class = "penta-options-column">
                    <div class = "penta-scale-button-container">
                        <button class = "penta-scale-choice" id="mixolydian-button">Mixolydian</button>
                    <div class = "penta-scale-button-container">
                        <button class = "penta-scale-choice" id="random-button">Random</button>
                    </div>
                </div>
            </div>
`

let display = `
    <div class="info-container" id="info-container">
        <div class="display-header-container">
            <div class = "scale-header-container">
                <h3 class = "scale-word">Scale</h3>
            </div>
            <br>
            <div class = "key-header-container">
                <h3 class = "key-word">Key</h3>
            </div>
        </div>
        <div class="generated-scales-container" id="generated-scales-container">
        </div>
    </div>
`

modeButton.addEventListener('click', async (e) => {
     // ✅ Clear old content before adding new elements
    document.querySelector("div#new-buttons-ui").innerHTML = "";
    document.querySelector("div#display-container").innerHTML = "";

    document.querySelector("div#new-buttons-ui").innerHTML = modeOptions;
    document.querySelector("div#display-container").innerHTML = display;

    exerciseChosen = true;

    // Add event listeners after elements exist
    document.querySelectorAll(".mode-scale-choice").forEach(button => {
        button.addEventListener("click", async (e) => {
            chosenScale = e.target.innerText;
            console.log(`${chosenScale} pressed`);
            document.querySelector("div#generated-scales-container").innerHTML = ""
        });
    });

    let submitButton = document.getElementById("submit-button");
        submitButton.addEventListener("click", async (e) => {
            seconds = document.getElementById("sleep-input").value
            document.querySelector("div#generated-scales-container").innerHTML = ""
            generateModeExercise(chosenScale);
        });
}); 

pentatonicButton.addEventListener('click', async (e) => {
    // ✅ Clear old content before adding new elements
   document.querySelector("div#new-buttons-ui").innerHTML = "";
   document.querySelector("div#display-container").innerHTML = "";

   document.querySelector("div#new-buttons-ui").innerHTML = pentatonicOptions;
   document.querySelector("div#display-container").innerHTML = display;

   exerciseChosen = true;

   // Add event listeners after elements exist
   document.querySelectorAll(".penta-scale-choice").forEach(button => {
       button.addEventListener("click", async (e) => {
           chosenScale = e.target.innerText;
           console.log(`${chosenScale} pressed`);
           document.querySelector("div#generated-scales-container").innerHTML = ""
           generatePentaExercise(chosenScale);
       });
   });
}); 


function shuffle(list) {
    let shuffled = list
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    return shuffled;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateModeExercise(scale) {
    let chosenKeys = [];
    let chosenScales = [];
    let shuffledKeys = shuffle(keys);
    let choice = scale;
    let loops = keys.length
    for (let i = 0; i < loops; i++) {
        let key = shuffledKeys[i];

        // Ensure unique keys
        if (!chosenKeys.includes(key)) {
            chosenKeys.push(key);
        }
        

        if (choice == "Random") {
            let shuffledScales = shuffle(scales);
            scale = shuffledScales[0];

            // Ensure repeat if all scales used
            if (chosenScales.length >= 7) {
                chosenScales = []
            }

            // while chosen scale is a repeat, keep shuffling
            while (chosenScales.includes(scale)) {
                let shuffledScales = shuffle(scales);
                scale = shuffledScales[0];
            }

            chosenScales.push(scale);
        }

        let generatedScaleHTML = `
            <div class ="pair-container">
                <div class="generated-scale-info-container">
                    <h3>${scale}</h3>
                </div>
                <div class="generated-key-info-container">
                    <h3>${key}</h3>
                </div>
            </div>
        `;

        document.querySelector("div#generated-scales-container").insertAdjacentHTML("beforeend", generatedScaleHTML);

        await sleep(seconds*1000);
    }
}

async function generatePentaExercise(scale) {
    let chosenKeys = [];
    let chosenScales = [];
    let shuffledKeys = shuffle(keys);
    let choice = scale;
    let loops = keys.length
    for (let i = 0; i < loops; i++) {
        let key = shuffledKeys[i];

        // Ensure unique keys
        if (!chosenKeys.includes(key)) {
            chosenKeys.push(key);
        }
        

        if (choice == "Random") {
            let shuffledScales = shuffle(pentaScales);
            scale = shuffledScales[0];

            // Ensure repeat if all scales used
            if (chosenScales.length >= 3) {
                chosenScales = []
            }

            // while chosen scale is a repeat, keep shuffling
            while (chosenScales.includes(scale)) {
                let shuffledScales = shuffle(pentaScales);
                scale = shuffledScales[0];
            }

            chosenScales.push(scale);
        }

        let generatedScaleHTML = `
            <div class ="pair-container">
                <div class="generated-scale-info-container">
                    <h3>${scale}</h3>
                </div>
                <div class="generated-key-info-container">
                    <h3>${key}</h3>
                </div>
            </div>
        `;

        document.querySelector("div#generated-scales-container").insertAdjacentHTML("beforeend", generatedScaleHTML);

        await sleep(seconds*1000);
    }
}