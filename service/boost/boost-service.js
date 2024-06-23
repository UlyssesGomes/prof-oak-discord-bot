 //import { calcExceptionBoost, calcNormalBoost } from "./boost-utils.js";
//const f = require("./boost-utils");

// Calculate boost for normal stones (feather, fire, water, ice ...) 
export function calcNormalBoost(initBoost, endBoost, boostType, stonePrice, boostStonePrice) {
    let responseBoost = {
        price: Number,
        normal_stones: Number,
        boost_stones: Number,
        boost: Number
    };
    let usedNormalStones = 0;
    let usedBoostStones = 0;
    let stonesForBoost = 0;

    for (let i = 0; i <= initBoost; i++) {
        if (i % boostType === 0) stonesForBoost++;
    }

    for (let i = initBoost + 1; i <= endBoost; i++) {
        if ((stonesForBoost * stonePrice) < boostStonePrice) {
            usedNormalStones += stonesForBoost;
        } else {
            usedBoostStones++;
        }

        if (i % boostType == 0 && i != initBoost) stonesForBoost++;

        responseBoost = {
            price: (usedNormalStones * stonePrice) + (usedBoostStones * boostStonePrice),
            normal_stones: usedNormalStones,
            boost_stones: usedBoostStones,
            boost: i
        };
    }

    return responseBoost;
}

// Calculate boost for special stones (ancient, metal, crystal) 
export function calcExceptionBoost(initBoost, endBoost, boostType, stonePrice, boostStonePrice) {
    let responseBoost  = {
        price: Number,
        normal_stones: Number,
        boost_stones: Number,
        boost: Number
    };
    let usedNormalStones = 0;
    let usedBoostStones = 0;
    let stonesForBoost = 1;

    for (let i = 1; i <= initBoost; i++) {
        if (i < 10) continue;
        if (i % boostType === 0) stonesForBoost++;
    }

    for (let i = initBoost + 1; i <= endBoost; i++) {
        if (i < 10) {
            if (!(i % 2 === 0)) {
                responseBoost = {
                    price: null,
                    normal_stones: null,
                    boost_stones: null,
                    boost: i
                };

                continue;
            }

            if ((stonesForBoost * stonePrice) < boostStonePrice) {
                usedNormalStones += stonesForBoost;
            } else {
                usedBoostStones++;
            }

            responseBoost = {
                price: (usedNormalStones * stonePrice) + (usedBoostStones * boostStonePrice),
                normal_stones: usedNormalStones,
                boost_stones: usedBoostStones,
                boost: i
            };

            continue;
        }

        if ((stonesForBoost * stonePrice) < boostStonePrice) {
            usedNormalStones += stonesForBoost;
        } else {
            usedBoostStones++;
        }

        if (i % boostType === 0) stonesForBoost++;

        responseBoost = {
            price: (usedNormalStones * stonePrice) + (usedBoostStones * boostStonePrice),
            normal_stones: usedNormalStones,
            boost_stones: usedBoostStones,
            boost: i
        };
    }

    return responseBoost;
}

export function boostCalculator(req, isSpecial) {
    const initialBoost = req.body.data.options[0].value;
    const endBoost = req.body.data.options[1].value;
    const boostType = req.body.data.options[2].value;
    const stonePrice = req.body.data.options[3]?.value ? req.body.data.options[3]?.value : 0;
    const boostStonePrice = req.body.data.options[4]?.value ? req.body.data.options[4]?.value : 9999999;

    let response;

    if (endBoost <= initialBoost) {
        response = 'desired-boost must be greater than current-boost.';
    }
    else if (endBoost > 50) {
        reponse = 'desired-boost cant be greater than 50.';
    }
    else if (initialBoost < 0) {
        response = 'current-boost cant be negative.';
    }
    else {
        let result;

        if (isSpecial) {
            result = calcExceptionBoost(initialBoost, endBoost, boostType, stonePrice, boostStonePrice);
        }
        else {
            result = calcNormalBoost(initialBoost, endBoost, boostType, stonePrice, boostStonePrice);
        }

        let stones = `Total Stones: ${result.normal_stones}\n`;
        let boostStones = `Total Boost Stones: ${result.boost_stones}\n`;
        let totalPrice = `Total price: $ ${result.price}`;

        response = `For Boost(${boostType}) upgrade from ${initialBoost} to ${endBoost}\n\n`;
        response += result.normal_stones > 0 ? stones : '';
        response += result.boost_stones > 0 ? boostStones : '';
        response += result.price > 0 ? totalPrice : '';
    }

    return response;
}

