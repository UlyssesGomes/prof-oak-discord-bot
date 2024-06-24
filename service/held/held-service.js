const xHeldInfo = {
    'attack': [
        '8%', '12%', '16%', '19%', '22%', '25%', '28%', '31%', 'N/A'
    ],
    'boost': [
        '12', '16', '20', '24', '28', '32', '36', 'N/A', 'N/A'
    ],
    'critical': [
        '8%', '10%', '12%', '14%', '16%', '20%', '24%', '27%', 'N/A'
    ],
    'defense': [
        '8%', '10%', '12%', '14%', '16%', '20%', '24%', '27%', 'N/A'
    ],
    'block': [
        '6%', '8%', '10%', '12%', '14%', '18%', '22%', '25%', 'N/A'
    ],
    'vitality': [
        '5%', '8%', '12%', '15%', '19%', '22%', '25%', 'N/A', 'N/A'
    ],
    'harden': [
        '4%', '7%', '10%', '13%', '16%', '19%', '22%', 'N/A', 'N/A'
    ],
    'lucky': [
        '10%', '20%', '35%', '50%', '65%', '80%', '100%', 'N/A', '150%'
    ],
    'experience': [
        '10%', '15%', '20%', '25%', '30%', '35%', '40%', 'N/A', 'N/A'
    ],
    'accuracy': [
        '20%', '25%', '30%', '35%',	'40%', '45%', '50%', 'N/A', 'N/A'
    ],
    'return': [
        '2.5%', '3%', '4%',	'5%', '6%', '7%', '9%', 'N/A', 'N/A'
    ],
    'poison': [
        '90%', '125%', '160%', '195%', '230%', '265%', '300%', 'N/A', 'N/A'
    ],
    'hellfire': [
        '90%', '125%', '160%', '195%', '230%', '265%', '300%', 'N/A', 'N/A'
    ],
    'rage': [
        '10%', '20%', '30%', '40%', '50%', '70%', '100%', 'N/A', 'N/A'
    ],
    'strafe': [
        '10%', '20%', '30%', '40%', '50%', '70%', '100%', 'N/A', 'N/A'
    ],
    'agility': [
        '8%', '14%', '20%', '30%', '40%', '50%', '60%', 'N/A', 'N/A'
    ],
    'haste': [
        '60', '85', '110', '135', '170', '205', '250', 'N/A', 'N/A'
    ],
    'elemental': [
        '8%', '10%', '12%', '14%', '17%', '19%', '22%', 'N/A', 'N/A'
    ]
};

const yHeldInfo = {
    'teleport': [
        '-5 min', '-7 min', '-10 min', '-15 min', '-20 min', '-25 min', '-27 min'
    ],
    'cure': [
        '20%', '30%', '50%', '70%', '80%', '90%', '100%'  
    ],
    'control': [
        '-40s', '-60s', '-80s', '-100s', '-120s', '-140s', '-160s'
    ],
    'regeneration': [
        '700/s', '1000/s', '1500/s', '2000/s', '3000/s', '4000/s', '5000/s'
    ],
    'wing': [
        '100 speed', '145 speed', '185 speed', '225 speed', '270 speed', '310 speed', '370 speed'
    ]
};

const heldFusionPrice = {
    1: '60k',
    2: '150k',
    3: '300k',
    4: '700k',
    5: '1kk',
    6: '1.5kk',
    7: '1.5kk' 
};

export function heldRemove(req) {

    const heldTier = req.body.data.options[0].value;

    if(heldTier <= 0 || heldTier >= 10)
        return 'Try held tier between 1 and 9.';
    
    let value;
    switch(heldTier)
    {
        case 1:
            value = '10k';
            break;
        case 2:
            value = '25k';
            break;
        case 3:
            value = '50k';
            break;
        case 4:
            value = '200k';
            break;
        case 5:
            value = '900k';
            break;
        case 6:
            value = '2.5kk';
            break;
        case 7:
            value = '5kk';
            break;
        case 8:
            value = '15kk';
            break;
        case 9:
            value = '30kk';
            break;
    }

    return `To remove held ${heldTier} from your pokemon you'll spend ${value}`;
}

export function heldInfo(req) {
    let heldName = req.body.data.options[0].value;
    const tier = req.body.data.options[1].value;

    if(heldName.startsWith('x-')) {
        heldName = heldName.substr(2);
    }
    else if(heldName.startsWith('y-')) {
        heldName = heldName.substr(2);
    }
    
    if(heldName in xHeldInfo) {
        if(tier < 1 || tier > 9) {
            return `Held tier ${tier} is invalid. Try tier between 1 and 9.`;
        }
        return `Held ${heldName.toUpperCase()} tier ${tier} bonus: ${xHeldInfo[heldName][tier-1]}.`;
    }
    
    if(heldName in yHeldInfo) {
        if(tier < 1 || tier > 7) {
            return `Held tier ${tier} is invalid. Try tier between 1 and 7.`;
        }
        return `Held ${heldName.toUpperCase()} tier ${tier} bonus: ${yHeldInfo[heldName][tier-1]}.`;
    }
    else {
        return `Held ${heldName} not founded. Try another one.`;
    }
}

export function heldFusion(req) {
    const tier = req.body.data.options[0].value;

    if(tier < 1 || tier > 7) {
        return `Tier ${tier} is invalid. Try tier between 1 and 7.`;
    }

    return `Fusion 3 helds tier ${tier} to tier ${tier+1} will cost ${heldFusionPrice[tier]}.`;
}