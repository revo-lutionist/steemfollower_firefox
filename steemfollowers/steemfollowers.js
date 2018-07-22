async function start() {
    var count = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0, count7 = 0, count8 = 0, count9 = 0,
        count10 = 0, count11 = 0, count12 = 0, count13 = 0, count14 = 0, count15 = 0, count16 = 0, count17 = 0, 
        count18 = 0, count19 = 0, count20 = 0, count21 = 0, count22 = 0, count23 = 0;
    var start = "";
    var arrFollowers = [];
    var arrFollowerObjects = [];
    var arrRecentPosts = [];
    var arrLessRecentPosts = [];
    var steemVests = "";
    var totalVests = "";

    document.getElementById("overlay").style.display = "block";

    do {
        await steem.api.getFollowersAsync("revo", start, 'blog', 1000)
        .then((result) => {
            //console.log(result);
            count = result.length;

            for (var member of result) {
                arrFollowers.push(member.follower);
                start = member.follower;
            }
        });

    } while (count === 1000);

    console.log("followers:",arrFollowers.length);  

    steem.api.getAccountsAsync(arrFollowers)
    .then(async (result) => {
        //console.log(result)
        await steem.api.getDynamicGlobalPropertiesAsync()
        .then((res) => {
            //console.log("globaldynamprops:",res)
            steemVests = res.total_vesting_fund_steem.match(/\d+\.\d+/);
            totalVests = res.total_vesting_shares.match(/\d+\.\d+/);
            console.log("steemVests:",steemVests)
            console.log("totalVests:",totalVests)
        });

        for (var obj of result) {
            var rep = Math.floor((Math.log10(parseInt(obj.reputation))-9)*9 + 25);
            
            if (rep < 25) {
                count4++;
            } else if (rep >= 25 && rep <= 30) {
                count5++;
            } else if (rep > 30 && rep <= 45) {
                count6++;
            } else if (rep > 45 && rep <= 60) {
                count7++;
            } else if (rep > 60) {
                count8++;
            }
         
            //var vests = parseInt(obj.vesting_shares.match(/\d+\.\d+/)) + parseInt(obj.received_vesting_shares.match(/\d+\.\d+/));
            var vests = parseInt(/\d+\.\d+/.exec(obj.vesting_shares)) + parseInt(/\d+\.\d+/.exec(obj.received_vesting_shares));
            var SP = Math.floor(parseInt(steemVests[0]) * (parseInt(vests)/parseInt(totalVests[0])));

            if (SP < 100) {
                count9++;
            } else if (SP >= 100 && SP <= 500) {
                count10++;
            } else if (SP > 500 && SP <= 2000) {
                count11++;
            } else if (SP > 2000 && SP <= 10000) {
                count12++;
            } else if (SP > 10000) {
                count13++;
            }

            var dateComment = new Date(obj.last_post + "Z");    //UTC
            var datePost = new Date(obj.last_root_post + "Z");  //UTC
            var now = new Date();
            var mlsNow = now.getTime();                         //UTC
            var mlsElapsed = mlsNow - dateComment.getTime();
            var mlsElapsed2 = mlsNow - datePost.getTime();

            mlsElapsed < mlsElapsed2 ? true : mlsElapsed = mlsElapsed2; //use most recent

            if (mlsElapsed <= 60480000) {   // 1 week
                arrRecentPosts.push({ name: obj.name, reputation: rep, sp: SP });
                //count2++;
            } else if (mlsElapsed > 60480000 && mlsElapsed <= 2678400000) {  // 1 month
                arrLessRecentPosts.push({ name: obj.name, reputation: rep, sp: SP });
                //count3++;
            }
        }

        arrFollowerObjects = arrRecentPosts.concat(arrLessRecentPosts);
        //now need to run this through same code as above to get SP and Rep distributions for these recent posters
        for (var objFollower of arrFollowerObjects) {
            var rep = objFollower.reputation;
            var SP = objFollower.sp;

            if (rep < 25) {
                count14++;
            } else if (rep >= 25 && rep <= 30) {
                count15++;
            } else if (rep > 30 && rep <= 45) {
                count16++;
            } else if (rep > 45 && rep <= 60) {
                count17++;
            } else if (rep > 60) {
                count18++;
            }

            if (SP < 100) {
                count19++;
            } else if (SP >= 100 && SP <= 500) {
                count20++;
            } else if (SP > 500 && SP <= 2000) {
                count21++;
            } else if (SP > 2000 && SP <= 10000) {
                count22++;
            } else if (SP > 10000) {
                count23++;
            }
        }
        
        intRecent = arrRecentPosts.length;
        intLessRecent = arrLessRecentPosts.length;
        intTotal = arrFollowers.length; 

        document.getElementById("overlay").style.display = "none";

        document.getElementById("1").style.height = 100*intRecent/intTotal + "%";
        document.getElementById("1").title = (100*intRecent/intTotal).toFixed(1) + "%";
        document.getElementById("2").style.height = 100*intLessRecent/intTotal + "%";
        document.getElementById("2").title = (100*intLessRecent/intTotal).toFixed(1) + "%"
        document.getElementById("3").style.height = 100*(intTotal-intRecent-intLessRecent)/intTotal + "%";
        document.getElementById("3").title = 100*((intTotal-intRecent-intLessRecent)/intTotal).toFixed(1) + "%";

        document.getElementById("4").style.height = 100*count4/intTotal + "%";
        document.getElementById("4").title = (100*count4/intTotal).toFixed(1) + "%";
        document.getElementById("5").style.height = 100*count5/intTotal + "%";
        document.getElementById("5").title = (100*count5/intTotal).toFixed(1) + "%";
        document.getElementById("6").style.height = 100*count6/intTotal + "%";
        document.getElementById("6").title = (100*count6/intTotal).toFixed(1) + "%";
        document.getElementById("7").style.height = 100*count7/intTotal + "%";
        document.getElementById("7").title = (100*count7/intTotal).toFixed(1) + "%";
        document.getElementById("8").style.height = 100*count8/intTotal + "%";
        document.getElementById("8").title = (100*count8/intTotal).toFixed(1) + "%";

        document.getElementById("9").style.height = 100*count9/intTotal + "%";
        document.getElementById("9").title = (100*count9/intTotal).toFixed(1) + "%";
        document.getElementById("10").style.height = 100*count10/intTotal + "%";
        document.getElementById("10").title = (100*count10/intTotal).toFixed(1) + "%";
        document.getElementById("11").style.height = 100*count11/intTotal + "%";
        document.getElementById("11").title = (100*count11/intTotal).toFixed(1) + "%";
        document.getElementById("12").style.height = 100*count12/intTotal + "%";
        document.getElementById("12").title = (100*count12/intTotal).toFixed(1) + "%";
        document.getElementById("13").style.height = 100*count13/intTotal + "%";
        document.getElementById("13").title = (100*count13/intTotal).toFixed(1) + "%";

        document.getElementById("14").style.height = 100*count14/arrFollowerObjects.length + "%";
        document.getElementById("14").title = (100*count14/arrFollowerObjects.length).toFixed(1) + "%";
        document.getElementById("15").style.height = 100*count15/arrFollowerObjects.length + "%";
        document.getElementById("15").title = (100*count15/arrFollowerObjects.length).toFixed(1) + "%";
        document.getElementById("16").style.height = 100*count16/arrFollowerObjects.length + "%";
        document.getElementById("16").title = (100*count16/arrFollowerObjects.length).toFixed(1) + "%";
        document.getElementById("17").style.height = 100*count17/arrFollowerObjects.length + "%";
        document.getElementById("17").title = (100*count17/arrFollowerObjects.length).toFixed(1) + "%";
        document.getElementById("18").style.height = 100*count18/arrFollowerObjects.length + "%";
        document.getElementById("18").title = (100*count18/arrFollowerObjects.length).toFixed(1) + "%";

        document.getElementById("19").style.height = 100*count19/arrFollowerObjects.length + "%";
        document.getElementById("19").title = (100*count19/arrFollowerObjects.length).toFixed(1) + "%";
        document.getElementById("20").style.height = 100*count20/arrFollowerObjects.length + "%";
        document.getElementById("20").title = (100*count20/arrFollowerObjects.length).toFixed(1) + "%";
        document.getElementById("21").style.height = 100*count21/arrFollowerObjects.length + "%";
        document.getElementById("21").title = (100*count21/arrFollowerObjects.length).toFixed(1) + "%";
        document.getElementById("22").style.height = 100*count22/arrFollowerObjects.length + "%";
        document.getElementById("22").title = (100*count22/arrFollowerObjects.length).toFixed(1) + "%";
        document.getElementById("23").style.height = 100*count23/arrFollowerObjects.length + "%";
        document.getElementById("23").title = (100*count23/arrFollowerObjects.length).toFixed(1) + "%";
    });
}