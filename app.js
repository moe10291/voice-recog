const btn= document.querySelector('.talk');
const content = document.querySelector('.content')

//  let long;
//     let lat;
//     let tempratureDescription= document.querySelector('.temprature-description');
//     let tempratureDegree= document.querySelector('.temprature-degree');
//     let locationTimezone= document.querySelector('.location-timezone');
//     let tempratureSection= document.querySelector('.temprature');
//     const tempratureSpan= document.querySelector('.temprature span');

//

const greetings=['I am good', 'Rocking as usual', 'Better than I deserve']
const weather=['weather is fine', 'its sunny', 'why do you care?']
const hungry=["Me too, let's eat something", "So are kids in Africa", "No, you are just fat", "Eat healthy"]
const unresponsive="Please ask me questions like, How are you, How is the weather, or say I'm starving"
const SpeechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition= new SpeechRecognition();

recognition.onstart= function(){
//    console.log('speak up')
};

recognition.onresult= function (event){
    const current= event.resultIndex;

    const transcript= event.results[current][0].transcript;
    // console.log(transcript)
    content.textContent=transcript;
    
    readOutLoud(transcript);
};

//xiomararivera395@yahoo.com 

btn.addEventListener('click', ()=> {
    recognition.start();
});


readOutLoud=(message)=>{
    const speech= new SpeechSynthesisUtterance();
    speech.text= ''
    if(message.includes('weather')){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                lat= position.coords.latitude;
                long= position.coords.longitude;
    
                const proxy= 'http://cors-anywhere.herokuapp.com/'
    
                const api= `${proxy}https://api.darksky.net/forecast/4b7f2d7b6781c0bf8f322478f9d100a3/${lat}, ${long}`
                // console.log('IM HERE', api)
                fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const {temperature}= data.currently;
                    const {summary}= data.hourly
                    console.log('WEATHER', summary)
                    //Set DOM elements from the API
    
                    // tempratureDegree.textContent= Math.round(temperature);
                    // tempratureDescription.textContent= summary;
                    // locationTimezone.textContent= data.timezone;
                    // Formula for Celcius
    
                    let celsius= Math.floor((temperature-32)* (5/9))
                    console.log('LETS SEE', celsius)

                    //'It is'+Math.floor(data.currently.temperature)+' degrees fahrenheit'
                    const finalText= `It is ${Math.floor(temperature)} degrees fahrenheit or ${celsius} celsius with ${summary}`
                    console.log('WEATHER', finalText)
                    speech.text= finalText;
                    console.log(speech.text)
                    window.speechSynthesis.speak(speech);
                    
    })

})}

}

    else if (message.includes('how are you')){
        const finalText= greetings[Math.floor(Math.random()*greetings.length)];
        speech.text= finalText;
    }
    else if (message.includes("starving"||"hungry")){
        const finalText= hungry[Math.floor(Math.random()*hungry.length)];
        speech.text= finalText;
    }

    else if(message.includes('your name')){
        const audio= new Audio('/bond.mp3');
        audio.play(); 
    }
    else{
        const finalText=unresponsive
        speech.text= finalText;
    }
    speech.volume= 1;
    speech.rate= 1.2;
    speech.pitch=1;
    // speech.text= message;

    window.speechSynthesis.speak(speech);
    
}