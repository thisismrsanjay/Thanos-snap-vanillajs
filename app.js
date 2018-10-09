const charactersURL = 'https://gateway.marvel.com/v1/public/events/29/characters?limit=100&apikey=4aee4d6c6b4ec742ee300356a427c8bc';
const characterElement = document.querySelector('.characters');

const snapElement = document.querySelector('#snap');
const thanosElement = document.querySelector('#thanos');

snapElement.style.opacity='0';


const audioElement  = new Audio('sounds/intro.mp3');
audioElement.play();

function getCharacterData(){
    if(localStorage.characterData){
        return Promise.resolve(JSON.parse(localStorage.characterData));
    }
    return fetch(charactersURL)
    .then(response=>response.json())
    .then(data=>{
        localStorage.characterData = JSON.stringify(data);
        return data;
    })    
}

const hiddenCharacters= {
    1009652:true,
    1009165:true,
    1009726:true,
    1009299:true
}

function addCharactersToPage(characterData){
    characterData.data.results.forEach(result=>{
        if(!hiddenCharacters[result.id]){
            const characterImage= result.thumbnail.path+'/standard_medium.jpg';

            const divElement = document.createElement('div');
            divElement.style.transform='scale(1)';
            divElement.className = 'character';
            const imageElement = document.createElement('img'); 
            imageElement.src= characterImage;
            divElement.appendChild(imageElement);

        const characterName = result.name.replace(/\(.*\)/,'');
            const nameElement = document.createElement('h3');
            nameElement.textContent = characterName;
            divElement.appendChild(nameElement);



            characterElement.appendChild(divElement);
        }
        
    })
}

getCharacterData()
    .then(characterData=>{
        addCharactersToPage(characterData)
    })

thanosElement.addEventListener('click',()=>{
    snapElement.style.opacity='1';
    setTimeout(()=>{
        audioElement.pause();
        audioElement.currentTime=0;
        audioElement.src='sounds/snap.mp3';
        audioElement.play();
        snapElement.style.opacity='0';

        setTimeout(()=>{
            audioElement.pause();
            audioElement.currentTime=0;
            audioElement.src='sounds/funeral.mp3';
            audioElement.play();
            balanceUniverse();
        },2000);
    },5000)
});

function balanceUniverse(){
    const characters =document.querySelectorAll('.character');
    
    characters.forEach((hero,i)=>{
       
        setTimeout(()=>{
            //console.log(hero);
            let kill = Math.floor(Math.random()*2);
            
            hero.style.transform=kill?'scale(0)':'scale(1)'; 
        },i*1000)  
    })                                                                                      
}

// const printNumbersForEvery2Sec = (n) => {
//     for (let i = 1; i <= n; i++) {
//       setTimeout(() => {
//         console.log(i)
//       }, i * 2000)
//     }
//   }
//   printNumbersForEvery2Sec(10);

// var i=0;

// function printAndIncrement()
// {
//     console.log(i);
//     i++;   
//     setTimeout(printAndIncrement, 2000);   
// }

// setTimeout(printAndIncrement, 2000);


