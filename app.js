const myAudio = document.querySelector("audio");
const playButton = document.querySelector("#play");
const myShuffle = document.querySelector("#shuffle")

let isAudioPlaying = false

function playTheAudio()
{
    myAudio.play()
    playButton.classList.replace("fa-play", "fa-pause")
    //playbutton identified by play id 
    //classlist method will access the class data in play button fa- solid fa-play
    //replace method will replace the fa-play with fa- pause 
    isAudioPlaying = true
}

function pauseTheAudio()
{
    myAudio.pause()
    playButton.classList.replace("fa-pause", "fa-play")
  
    isAudioPlaying = false  
}

playButton.addEventListener("click", function()
{
      if(isAudioPlaying)
      {
        pauseTheAudio()
      }
      else
      {
        playTheAudio()
      }
})

const musicInfo = [
    {
     
        songName: "Levitating",
       singerName:"	Dua Lipa",
       data: 1

    },
    {
        songName: "The Business	",
        singerName:"Tiesto",
        data: 2

    },
    {
        songName: "	Without You",
        singerName:"Kid Laroi",
        data: 3

   
    }
]

const forwardButton = document.querySelector("#forward")
const mySongName = document.querySelector("h3")
const mySingerName = document.querySelector("h4")
const backwardButton = document.querySelector("#backward")
const myImage = document.querySelector("#image")

function updateSong(songData)
{
   mySongName.textContent = songData.songName
   mySingerName.textContent = songData.singerName
   myImage.src = `./images/image-${songData.data}.jpg`
   myAudio.src = `./music/music-${songData.data}.mp3`

}


let songPosition = 0

const myLike = document.querySelector("#like")

forwardButton.addEventListener("click",function()

{
    myLike.style.color = "white"

    if(songPosition > musicInfo.length-1)
    {
        songPosition = 0
    }

    updateSong(musicInfo[songPosition])
    songPosition++
    playTheAudio()
})


backwardButton.addEventListener("click",function()

{

    myLike.style.color = "white"

    songPosition--
    if(songPosition < 0)
    {
        songPosition = musicInfo.length-1
    }

    updateSong(musicInfo[songPosition])
    playTheAudio()
})

// current time and total duration changing
//  timeupdate event gives the time related information in current audio
//currenttime is inbuilt property it will give current time of the audio
//duration is inbuilt property it will show the duration of audio
//math.floor will remove the decimal points
//timeupdate event will take the myaudio information that will kept in output variable
//srcelement is audio 


const htmlTotalDurtion = document.querySelector(".totalTime")
const htmlCurrentTime = document.querySelector(".currentTime")
const childBar = document.querySelector(".childProgressBar")

myAudio.addEventListener("timeupdate",function(output)
{
    let myCurrentTime = output.srcElement.currentTime
    let myTotalDuration = output.srcElement.duration

    let totalMinutes = Math.floor(myTotalDuration / 60)
    let totalSeconds = Math.floor(myTotalDuration % 60)
    //percentage will give in seconds 

    if(totalSeconds < 10)
    {
        totalSeconds = `0${totalSeconds}`
    }

    htmlTotalDurtion.textContent = `${totalMinutes}:${totalSeconds}`
    //textcontent will convert as a text

    //current duration

    let currentInMinutes = Math.floor(myCurrentTime / 60)
    let currentInSeconds = Math.floor(myCurrentTime % 60)
    //percentage will give in seconds 
    if(currentInSeconds < 10)
    {
        currentInSeconds = `0${currentInSeconds}`
    }
    htmlCurrentTime.textContent = `${currentInMinutes}:${currentInSeconds}`
    //textcontent will convert as a text

    childBar.style.width = `${myCurrentTime / myTotalDuration*100}%`

})

// like button implementing
//local Storage will always  store as a key value pair
//max 5mb
// temporary sotrage 



myLike.addEventListener("click", function()
{
    //change the color to red and also storing the details song name and singer name
    myLike.style.color = "red"

    localStorage.setItem(mySingerName.textContent, mySongName.textContent)


})
myLike.addEventListener("dblclick", function()
{

    myLike.style.color = "white"

    localStorage.removeItem(mySingerName.textContent)
})

myShuffle.addEventListener("click", function()
{

    const songPositionNo = Math.floor(Math.random() * musicInfo.length)

    updateSong(musicInfo[songPositionNo])

    playTheAudio()

})


//seeking


const parentBar = document.querySelector(".parentProgressBar")

parentBar.addEventListener("click", function(output)
{

// console.log(output.offsetX)
// console.log(output.srcElement.offsetWidth)
const cickPercentage = output.offsetX/ output.srcElement.offsetWidth*100

childBar.style.width = `${cickPercentage}`

myAudio.currentTime = output.offsetX/ output.srcElement.offsetWidth * myAudio.duration

//console.log( output.offsetX/ output.srcElement.offsetWidth * myAudio.duration)

//0.56*125 = 70==>1:10secs

})
