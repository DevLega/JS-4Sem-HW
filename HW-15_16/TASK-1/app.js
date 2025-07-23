const input = document.getElementById("search");
const result = document.getElementById("search-results");

const fetchCountries = (searchQuery) => {
  const url = `https://restcountries.com/v3.1/name/${searchQuery}`;
  fetch(url)
    .then((response) => response.json())
    .then(process);
};

const process = (data) => {
  console.log(data);
  const dataLen = data.length;

  result.innerHTML = "";

  if (dataLen > 10) {
    PNotify.error({
      text: "Too many matches found. Please enter a more specific query!",
    });
    return;
  }

  if (dataLen > 1) {
    const ul = document.createElement("ul");
    ul.id = "suggestions";

    data.forEach((country) => {
      const li = document.createElement("li");
      li.textContent = country.name.common;
      ul.appendChild(li);
    });

    result.appendChild(ul);

    return;
  }

  if (dataLen === 1) {
    const countryName = data[0].name.common;
    const capital = data[0].capital;
    const popul = data[0].population;
    const languages = data[0].languages;

    const langList = Object.values(languages)
    .map(lang => `<li>${lang}</li>`)
    .join("");

    const flag = data[0].flags.svg;

    result.innerHTML = `
            <h1 id="country-name">${countryName}</h1>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${popul}</p>
            <p><strong>Languages:</strong></p>
            <ul>${langList}</ul>
            <img id="flag" class="country-flag" src="${flag}">
        `;

    return;
  }

  PNotify.error({
      text: "No results found for your query",
  });
};

input.addEventListener(
  "input",
  _.debounce(() => {
    fetchCountries(input.value);
  }, 500)
);
