$(document).ready(function () {
    //SETUP VARIABLES
    //980776d9eb1643de9e7c956fb41ebf2a
    //working URL for searching work Obama// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=obama&api-key=980776d9eb1643de9e7c956fb41ebf2a
    //WORKING URL WITH START AND END DATE//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=obama&api-key=980776d9eb1643de9e7c956fb41ebf2a&begin_date=19990101&end_date=20051118
    var API_KEY = "980776d9eb1643de9e7c956fb41ebf2a"
    var searchTerm;
    var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
    var begin_date ;
    var end_date;
    var numberOfRecordes;

    //================================================================================
    //FUNCTIONS
    function runSearch(numberOfRecordes, queryURL) {
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function (data) {
                $("#wellSection").empty();
                for (var i =0; i < numberOfRecordes; i++ ){
                var headLine = (data.response.docs[i].headline.main);
                var section = (data.response.docs[i].section_name);
                var articalURL = (data.response.docs[i].web_url);
                var publishedDate = (data.response.docs[i].pub_date);
                var byLine = (data.response.docs[i].byline_original); 
                console.log(queryURL);
                var wellSection = $("<div>");
                wellSection.addClass("well");
                wellSection.attr("id", "articalWell-" + i)
                $("#wellSection").append(wellSection);
                if (headLine != "null"){
                    $("#articalWell-" + i).append("<h3>"+ headLine +"</h3>");
                }
                if (byLine && byLine.hasOwnProperty("original")){
                    $("#articalWell-" + i).append("<h6>"+ byLine +"</h6>");
                }
                $("#articalWell-" + i).append("<h6>"+ section +"</h6>");
                $("#articalWell-" + i).append("<h6>"+ publishedDate +"</h6>");
                $("#articalWell-" + i).append("<a href="+ articalURL +">"+ articalURL + "</a>");
                
            }
            })
    }
    //==================================================================================
    //MAIN PROCESSES
    $("#searchButton").on("click", function () {
        searchTerm = $("#search").val().trim();
        begin_date = $("#startDate").val().trim();
        end_date = $("#EndDate").val().trim();
        numberOfRecordes = $("#numRecord").val();
        var queryURL = queryURLBase + searchTerm + "&api-key=" + API_KEY  
        //if user doesnot include beging date
        if(parseInt(begin_date)){
            queryURL = queryURL + "&begin_date=" + begin_date;
        }
        //if user doesnot include end date
        if(parseInt(end_date)){
            queryURL = queryURL + "&end_date=" + end_date;
        }
        runSearch(numberOfRecordes, queryURL);
        return false;
    })
    

    //=================================================================================































});