const currentDate = new Date();
const todayDate = currentDate.getDate();
const todayMonth = currentDate.getMonth() + 1;
const todayYear = currentDate.getFullYear();

const padZero = (num) => (num < 10 ? "0" + num : num);

const minimumDate = `${todayYear - 55}-${padZero(todayMonth)}-${padZero(todayDate)}`;
const maximumDate = `${todayYear - 18}-${padZero(todayMonth)}-${padZero(todayDate)}`;

document.getElementById("dob").setAttribute("min", minimumDate);
document.getElementById("dob").setAttribute("max", maximumDate);

const formElement = document.getElementById("user-form");
const entriesKey = "user-entries";

const retrieveEntries = () => {
    const storedEntries = JSON.parse(localStorage.getItem(entriesKey)) || [];
    return storedEntries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableRows = entries
        .map((entry) => {
            const cells = Object.values(entry).map(
                (value) => `<td style="border: 1px solid green; padding: 4px;">${value}</td>`
            );
            return `<tr>${cells.join("")}</tr>`;
        })
        .join("\n");

    const table = `<table style="width: 100%; border-collapse: collapse;">
        <tr>
            <th style="border: 1px solid green; padding: 4px;">Name</th>
            <th style="border: 1px solid green; padding: 4px;">Email</th>
            <th style="border: 1px solid green; padding: 4px;">Password</th>
            <th style="border: 1px solid green; padding: 4px;">Dob</th>
            <th style="border: 1px solid green; padding: 4px;">Accepted terms?</th>
        </tr>${tableRows}</table>`;

    document.getElementById("user-entries").innerHTML = table;
};

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions =
        document.getElementById("acceptTerms").checked;

    if (password.length < 8) {
        document.getElementById("error").innerHTML ="Password should be at least 8 characters";
        document.getElementById("error").classList.remove("hidden");
        document.getElementById("error").classList.add("visible");
        return;
    } else {
        if (document.getElementById("error").classList.contains("visible")) {
            document.getElementById("error").classList.remove("visible");
            document.getElementById("error").classList.add("hidden");
        }
        const entry = {
            name,
            email,
            password,
            dob,
            acceptedTermsAndConditions,
        };

        userEntries.push(entry);

        localStorage.setItem(entriesKey, JSON.stringify(userEntries));
        displayEntries();
    }
};

formElement.addEventListener("submit", saveUserForm);
displayEntries();
