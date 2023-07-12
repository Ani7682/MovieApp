
const API_KEY = 'api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w1280'
const searchURL = BASE_URL + '/search/movie?'+API_KEY

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const information = document.getElementById('information')

getMovies(API_URL);

let i=0;
let num

async function getMovies(url){
    const res =await fetch(url)
    const data = await res.json()
    await showMovies(data.results)
    
    for (var j=0; j<num; j++){

        const classes =  document.querySelectorAll(`.movie${j}`)

        classes[0].addEventListener('click',()=>{
            // let route = '/info'
            // const res =fetch(route)
            // const data =res.json()

            main.classList.add('hidden')
            information.classList.remove('hidden')
            classes[1].classList.toggle('hidden')
 
    })}
}


async function showMovies(data) {
    main.innerHTML = '';
    information.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview,original_language,release_date,genre_ids} = movie;
        let vote = Math.round(vote_average * 10) / 10
        let language = searchJson(languages,original_language)

        let genre = getGenre(genre_ids)
        
        if (poster_path!=null){
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie',`movie${i}`);
            movieEl.innerHTML = `

                <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getColor(vote)}">${vote}</span>
                </div>
        
            `
            main.appendChild(movieEl)

            const infoEl = document.createElement('div')
            infoEl.classList.add('hidden',`movie${i}`);

            // infoEl.setAttribute("id",`row${i}`)

            i++

            infoEl.innerHTML = `

            <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6" style="text-align: center; display: block;">
                    <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" width="50%" alt="${title}" class="img-fluid">
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 details" style="color:rgb(245, 196, 36);">
                    <a href="" style="font-weight: bolder; padding-bottom: 20px;font-size:xxx-large;text-decoration: none;color:rgb(245, 196, 36);">${title}</a>
                    <p>
                        <span style="color: aliceblue;">Genre:</span>
                        <span>${genre}</span>
                    </p>
                    <p>
                        <span style="color: aliceblue;">Language:</span>
                        <span>${language}</span>
                    </p>
                    <p>
                        <span style="color: aliceblue;">Rating:</span>
                        <span>${vote}</span>
                    </p>
                    <p>
                        <span style="color: aliceblue;">Released:</span>
                        <span>${release_date}</span>
                    </p>
                </div>
            </div>
            <div id= 'about'>OverView</div>
            <div id= 'about-details'>
                ${overview}
            </div>
            `
            information.appendChild(infoEl)
        }

    })
    num = i
    i= 0
}

function getGenre(genre_ids){
    let g = ""
    genre_ids.forEach((gen) =>{
        g = g + searchGenre(genres, gen) + "  " 
    })
    return g
}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    main.classList.remove('hidden')
    information.classList.add('hidden')

    const searchTerm = search.value

    if (searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }
    else{
        getMovies(API_URL)
    }
})

function searchJson(jsonData, key) {
    if (key in jsonData) {
        return jsonData[key];
    }
}

function searchGenre(jsonData, key) {
    if (key in jsonData) {
        return jsonData[key];
    }
}


