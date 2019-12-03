const Drillholes = require('../models/drillholes');
const {
    DEFAULT_SEARCH_FIELD,
    DEFAULT_PAGE_REQUESTED,
    DEFAULT_PAGE_SIZE,
    SORT_VALUE,
    SORT_TYPE_ORDER
} = require('../utils/constants')

// generate new data of drill holes to database
function addHoles() {      
    let dataArry= [{
        holesId:'hole001',
        latitude:35.08,
        longitude:150.95,
        dip:80,
        azimuth:80,
        depthReading:[], 
    },
    {holesId:'hole002',
        latitude:45.00,
        longitude:130.00,
        dip:75,
        azimuth:76,
        depthReading:[],
    },
    {holesId:'hole003',
        latitude:65.00,
        longitude:110.00,
        dip:68,
        azimuth:70,
        depthReading:[],
    } 
];
    for (let i=0;i<dataArry.length;i++) {        
        for (let j = 1; j <= 100; j++) {
            let depthData= {
                depth: j,
                dip:dataArry[i].dip+3*Math.floor((Math.random() * 10) + 1)/10*( Math.random() < 0.5 ? -1 : 1),
                azimuth:dataArry[i].azimuth+5*Math.floor((Math.random() * 10) + 1)/10*( Math.random() < 0.5 ? -1 : 1)
            }
            dataArry[i].depthReading.push(depthData);          
        }
    } 
return dataArry;   
}
// get all holes data 
async function getAllHoles(req, res) { 

    const documents = addHoles();

    return res.json({ documentCount:documents.length, documents });
}

async function getHoleById(req, res) {
    const { id } = req.params;    
    const documents = addHoles()
    const hole=documents.find(
        element => element.holesId ===id
        );    
    if (!hole) {
        return res.status(404).json('Hole is not found');
    }
    return res.json(hole);
}


async function updateHole(req, res) {
    const { id } = req.params;  
    const documents = addHoles()
    const hole=documents.find(
        element => element.holesId ===id
        );
    return res.json(hole);
}
module.exports = {
    getAllHoles,
    getHoleById,
    addHoles,
    updateHole,
};