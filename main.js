const fetchTemplate = async () => {
    try {
        const response = await fetch('assets/template.html');
        //console.log('Response status:', response.status);
        //console.log('Response headers:', response.headers);
        const templateHTML = await response.text();
        //console.log('Template HTML:', templateHTML);
        return templateHTML;
    } catch (error) {
        console.error('Error fetching template:', error);
    }
};


var ws = new WebSocket("ws://localhost:8080/");

function connectws() {
    if ("WebSocket" in window) {
     
      ws.onclose = function () {
        // "connectws" is the function we defined previously
        setTimeout(connectws, 10000);
      };
  
      //Enable all Events
      ws.onopen = function () {
        ws.send(JSON.stringify(
          {
            "request": "Subscribe",
            "events": {
            //   "Raw": [
            //     "Action"
            //   ],
              "General": [
                "Custom"
              ]
            },
            "id": "123"
          }
        ));      
      };
  
      ws.onmessage = function (event) {
        // grab message and parse JSON
        const msg = event.data;
        const wsdata = JSON.parse(msg);
  
        console.log(wsdata);

        if(wsdata.event && wsdata.event.type === 'Custom'){
            //Convert Serialised JSON to Object
            //console.log(wsdata.data.data);
            let data = JSON.parse(wsdata.data.data);
            //console.log(data);
            //generateCard(data, fetchTemplate());
            data = processCardData(data);
            generateCard(data, fetchTemplate());
        }
      };
    }
}

function formatDate(dateString) {
    // Parse the date string into a Date object
    var date = new Date(dateString);

    // Month names array
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get the day, month, and year from the Date object
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    // Get the ordinal suffix for the day (st, nd, rd, th)
    var suffix = getOrdinalSuffix(day);

    // Format the date in the desired format
    var formattedDate = day + suffix + " " + monthNames[month] + " " + year;

    return formattedDate;
}

// Function to get the ordinal suffix for a given day
function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
        return "th";
    }
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}


const generateCard = async (data) => {
    const container = document.querySelector('#card-container');

    const template = await fetchTemplate();
    let cardHTML = template;
    data.forEach(item => {
        cardHTML = cardHTML.replace(/\${(.*?)}/g, (match, token) => {
            console.log('Match:', match, 'Token:', token, 'Item:', item[token]);
            const key = token.trim();
            if(!item[key]) {
                switch (token) {
                    case 'tagLine':
                        return 'Basic Bitch';
                    default:
                        return '';
                } 
            }

            if(token === "cardBackground"){return backgrounds[item[key]]}

            return item[key];
        });
    });

    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = cardHTML;
    container.appendChild(card);

    //gsap.to(card, {duration: 1, scale: 0.75, x: innerWidth/2, y: innerHeight/2});
};


