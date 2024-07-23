const npcMerchant = {
    0: '**Cerulean** (30619, 20291, 4) next to NPC Hugo, in a build next to Poke Center at second floor.',              // sunday
    1: '**Pewter** (30336, 20329, 5) Between the Pokémon Center access and NPC Mark, to the north.',                    // monday
    2: '**Viridian** (30306, 20536, 5) At the location of the old Viridian NPC Mark.',                                  // tuesday
    3: '**Fucshia** (30697, 20761, 5) At the north exit of Resistencia, near the sewer entrance.',                      // wednesday
    4: '**Cinnabar** (30357, 20690, 10) At the entrance to the Darkrai Minion respawn in the Resistance underground.',  // thursday
    5: '**Pallet** (30295, 20617, 5) Inside the Pokémon Center, on the left to the north.',                             // friday
    6: '**Lavender** (30830, 20468, 5) In a house in the south of the city, to the left of NPC Mark.'                   // saturday
};

const npcDuke = {
    0: '**Pewter** (30304, 20351, 5).',     // sunday
    1: '**Lavender ** (30838, 20439, 5).',  // monday
    2: '**Cerulean ** (30569, 20236, 5).',  // tuesday
    3: '**Fuschia** (30750, 20727, 5).',    // wednesday
    4: '**Cinnabar** (30309, 20707, 5).',   // thursday
    5: '**Viridian** (30250, 20506, 5).',   // friday
    6: '**Pallet** (30304, 20629, 5).'      // saturday
};

export function whereIsMerchant() {
    return `Today Merchant position is in ${npcMerchant[getWeekDay()]}`;
}

export function whereIsDuke() {
    return `Today Duke position is in ${npcDuke[getWeekDay()]}`;
}

function getWeekDay() {
    const date = new Date();
    const hour = date.getHours();

    if(hour < 7) {
        if(date.getDay() > 0)
            return date.getDay() - 1;
        else {
            return 6;
        }
    }

    return date.getDay();
}