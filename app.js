import { Navbar } from '../javascript-modules/navbar-module.js';

const imageSlider = {
    init(){
        //query the DOM
        const content = document.querySelector('.content');
        const navDiv = document.querySelector('.nav-div');
        const imageContainer = document.querySelector('.image-container');
        const mainImage = document.querySelector('.main-image');
        const pic = document.querySelector('.main-pic');
        const leftArrow = document.querySelector('.left-arrow');
        const rigthArrow = document.querySelector('.right-arrow');
        const midCircles = document.querySelector('.mid-circles');
        const dots = document.querySelector('.dots');

        //set count variable to 0
        let count = 0;

        //buildnav
        const nav = new Navbar(navDiv, '100vw', '8vh', ['home', 'about', 'contact'], 'Banana-Builds', 'yellow', './assets/banana-logo.jpg', 'blue');
        nav.buildNavbar();

        //relative path to images, will redo this in node at somepoint for a laugh
        const pictures = [
            '/image-slider/assets/arsenal.png',
            '/image-slider/assets/aston-villa.png',
            '/image-slider/assets/brentford.png',
            '/image-slider/assets/brighton__Hove_Albion_logo.svg_.png',
            '/image-slider/assets/burnley-symbol.jpg',
            '/image-slider/assets/chelsea.png',
            '/image-slider/assets/crystal-palace.png',
            '/image-slider/assets/everton.png',
            '/image-slider/assets/leeds-football-logo-1.png',
            '/image-slider/assets/leicester_city_logo-1.png',
            '/image-slider/assets/liverpool_FC.svg',
            '/image-slider/assets/man-city.jpg',
            '/image-slider/assets/man-utd.png',
            '/image-slider/assets/newcastle.jpeg',
            '/image-slider/assets/norwich.png',
            '/image-slider/assets/southampton-fc.jpg',
            '/image-slider/assets/spurs.png',
            '/image-slider/assets/watford.png',
            '/image-slider/assets/westham.png',
            '/image-slider/assets/wolves.png'
        ];

        //to hold nav dots and to hold the newly created image elements
        let dotArray = [];
        let newImageElements = [];

        //render all images
        function renderImages(){

            for(let i=0; i< pictures.length; i++){
                let allPics = document.createElement('img');
                allPics.src = pictures[i];
                allPics.className = 'slide';
                allPics.style.display = 'none';
                mainImage.appendChild(allPics);
                newImageElements.push(allPics);
                newImageElements[count].style.display = 'block';
            }
            return buildNavCircles(pictures);
        }

        function buildNavCircles(list){
            
            let totalNeeded = list.length;
            // console.log(totalNeeded)
            
           for(let i=0; i<totalNeeded; i++){
               const dot = document.createElement('div');
               dot.className = 'dots';
               midCircles.appendChild(dot);
               dotArray.push(dot);
           }
           highlightNavCircles(dotArray);
           clickableNavCircles(dotArray);
        }

        function showPics(e){
            const target = e.target;
            console.log(target)

            if(target === rigthArrow){
               count++;
               if(count > pictures.length-1){
                   count = pictures.length-1;
               }
            }else if(target === leftArrow){
                count--;
                console.log(count)
                if(count < 0){
                    count = 0;
                }
            }
    
            let newPics = document.querySelectorAll('.slide');
            
            for(let j=0; j<newPics.length; j++){
                newPics[j].style.display = 'none'
            }
            newPics[count].style.display = 'block';

            highlightNavCircles(dotArray)
        }

       

        function highlightNavCircles(circs){
            // console.log(circs)
            for(let i=0; i<circs.length; i++){
                circs[i].style.backgroundColor = '#bba';
                circs[count].style.backgroundColor = 'black';
            }
        }

        function clickableNavCircles(dots){
            let slide = document.querySelectorAll('.slide');
            let slideArray = Array.from(slide)
            
            let dotNum = 0;

            dots.forEach(dot => {
                dot.addEventListener('mouseover', () => {
                    dot.style.cursor = 'pointer';                  
                })
            }); 

            dots.map((el, ind) => {
                el.addEventListener('click', () => {
                    console.log(el, ind)
                    for(let i=0; i<slideArray.length; i++){  
                        count = ind;
                        slideArray[i].style.display = 'none';
                        slideArray[ind].style.display = 'block';
                        highlightNavCircles(dotArray)
                        // dotArray[i].style.backgroundColor = '#bba';
                        // dotArray[ind].style.backgroundColor = 'black';
                    }
                })
            })
            
            return automaticSlideshow(slideArray)
        }

        function automaticSlideshow(pics){
            //set slides to loop thru every 5 seconds
            console.log(pics)
            let timeOut = setInterval(() => {
                console.log(count)
                for(let i=0; i<pics.length; i++){
                    pics[i].style.display = 'none';
                    pics[count].style.display = 'block';
                    highlightNavCircles(dotArray)
                }
                count++;
                if(count>pics.length-1){
                    count = 0;
                }
            }, 5000);
        }
      

        //fire events and functions
        renderImages();
        leftArrow.addEventListener('click', showPics);
        rigthArrow.addEventListener('click', showPics);
    }

}
imageSlider.init();