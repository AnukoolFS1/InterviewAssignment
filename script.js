const btn = document.getElementById('contactUs');
const contactUs = document.getElementById('Division');
const contactPopup = document.getElementById('ContactPopup');
const inputRel = document.querySelectorAll('[popupinput]');
const Terms = document.getElementById('checkTerms');
const closeContact = document.getElementsByClassName('closeContact')[0];
const Slider = document.getElementById('Slider');
const Sliddings = document.getElementById('slidding');
const bulletsClick1 = document.getElementById('firstSlide');
const bulletsClick2 = document.getElementById('secondSlide');
const bulletsClick3 = document.getElementById('thirdSlide');
const slideshow = document.getElementById('slideshow');
const imageContext = document.querySelectorAll('.imageContext')

const contactData = {
    email: '',
    firstName: '',
    lastName: ''
}

let tAndC = false;

const images = ['./images/pie.jpg', './images/image@2x.png', './images/coffee.jpg']
let chngImgs = 0

const PopUp = () => {
    contactUs.style.display = "grid";
    contactPopup.animate([{ transform: "translateY(100px)", opacity: ".1" }, { transform: "translateY(0px)", opacity: "1" }], { duration: 200, iterations: 1, fill: "forwards" })
}

const spanRule = (e) => {
    const span = e.target.parentElement.children[1];
    if (e.target.value.length > 0) {
        span.style.top = '-14px';
        span.style.left = '1px';
        span.style.scale = '.8';
    } else {
        span.style.top = '';
        span.style.left = '';
        span.style.scale = '';
    }
}

function updateTerms() {
    this.checked === true ? tAndC = true : tAndC = false;
}

function UpdateValues() {
    const span = this.parentElement.children[1].children[0]
    if (this.value.length > 0) {
        span.style.visibility = "hidden"
    } else {
        span.style.visibility = "visible"
    }
    contactData[this.name] = this.value;
}

function submitContactDetails(e) {
    e.preventDefault();
    const Success = document.getElementById('Success')
    if (tAndC) {
        if (contactData.email && contactData.firstName && contactData.lastName) {
            fetch("https://getform.io/f/axojogwb", {
                method: "POST",
                body: JSON.stringify(contactData),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    for (let e of inputRel) {
                        e.value = ''
                    }
                    Terms.checked = false;
                    Success.style.display = 'flex'
                    setTimeout(() => {
                        contactUs.style.display = "none"
                        Success.style.display = 'none'
                    }, 2000)
                    console.log(response);
                })
                .catch(error => console.log(error))
        } else {
            alert('Kindly fill all the details')
        }
    } else {
        alert('Kindly check the terms and conditions')
    }
}

btn.onclick = PopUp

for (const e of inputRel) {
    e.onblur = spanRule
    e.oninput = UpdateValues
}

closeContact.onclick = () => {
    contactUs.style.display = 'none'
}

Terms.onchange = updateTerms;

contactUs.onsubmit = submitContactDetails;

let scrollposition = 0;
let bulletclass = 0;
bulletsClick1.classList.add('highlight-bullet');
setInterval(() => {
    if (window.scrollY > 650) {
        if (scrollposition > 659) {
            scrollposition = 0;
            bulletclass = 0;
        } else {
            scrollposition += 330;
            bulletclass++
        }

        if (bulletclass === 0) {
            bulletsClick1.classList.add('highlight-bullet');
            bulletsClick2.classList.remove('highlight-bullet');
            bulletsClick3.classList.remove('highlight-bullet');
        } else if (bulletclass === 1) {
            bulletsClick2.classList.add('highlight-bullet');
            bulletsClick1.classList.remove('highlight-bullet');
            bulletsClick3.classList.remove('highlight-bullet');
        } else {
            bulletsClick3.classList.add('highlight-bullet');
            bulletsClick1.classList.remove('highlight-bullet');
            bulletsClick2.classList.remove('highlight-bullet');
        }

        Slider.scrollTo({
            top: 0,
            left: scrollposition,
            behavior: 'smooth'
        })

    }
}, 3000);

bulletsClick1.onclick = () => {
    Slider.scrollTo({
        top: 0,
        left: 1,
        behavior: 'smooth'
    })
    scrollposition = 0;
    bulletclass = 0;
    bulletsClick1.classList.add('highlight-bullet');
    bulletsClick2.classList.remove('highlight-bullet');
    bulletsClick3.classList.remove('highlight-bullet');
}
bulletsClick2.onclick = () => {
    Slider.scrollTo({
        top: 0,
        left: 330,
        behavior: 'smooth'
    })
    scrollposition = 330;
    bulletclass = 1;
    bulletsClick2.classList.add('highlight-bullet');
    bulletsClick1.classList.remove('highlight-bullet');
    bulletsClick3.classList.remove('highlight-bullet');
}
bulletsClick3.onclick = () => {
    Slider.scrollTo({
        top: 0,
        left: 660,
        behavior: 'smooth'
    })
    scrollposition = 660;
    bulletclass = 2;
    bulletsClick3.classList.add('highlight-bullet');
    bulletsClick2.classList.remove('highlight-bullet');
    bulletsClick1.classList.remove('highlight-bullet');
}

setInterval(() => {
    chngImgs = ++chngImgs % images.length
    console.log(chngImgs);
    slideshow.src = images[chngImgs];
    imageContext[chngImgs].classList.add('imageContext-background')
    if (chngImgs === 0) {
        imageContext[images.length - 1].classList.remove('imageContext-background')
    }else{
        imageContext[chngImgs - 1].classList.remove('imageContext-background')
        
    }
}, 4000)
