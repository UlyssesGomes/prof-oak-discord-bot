import  fs from 'fs';

export function readProfessorCraftFile() {
    fs.readFile('./job-file/professor.txt', (err, data) => {
        if (err) throw err;


        const message3 = `@rank e
-empty vase
time | 300
earth ball | 100
stone orb | 3
-minor seed bag
time | 1
seed | 200
@rank d
-pokédex chip 2.0
time | 64800
magnet | 20
screw | 200
nature energy | 10
-condensed grass
time | 1
pure Grass | 100
-nature energy
time | 1
pure Grass | 100
@rank c
-pokédex chip 3.0
time | 86400
pokédex chip 2.0 | 1
smartphone | 1
steelix tail | 2
nature energy | 80
-major seed bag
time | 1
minor seed bag | 10
leaves | 25
bag of pollen | 20
@rank b
-chilan seed
time | 1800
major seed bag | 1
condensed grass | 20
cow tail | 6
-babiri seed
time | 1800
major seed bag | 1
condensed grass | 20
metal hull | 5
-colbur seed
time | 1800
major seed bag | 1
condensed grass | 20
hyena tail | 7
-roseli seed
time | 1800
major seed bag | 1
condensed grass | 20
cure flower | 7
-haban seed
time | 1800
major seed bag | 1
condensed grass | 20
dragon tail | 2
-kasib seed
time | 1800
major seed bag | 1
condensed grass | 20
miss trace | 3
-charti seed
time | 1800
major seed bag | 1
condensed grass | 20
strange rock | 6
-tanga seed
time | 1800
major seed bag | 1
condensed grass | 20
scythe | 1
-payapa seed
time | 1800
major seed bag | 1
condensed grass | 20
strange wing | 6
-coba seed
time | 1800
major seed bag | 1
condensed grass | 20
colored feather | 6
-shuca seed
time | 1800
major seed bag | 1
condensed grass | 20
armadillo claw | 7
-kebia seed
time | 1800
major seed bag | 1
condensed grass | 20
poisonous tail | 8
-chople seed
time | 1800
major seed bag | 1
condensed grass | 20
belt of champion | 1
-yache seed
time | 1800
major seed bag | 1
condensed grass | 20
ice blocks | 10
-rindo seed
time | 1800
major seed bag | 1
condensed grass | 20
greens | 8
-wacan seed
time | 1800
major seed bag | 1
condensed grass | 20
sheep wool | 8
-passho seed
time | 1800
major seed bag | 1
condensed grass | 20
red scale | 8
-occa seed
time | 1800
major seed bag | 1
condensed grass | 20
hot fur | 8
`;

       
        //const message = data.toString();
        const ranks = message3.match(/@[A-Za-z]+ [A-Za-z]\s((-[a-zà-ú]+( [a-z0-9.]+)*)\s(([A-Za-zà-ú0-9.]+ )+\| [0-9]+\s)+)+/g);

        console.log('tokens', ranks);
    });
}
