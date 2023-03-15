const axios = require('axios');
const cheerio = require('cheerio');



exports.scrapper = async(req, res) => {
    
    const searchString = "modi";                   
const encodedString = encodeURI(searchString);      

const AXIOS_OPTIONS = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
    },                                                  
    params: {
        q: encodedString,                                  
        tbm: "nws",                                     
        hl: 'en',                                       
        gl: 'in'   
       
              
                                 
    },
};
    

    axios.get(`http://google.co.in/search`, AXIOS_OPTIONS)
    .then(function ({ data }) {
        let $ = cheerio.load(data);

        const pattern = /s='(?<img>[^']+)';\w+\s\w+=\['(?<id>\w+_\d+)'];/gm;
        const images = [...data.matchAll(pattern)].map(({ groups }) => ({ id: groups.id, img: groups.img.replace('\\x3d', '') }))

        const allNewsInfo = Array.from($('.WlydOe')).map((el) => {
            return {
                link: $(el).attr('href'),
                date: $(el).find('.ZE0LJd span').text().trim(),
            }
        });

        res.setHeader('Content-Type', 'application/json');
            console.log(allNewsInfo);
            res.send(JSON.stringify(allNewsInfo));
    });
        
};