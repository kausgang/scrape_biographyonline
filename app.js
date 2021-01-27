// https://www.biographyonline.net/people/famous/historical-figures.html


// https://www.biographyonline.net/people/inspirational.html
// https://www.biographyonline.net/actors.html
// https://www.biographyonline.net/artists.html
// https://www.biographyonline.net/business/top-10-entrepreneurs.html
// https://www.biographyonline.net/humanitarian.html
// https://www.biographyonline.net/military.html
// https://www.biographyonline.net/music.html
// https://www.biographyonline.net/poets.html
// https://www.biographyonline.net/politicians.html
// https://www.biographyonline.net/royalty.html
// https://www.biographyonline.net/scientists.html
// https://www.biographyonline.net/sport.html
// https://www.biographyonline.net/famous-religious-figures-and-leaders/
//!! PROBLEMATIC -  https://www.biographyonline.net/people/women-who-changed-world.html





var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');


var DESTINATION_FOLDER = "PEOPLE";


// CHECK IF FOLDER EXISTS..IF NOT CREATE IT
fs.exists(DESTINATION_FOLDER, function (exists) {

    if (exists) {
        // console.log(exists)
    }
    else {
        console.log("creating folder");
        fs.mkdir(DESTINATION_FOLDER,function(err){

            if(err)
                console.log(err);
        })
    }

});



function write_file(list){

    var filename = path.join(DESTINATION_FOLDER,'people.txt')
    fs.appendFileSync(filename,JSON.stringify(list,null,2));
    

}


function rectify_content(str){
    
    
    if ((str===null) || (str==='')) 
        return false; 
    else
        str = str.toString(); 
          
    // Regular expression to identify HTML tags in  
    // the input string. Replacing the identified  
    // HTML tag with a null string. 
    return str.replace( /(<([^>]+)>)/ig, ''); 
    
}



function get_data(url){

    


        request.get(url,(err,resp_code,data)=>{

            if(err) throw err;



            var $=cheerio.load(data);

        
        
            $('span').remove();
            $('picture').remove();
            $('noscript').remove();
            $('img').remove();

            var list = [];
                
          

                $('p').find('a').each(function (index, element) {
                
                    if($(element).html() != ''){

                        var content = rectify_content($(element).html())
                        list.push(content);
                    }
                        
                });


                console.log(list);

                write_file(list)



        })

        

}


function find_people(){

    var URL = [
        'https://www.biographyonline.net/people/inspirational.html',
        'https://www.biographyonline.net/actors.html',
        'https://www.biographyonline.net/artists.html',
        'https://www.biographyonline.net/business/top-10-entrepreneurs.html',
        'https://www.biographyonline.net/humanitarian.html',
        'https://www.biographyonline.net/military.html',
        'https://www.biographyonline.net/music.html',
        'https://www.biographyonline.net/poets.html',
        'https://www.biographyonline.net/politicians.html',
        'https://www.biographyonline.net/royalty.html',
        'https://www.biographyonline.net/scientists.html',
        'https://www.biographyonline.net/sport.html',
        'https://www.biographyonline.net/famous-religious-figures-and-leaders/',
        'https://www.biographyonline.net/people/women-who-changed-world.html'

    ]

 

    for(i=0;i<URL.length;i++){

        get_data(URL[i])


    }
    

}





find_people()





