// clear local storage and reset default passwordOptions + getRandomPassword
window.onload = function () {
    localStorage.clear();
    updatePasswordOptions();
    // get new password on page load
    getRandomPassword();
}


// create checkboxes and labels to allow the user change the password options
const passwordOptions = document.getElementById('pass-btn');
passwordOptions.style.display = 'flex';
passwordOptions.style.flexDirection = 'column-reverse';
passwordOptions.style.alignItems = 'center';
passwordOptions.style.justifyContent = 'center';
passwordOptions.style.border = '1px solid black';
passwordOptions.style.borderRadius = '5px';
passwordOptions.style.minWidth = '500px';
passwordOptions.style.maxWidth = '500px';
passwordOptions.style.overflow = 'auto';
passwordOptions.style.height = '200px';
passwordOptions.style.backgroundColor = 'lightgray';
passwordOptions.style.boxShadow = '0 0 10px 0 rgba(0, 0, 0, 0.5)';
passwordOptions.style.margin = '0 auto';
passwordOptions.style.marginTop = '1rem';
passwordOptions.style.padding = '1rem';
passwordOptions.id = 'passwordOptions';
passwordOptions.innerHTML += `
            <div id="password"></div>
            <div id="checkbox">
                <input type="checkbox" id="includeUppercase" checked>
                <label for="uppercase">Uppercase</label>
                <input type="checkbox" id="includeLowercase" checked>
                <label for="lowercase">Lowercase</label>
                <input type="checkbox" id="includeNumbers" checked>
                <label for="numbers">Numbers</label>
                <input type="checkbox" id="includeSymbols" checked>
                <label for="symbols">Symbols</label>
            </div>
        `;
document.body.appendChild(passwordOptions);

// create variables and event listeners for the checkboxes    
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');

includeUppercase.addEventListener('change', () => {
    updatePasswordOptions();
});
includeLowercase.addEventListener('change', () => {
    updatePasswordOptions();
});
includeNumbers.addEventListener('change', () => {
    updatePasswordOptions();
});
includeSymbols.addEventListener('change', () => {
    updatePasswordOptions();
});

// update passwordOptions
function updatePasswordOptions() {
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const passwordOptions = {
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
    };
    localStorage.setItem('passwordOptions', JSON.stringify(passwordOptions));
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!#$%^&*()_[]=+';
    return symbols[Math.floor(Math.random() * symbols.length)];
}


// use passwordOptions to generate a random password
function getRandomPassword() {
    const passwordOptions = JSON.parse(localStorage.getItem('passwordOptions'));
    const includeUppercase = passwordOptions.includeUppercase;
    const includeLowercase = passwordOptions.includeLowercase;
    const includeNumbers = passwordOptions.includeNumbers;
    const includeSymbols = passwordOptions.includeSymbols;
    const passwordLength = slider.value;
    let password = '';
    const typesCount = includeUppercase + includeLowercase + includeNumbers + includeSymbols;
    const typesArr = [{ includeUppercase }, { includeLowercase }, { includeNumbers }, { includeSymbols }].filter(item => Object.values(item)[0]);
    if (typesCount === 0) {
        return '';
    }
    for (let i = 0; i < passwordLength; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            password += randomFunc[funcName]();
        });
    }
    const passwordText = document.getElementById('password');
    passwordText.innerText = password;
}

// helper function for random password generation
const randomFunc = {
    includeUppercase: getRandomUpper,
    includeLowercase: getRandomLower,
    includeNumbers: getRandomNumber,
    includeSymbols: getRandomSymbol
};

// create password length slider
let slider = document.createElement("input");
slider.setAttribute("type", "range");
slider.setAttribute("min", "8");
slider.setAttribute("max", "24");
slider.setAttribute("value", "12");
slider.setAttribute("class", "slider");
slider.setAttribute("id", "myRange");
passwordOptions.appendChild(slider);

// display the current value of the slider
let p = document.createElement("p");
p.setAttribute("id", "length");
p.innerHTML = "Password Length: " + slider.value;
passwordOptions.appendChild(p);

// keep the slider value updated
slider.oninput = function () {
    p.innerHTML = "Password Length: " + this.value;
}


