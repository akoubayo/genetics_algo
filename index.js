var phrase = "damien altman aime le chocolat damien altman damien altman aime le chocolat ! ?";
var pop = [];
var max_score = 5 * phrase.length;
var find = false;
var _ = require('lodash');

function getRandomChar() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz !?";

    for (var i = 0; i < phrase.length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var createPop = (start, pop_max) => {
    for (i = start; i < pop_max; i++) {
        p = {};
        p.score = 0;
        p.phrase = getRandomChar();
        pop.push(p);
    }
}

var check = () => {
    for(var item of pop){
        if(item.phrase == phrase) {
            phrase.score = max_score;
            find = true;
        }
        var p = item.phrase;
        for(var i in p) {
            if(phrase.indexOf(p[i]) != -1 && phrase[i] == p[i]) {
                item.score += 5;
            } else if(phrase.indexOf(p[i]) != -1) {
                item.score += 1;
            }
        }
    };
    return false;
}

var mut = 0;
var pap = 0;
var mum = 0;
var child = () => {
    var new_pop = [];
    var possible = "abcdefghijklmnopqrstuvwxyz !?";
    for(var i = 0; i < pop.length - 1; i++) {
        var papa;
        var maman;
        var time = Date.now();
        var random = _.random(0, time.toString().substr(time.toString().length-3));

        if(random % 3) {
            papa = pop[i];
            maman = pop[i+1]
        } else {
            papa = pop[i+1];
            maman = pop[i];
        }

        var tmp_pop    = {};
        tmp_pop.score  = 0;
        var new_string = '';

        for(ii = 0; ii < phrase.length; ii++) {
            time = Date.now();
            random = _.random(0, time.toString().substr(time.toString().length-5));
            if(random % 10000 == 100) {
                new_string += possible.charAt(Math.floor(Math.random() * possible.length));
                mut++;
            }
            else if(random % 2) {
                pap++;
                new_string += papa.phrase[ii];
            } else {
                mum++;
                new_string += maman.phrase[ii];
            }
        }

        tmp_pop.phrase = new_string;
        new_pop.push(tmp_pop);
    }

    pop = new_pop;
}


if (find == true) {
    console.log('Find First');
    console.log(pop);
}




var kill = (opt) => {
    pop = _.slice(pop,0, (pop.length/opt));
}


function sleeps(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var j            = 0
var jj           = 20;
var jjj          = 2;
var appocalipse  = 0;

async function genetics_algo ()  {
    while(find == false && j < 10000) {
        var time = Date.now();

        await sleeps(100);
        child();
        check();
        pop    = _.orderBy(pop, [ 'score'], [ 'desc']);
        random = _.random(0, time.toString().substr(time.toString().length-5));

        if(random % 30 == 5) {
            var r = _.random(1,1.9);
            console.log('=========================appocalipse===== '+r+'====================');
            appocalipse++;
        } else {
            kill(jjj);
        }

        createPop(pop.length, jj);
        jj+= 10;

        if(j%40 == 0 && jjj > 1.1) {
           jjj -= 0.1;
        }

        console.log('========' + j + '===='+ pop.length +'==='+max_score+'=='+pop[0].score);
        j++;
    }
}

createPop(0,20);
check();
pop = _.orderBy(pop, [ 'score'], [ 'desc']);
kill(pop.length/2);
genetics_algo().then(res => {
    console.log('=================');
console.log(pop[0]);
console.log('=======================');
console.log('== NB generation =='+ j +'**JJ*'+jj+'*===' + (jjj) + '====='+mut+'=====');
console.log('== MAMAN == ' + mum + ' == PAPA == ' + pap + ' == MUTATION == ' + mut +' == POP Tot == '+ pop.length + '== appocalipse == ' + appocalipse);
});