const languages = {
    "aa": "Afar",
    "ab": "Abkhazian",
    "ae": "Avestan",
    "af": "Afrikaans",
    "ak": "Akan",
    "am": "Amharic",
    "an": "Aragonese",
    "ar": "Arabic",
    "as": "Assamese",
    "av": "Avaric",
    "ay": "Aymara",
    "az": "Azerbaijani",
    "ba": "Bashkir",
    "be": "Belarusian",
    "bg": "Bulgarian",
    "bh": "Bihari languages",
    "bi": "Bislama",
    "bm": "Bambara",
    "bn": "Bengali",
    "bo": "Tibetan",
    "br": "Breton",
    "bs": "Bosnian",
    "ca": "Catalan",
    "ce": "Chechen",
    "ch": "Chamorro",
    "co": "Corsican",
    "cr": "Cree",
    "cs": "Czech",
    "cu": "Church Slavic",
    "cv": "Chuvash",
    "cy": "Welsh",
    "da": "Danish",
    "de": "German",
    "dv": "Maldivian",
    "dz": "Dzongkha",
    "ee": "Ewe",
    "el": "Greek",
    "en": "English",
    "eo": "Esperanto",
    "es": "Spanish",
    "et": "Estonian",
    "eu": "Basque",
    "fa": "Persian",
    "ff": "Fulah",
    "fi": "Finnish",
    "fj": "Fijian",
    "fo": "Faroese",
    "fr": "French",
    "fy": "Western Frisian",
    "ga": "Irish",
    "gd": "Gaelic",
    "gl": "Galician",
    "gn": "Guarani",
    "gu": "Gujarati",
    "gv": "Manx",
    "ha": "Hausa",
    "he": "Hebrew",
    "hi": "Hindi",
    "ho": "Hiri Motu",
    "hr": "Croatian",
    "ht": "Haitian",
    "hu": "Hungarian",
    "hy": "Armenian",
    "hz": "Herero",
    "ia": "Interlingua",
    "id": "Indonesian",
    "ie": "Interlingue",
    "ig": "Igbo",
    "ii": "Sichuan Yi",
    "ik": "Inupiaq",
    "io": "Ido",
    "is": "Icelandic",
    "it": "Italian",
    "iu": "Inuktitut",
    "ja": "Japanese",
    "jv": "Javanese",
    "ka": "Georgian",
    "kg": "Kongo",
    "ki": "Kikuyu",
    "kj": "Kuanyama",
    "kk": "Kazakh",
    "kl": "Kalaallisut",
    "km": "Central Khmer",
    "kn": "Kannada",
    "ko": "Korean",
    "kr": "Kanuri",
    "ks": "Kashmiri",
    "ku": "Kurdish",
    "kv": "Komi",
    "kw": "Cornish",
    "ky": "Kirghiz",
    "la": "Latin",
    "lb": "Luxembourgish",
    "lg": "Ganda",
    "li": "Limburgan",
    "ln": "Lingala",
    "lo": "Lao",
    "lt": "Lithuanian",
    "lu": "Luba-Katanga",
    "lv": "Latvian",
    "mg": "Malagasy",
    "mh": "Marshallese",
    "mi": "Maori",
    "mk": "Macedonian",
    "ml": "Malayalam",
    "mn": "Mongolian",
    "mr": "Marathi",
    "ms": "Malay",
    "mt": "Maltese",
    "my": "Burmese",
    "na": "Nauru",
    "nb": "Norwegian",
    "nd": "North Ndebele",
    "ne": "Nepali",
    "ng": "Ndonga",
    "nl": "Dutch",
    "nn": "Norwegian",
    "no": "Norwegian",
    "nr": "South Ndebele",
    "nv": "Navajo",
    "ny": "Chichewa",
    "oc": "Occitan",
    "oj": "Ojibwa",
    "om": "Oromo",
    "or": "Oriya",
    "os": "Ossetic",
    "pa": "Panjabi",
    "pi": "Pali",
    "pl": "Polish",
    "ps": "Pushto",
    "pt": "Portuguese",
    "qu": "Quechua",
    "rm": "Romansh",
    "rn": "Rundi",
    "ro": "Romanian",
    "ru": "Russian",
    "rw": "Kinyarwanda",
    "sa": "Sanskrit",
    "sc": "Sardinian",
    "sd": "Sindhi",
    "se": "Northern Sami",
    "sg": "Sango",
    "si": "Sinhala",
    "sk": "Slovak",
    "sl": "Slovenian",
    "sm": "Samoan",
    "sn": "Shona",
    "so": "Somali",
    "sq": "Albanian",
    "sr": "Serbian",
    "ss": "Swati",
    "st": "Sotho, Southern",
    "su": "Sundanese",
    "sv": "Swedish",
    "sw": "Swahili",
    "ta": "Tamil",
    "te": "Telugu",
    "tg": "Tajik",
    "th": "Thai",
    "ti": "Tigrinya",
    "tk": "Turkmen",
    "tl": "Tagalog",
    "tn": "Tswana",
    "to": "Tonga",
    "tr": "Turkish",
    "ts": "Tsonga",
    "tt": "Tatar",
    "tw": "Twi",
    "ty": "Tahitian",
    "ug": "Uighur",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "uz": "Uzbek",
    "ve": "Venda",
    "vi": "Vietnamese",
    "vo": "Volapük",
    "wa": "Walloon",
    "wo": "Wolof",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "za": "Zhuang",
    "zh": "Chinese",
    "zu": "Zulu"
}

const genres = {

    "28" : "Action",
    "12" : "Adventure",
    "16" : "Animation",
    "35" : "Comedy",
    "80" : "Crime",
    "99" : "Documentary",
    "18" : "Drama",
    "10751" : "Family",
    "14" :"Fantasy",
    "36" : "History",
    "27" :"Horror",
    "10402":"Music",
    "9648":"Mystery",
    "10749":"Romance",
    "878" : "Science Fiction",
    "10770" : "TV Movie",
    "53" : "Thriller",
    "10752" : "War",
    "37" : "Western"
    }
    