const cardTypes = ['fire', 'fighting', 'dragon', 'lightning', 'grass', 'metal', 'water', 'psychic', 'darkness', 'colorless', 'fairy'];
const backgrounds = {
    "beach-wartortle": "beach-wartortle.jpg",
    "blotchy-lass": "blotchy-lass.jpg",
    "circuit-board-porygon": "circuit-board-porygon.jpg",
    "cool-flames-hitmonchan": "cool-flames-hitmonchan.jpg",
    "cool-flames-machop": "cool-flames-machop.jpg",
    "electrify-pikachu": "electrify-pikachu.jpg",
    "filenames": "filenames.txt",
    "flames-magmar": "flames-magmar.jpg",
    "flowers-erikas-ivysaur": "flowers-erikas-ivysaur.jpg",
    "flowers-venomoth": "flowers-venomoth.jpg",
    "foliage-erikas-gloom": "foliage-erikas-gloom.jpg",
    "hills-ponyta": "hills-ponyta.jpg",
    "leaf-potion-energy": "leaf-potion-energy.jpg",
    "leather-bgpng": "leather-bgpng.jpg",
    "lightning-electabuzz": "lightning-electabuzz.jpg",
    "lightning-surges-raichu": "lightning-surges-raichu.jpg",
    "lights-drowzee": "lights-drowzee.jpg",
    "lights-erikas-dratini": "lights-erikas-dratini.jpg",
    "lights-gb-magnemite": "lights-gb-magnemite.jpg",
    "lights-gb-moltres": "lights-gb-moltres.jpg",
    "lights-gb-zapdos": "lights-gb-zapdos.jpg",
    "lights-jynx": "lights-jynx.jpg",
    "lights-kadabra": "lights-kadabra.jpg",
    "lights-magby": "lights-magby.jpg",
    "lights-mr-mime": "lights-mr-mime.jpg",
    "lights-pichu": "lights-pichu.jpg",
    "lights-promo-persian": "lights-promo-persian.jpg",
    "lights-rocket-alakazam": "lights-rocket-alakazam.jpg",
    "lights-rocket-machop": "lights-rocket-machop.jpg",
    "lights-sabrinas-slowbro": "lights-sabrinas-slowbro.jpg",
    "lights-sabrinas-slowbro2": "lights-sabrinas-slowbro2.jpg",
    "lights-skarmory": "lights-skarmory.jpg",
    "lights-vending-mew": "lights-vending-mew.jpg",
    "lights-vulpix": "lights-vulpix.jpg",
    "metal-surges-raichu": "metal-surges-raichu.jpg",
    "nature-brocks-diglett": "nature-brocks-diglett.jpg",
    "nature-brocks-graveler": "nature-brocks-graveler.jpg",
    "nature-brocks-vulpix": "nature-brocks-vulpix.jpg",
    "nature-brocks-zubat": "nature-brocks-zubat.jpg",
    "nature-caterpie": "nature-caterpie.jpg",
    "nature-charizard-cd": "nature-charizard-cd.jpg",
    "nature-dratini": "nature-dratini.jpg",
    "nature-erikas-bulbasaur": "nature-erikas-bulbasaur.jpg",
    "nature-growlithe": "nature-growlithe.jpg",
    "nature-miltank": "nature-miltank.jpg",
    "nature-mistys-poliwrath": "nature-mistys-poliwrath.jpg",
    "nature-nidoqueen": "nature-nidoqueen.jpg",
    "nature-nidoran": "nature-nidoran.jpg",
    "nature-onix": "nature-onix.jpg",
    "nature-parasect": "nature-parasect.jpg",
    "nature-pidgeotto": "nature-pidgeotto.jpg",
    "nature-pidgey": "nature-pidgey.jpg",
    "nature-pkmn-breeder": "nature-pkmn-breeder.jpg",
    "nature-sandshrew": "nature-sandshrew.jpg",
    "nature-scyther": "nature-scyther.jpg",
    "pastels-arbok": "pastels-arbok.jpg",
    "pastels-articuno": "pastels-articuno.jpg",
    "pastels-chansey": "pastels-chansey.jpg",
    "pastels-ekans": "pastels-ekans.jpg",
    "pastels-hitmonlee": "pastels-hitmonlee.jpg",
    "pastels-hitmonlee2": "pastels-hitmonlee2.jpg",
    "pastels-kabutops": "pastels-kabutops.jpg",
    "pastels-kabutops2": "pastels-kabutops2.jpg",
    "pastels-lass": "pastels-lass.jpg",
    "pastels-mew": "pastels-mew.jpg",
    "pastels-pkmn-trader": "pastels-pkmn-trader.jpg",
    "pastels-raticate": "pastels-raticate.jpg",
    "pastels-rockets-moltres": "pastels-rockets-moltres.jpg",
    "pastels-sabrinas-abra": "pastels-sabrinas-abra.jpg",
    "pastels-snorlax": "pastels-snorlax.jpg",
    "rust-erikas-gloom": "rust-erikas-gloom.jpg",
    "sunset-oddish": "sunset-oddish.jpg",
    "tangela-gym": "tangela-gym.jpg",
    "trainer": "trainer.jpg",
    "walls-bill": "walls-bill.jpg",
    "walls-impostor-oak": "walls-impostor-oak.jpg",
    "walls-professor-oak": "walls-professor-oak.jpg",
    "walls-professor-oak2": "walls-professor-oak2.jpg",
    "water-mistys-seel": "water-mistys-seel.jpg",
    "water-poliwhirl": "water-poliwhirl.jpg",
    "water-seaking": "water-seaking.jpg",
    "water-seel": "water-seel.jpg",
};




const data = [{
    userName: 'GForce_Aus',
    userType: 'affiliate',
    followDate: '2021-09-01',
    isSub: false,
    isMod: false,
    isVip: false,
    avatarUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/0e1e8b6e-2b8e-4b8f-8f4c-1c0b9f7d9d7a-profile_image-300x300.png',
    chatCount: 100,
    streamCount: 10,
    tracksRatd: 5,
    cardType: 'water',
    cardBackground: 'beach-wartortle',
    cardTagLine: '',
}];



// const moveslist = (
//     views: {

//     }
// )


// //Streams
// Teleport
// Pounce
// Supersonic


// //Chat
// Hide in Shell
// Stomp
// Swords Dance

// //Tracks Rated
// Agillity
// Fury Swipes
// Selfdestruct

function processCardData(data) {
    if(!data[0].userType) {
        data[0].userType = 'Viewer';
        data[0].indentType = '--basic';
        data[0].showAffiliate = 'hide';
        data[0].showPartner = 'hide';
    }

    if(data[0].userType === 'affiliate') {
        data[0].userType = '';
        data[0].indentType = '--indented';
        data[0].showPartner = 'hide';
        data[0].showViewer = 'hide';
    }

    if(data[0].userType === 'partner') {
        data[0].userType = '';
        data[0].indentType = '--indented';
        data[0].showAffiliate = 'hide';
        data[0].showViewer = 'hide';
    }

    data[0].cardType ? {} : data[0].cardType = 'colorless';


    data[0].followDate ? data[0].followDate = formatDate(new Date(data[0].followDate)) : data[0].followDate = "Unknown";
       

    console.log(data);

    return data;

}


function init() {
    gsap.registerPlugin(MotionPathPlugin);
    connectws();


    // let cardData = `[{"userName":"GForce_Aus","userType":"","game":" - Music","userId":"1234123123","followDate":"2021-09-01","isSub":false,"isMod":false,"isVip":false,"avatarUrl":"https://static-cdn.jtvnw.net/jtv_user_pictures/07628ed7-5541-48bc-a05b-e27d116d49dd-profile_image-300x300.png","chatCount":100,"streamCount":10,"tracksRated":5,"cardType":"water","cardBackground":"black","tagLine":""}]`;
    // const tempdata = JSON.parse(cardData);
    // generateCard(tempdata, fetchTemplate());

}



init();


