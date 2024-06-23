const heldInfo = {
    'x-attack': [
        '8%', '12%', '16%', '19%', '22%', '25%', '28%', '31%', 'N/A'
    ],
    'x-boost': [
        12, 16, 20, 24, 28, 32, 36, 'N/A', 'N/A'
    ],
    'x-critical': [
        '8%', '10%', '12%', '14%', '16%', '20%', '24%', '27%', 'N/A'
    ],
    'x-defense': [
        '8%', '10%', '12%', '14%', '16%', '20%', '24%', '27%', 'N/A'
    ],
    'x-block': [
        '6%', '8%', '10%', '12%', '14%', '18%', '22%', '25%', 'N/A'
    ],
    'x-vitality': [
        '5%', '8%', '12%', '15%', '19%', '22%', '25%', 'N/A', 'N/A'
    ],
};

export function heldRemove(heldTier) {

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

export function heldInfo() {

}

export function heldFusion() {

}