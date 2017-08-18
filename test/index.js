const chai = require('chai');
const expect = chai.expect;

const cityFinder = require('../');

describe('index.js', function() {
    describe('findCities()', function() {
        it('returns discovered cities and states', function() {
            const cities = cityFinder.findCities(`Four facts to consider:
                The median price of an existing single family home in Orange County was $795,000 in June 2017, according to the California Association of Realtors.
                The median price of an existing single family home in Riverside County was $385,000.
                Riverside, Calif., is 37 miles from Irvine, but commute times approach 90 minutes each way.
                The Autopilot-capable Tesla Model 3 was first delivered to buyers on July 28, 2017.
                These four facts might seem unrelated, but they all relate to one simple question: how long are you willing to sit behind the wheel commuting to work? People in Riverside County will spend hours commuting, people in Des Moines, Iowa spend an average of 19.7 minutes, those in Nashville spend an average of 26 minutes, and people in Portland spend around 24.1 minutes driving alone.
                In many cities, those who take commuter rail or ferries spend twice as long commuting as drivers, on average.. That statistic is the key to why autonomous vehicle technology is so transformational. People who don’t have to drive will spend longer getting to work. After all, if you can start your work day the second you walk out of your front door, why not have a longer commute? Time on the train, the ferry, or in a truly autonomous vehicle, can be just as productive as desk time or, in some cases, even more.
                While ferries and rail are options for people in some major markets, in the near future, anyone who can afford a moderately priced new car will be able to have it drive them to and from work. With just a little bit of flexibility on the part of their employer, they will be able to live farther away from work and spend the commute to and from the office working from their car’s back seat as it does the driving for them.
                As people realize that they can live in the mountains, on a lake or in a pristine desert and work downtown, regardless of the commute time, it’s reasonable to expect that they will take advantage of this opportunity. As such, it is likely that we will see an increase in exurban and rural populations due to the fact that people can commute farther while it is unlikely that this trend will spur companies to move to outlying areas like we have seen in past migrations, since the whole impetus for this move is easier long-distance commuting.
                The impact of autonomous vehicles on the commercial real estate sector is more likely to be seen in the areas of neighborhood office, local retail, and the like. After all, while you might be willing to spend a couple of hours of your workday having your car drive you to and from work, you’re much less likely to have your car drive you that same distance for a routine doctor’s appointment or to buy a gallon of milk.
                The ‘work-live-play’ neighborhood is still a goal that many urban leaders aspire to achieve. However, as autonomous vehicles merge commuting time into the work day, the need to blend work with life and play goes away. As such, the future could create more communities where people live and play, but don’t necessarily work. This scenario creates opportunities for commercial real estate investors with a long horizon to strategically invest in markets within a 50 to 75 mile radius of major employment centers. After all, these fringe markets could be tomorrow’s bedrooms and playrooms.`
            );

            expect(cities[0].city).to.eq('Riverside');
            expect(cities[0].state).to.eq('CA');

            expect(cities[1].city).to.eq('Des Moines');
            expect(cities[1].state).to.eq('IA');
        });
    });
});
