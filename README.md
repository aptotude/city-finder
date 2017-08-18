# Apto City Finder
This module can be used to find all cities in a string. It finds all
"city, state" pairs and returns them in a uniform format.


### Example
```javascript
const cityFinder = require('apto-city-finder');

const str = 'I saw a cat in Des Moines, Iowa.';
const cities = cityFinder.findCities(str);

// cities = { city: 'Des Moines', state: 'IA' }
```
