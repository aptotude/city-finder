const states = require('./lib/states');

const abbreviations = states.abbreviations;
const fullNames = states.fullNames;
const stateMappings = states.mappings;

/**
 * Finds all cities in a string and returns them as an array of objects with city and state properties.
 * @param {String} str The string to find cities in.
 * @return {Object[]} The found cities. Objects will have city and state properties.
 */
function findCities(str) {
    // Find all state abbreviations (CO, Co, C.O., C.o.). Example regex: /, ?C\.?[Oo][\. ]/
    const abbrRegex = abbreviations.map(abbreviation => {
        const prefix = ', ?';
        const first = abbreviation.charAt(0).toUpperCase();
        const second = '[' + abbreviation.charAt(1).toUpperCase() + abbreviation.charAt(1).toLowerCase() + ']';
        const regex = prefix + first + '\\.?' + second + '[\\. ]';
        return new RegExp(regex, 'g');
    });

    // Find all written state names and abbreviations (California, Calif.). Example regex: /, ?Cal[^ ]*/
    const fullRegex = fullNames.map(value => {
        const prefix = ', ?';
        const word = value.substring(0, 3);
        const regex = prefix + word + '[^ ]*';
        return new RegExp(regex, 'g');
    });

    // Find state matches
    const matches = [];
    const stateRegex = abbrRegex.concat(fullRegex);
    stateRegex.forEach(regex => {
        const match = regex.exec(str);

        if (match) {
            matches.push(match);
        }
    });

    // Look for consecutive proper nouns before each state which identifies the city's name
    const cities = [];
    matches.forEach(match => {
        const index = match.index;
        const before = str.substring(index - 100, index).split(/\s+/);

        // Work backwards until a proper noun is not found
        const parts = [];
        for (let i = before.length - 1; i >= 0; i--) {
            // Check if word starts with
            if (/[A-Z]/.test(before[i].substring(0,1))) {
                parts.unshift(before[i]);
            } else {
                break;
            }
        }

        cities.push({
            city: parts.join(' '),
            state: match.toString().replace(/\./g, '')
        });
    });

    // Make each state uniform and remove punctuation
    cities.forEach(city => {
        // Remove punctuation and leading/trailing whitespace
        city.state = city.state.replace(/[^A-Za-z ]/g, '').trim();

        if (city.state.length == 2) {
            // Uppercase two-letter abbreviations
            city.state = city.state.toUpperCase();
        } else {
            // Find complete state name and convert to two-letter code
            for (let i = 0; i < fullNames.length; i++) {
                if (fullNames[i].indexOf(city.state) === 0) {
                    city.state = fullNames[i];
                    city.state = Object.keys(stateMappings).find(key => stateMappings[key] === city.state);

                    break;
                }
            }
        }
    });

    return cities;
}

module.exports = { findCities };
