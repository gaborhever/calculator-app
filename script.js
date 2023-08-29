
// FELÜLET VEZÉRLŐ (adat megjelenítés)
let feluletVezerlo = (function(){

    console.log("Felületvezérlő fut!");
    let DOMelemek = {
        szamMezo: '.szam_mezo',
        egyenloGomb: 'egyenlo_gomb',
        ceGomb: '.ce_gomb',
        osztoGomb: '.oszto_gomb',
        szorozGomb: '.szoroz_gomb',
        osszeeadGomb: '.osszead_gomb',
        kivonGomb: '.kivon_gomb',
        szamGomb: '.gomb'

    };

    let szamolasVege = false;

    return {

        getDOMelemek: function() {
            return DOMelemek;
        },

        ertekMegjelenites: function(muvelet) {
            document.querySelector(DOMelemek.szamMezo).value = muvelet;
        },

        eredmenyMegjelenites: function(muvelet) {
            document.querySelector(DOMelemek.szamMezo).value = eval(muvelet);
            szamolasVege = true;
            alkalmazasVezerlo.init(szamolasVege);
        },

    };


})();

// ALKALMAZÁS VEZÉRLŐ (eseménykezelők)
let alkalmazasVezerlo = (function() {
    let muvelet = "";
    let ertek = 0;
    let utolsoKar = "";

    console.log("Alkalmazásvezérlő fut!");

    let esemenykezelokBeallit = function() {
        let DOM = feluletVezerlo.getDOMelemek();
        let gombok = document.querySelectorAll(DOM.szamGomb);
    
        Array.from(gombok).forEach(aktualisElem => addEventListener('click', muveletOsszerak));

   };
   // Meg lehetne csinálni muveletTomb-el és fügvénnyel Rest paraméterrel? (paraméterként kapja meg a tömböt)
   function muveletOsszerak(event) {
    ertek = event.target.value;

    if(ertek <= 9) {

        muvelet += ertek;
        feluletVezerlo.ertekMegjelenites(muvelet);

    } else if((ertek === "+") || (ertek === "-") || (ertek === "/") || (ertek === "*") || (ertek === ".")) {
        if(muvelet.length)
        {  
            utolsoKar = muvelet.slice((muvelet.length -1), muvelet.length);
            if(utolsoKar <= 9) {
                muvelet += ertek;
                feluletVezerlo.ertekMegjelenites(muvelet);
            } else {
                muvelet = muvelet.replace(utolsoKar, ertek);
                feluletVezerlo.ertekMegjelenites(muvelet);
            }
            
        }
        
        

    } else if(ertek === "=" && muvelet.length) {

        utolsoKar = "";
        feluletVezerlo.eredmenyMegjelenites(muvelet);
        

    } else if(ertek === "CE") {

        alkalmazasVezerlo.init();
    }

};


   return {
        init: function(szamolasVege) {
            muvelet = "";
            ertek = 0;
            esemenykezelokBeallit();
            if(!szamolasVege) {
                feluletVezerlo.ertekMegjelenites(ertek);
            }
            
            console.log("Init fut!");
    
        }
        
   };

})();

alkalmazasVezerlo.init();