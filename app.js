/*======================================================
        EL GRAN TEATRO DEL MUNDO
        SCRIPT.JS

        PARTE 3.1

        Configuración inicial,
        loader,
        reloj y fecha
=======================================================*/





//======================================================
// ESPERA DE CARGA COMPLETA
//======================================================


window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    if (!loader) return;

    loader.style.transition = "opacity 0.5s ease";
    loader.style.opacity = "0";

    setTimeout(() => {
        loader.remove();
    }, 500);
});






//======================================================
// RELOJ EN TIEMPO REAL
//======================================================


function updateClock(){


    const clock = document.getElementById("clock");


    if(!clock) return;



    const now = new Date();



    let hours = now.getHours()
    .toString()
    .padStart(2,"0");



    let minutes = now.getMinutes()
    .toString()
    .padStart(2,"0");



    let seconds = now.getSeconds()
    .toString()
    .padStart(2,"0");



    clock.textContent =

    `${hours}:${minutes}:${seconds}`;



}





setInterval(updateClock,1000);


updateClock();







//======================================================
// FECHA ACTUAL
//======================================================


function updateDate(){


    const date = document.getElementById("date");


    if(!date) return;



    const today = new Date();



    const options={


        weekday:"long",


        year:"numeric",


        month:"long",


        day:"numeric"


    };



    date.textContent =

    today.toLocaleDateString(

        "es-ES",

        options

    );



}



updateDate();







//======================================================
// AÑO AUTOMÁTICO DEL FOOTER
//======================================================


const year = document.getElementById("currentYear");



if(year){


    year.textContent =

    new Date().getFullYear();


}







/*======================================================
                FIN PARTE 3.1

        SIGUIENTE:
        MENÚ MÓVIL,
        BOTÓN ARRIBA
=======================================================*/
/*======================================================
                PARTE 3.2

        Menú móvil,
        botón arriba,
        barra de progreso
=======================================================*/





//======================================================
// MENÚ MÓVIL
//======================================================


const menuToggle = document.querySelector(".menu-toggle");


const navLinks = document.querySelector(".nav-links");




if(menuToggle && navLinks){



    menuToggle.addEventListener("click",()=>{


        navLinks.classList.toggle("active");



        menuToggle.classList.toggle("open");



    });



}








// CERRAR MENÚ AL HACER CLICK EN UN ENLACE


document.querySelectorAll(".nav-links a")
.forEach(link=>{


    link.addEventListener("click",()=>{


        if(navLinks){


            navLinks.classList.remove("active");


        }


    });


});







//======================================================
// BOTÓN VOLVER ARRIBA
//======================================================


const backTop = document.getElementById("backToTop");




window.addEventListener("scroll",()=>{



    if(!backTop) return;



    if(window.scrollY > 500){


        backTop.classList.add("show");



    }else{


        backTop.classList.remove("show");


    }



});






if(backTop){



    backTop.addEventListener("click",()=>{


        window.scrollTo({


            top:0,


            behavior:"smooth"



        });



    });


}







//======================================================
// BARRA DE PROGRESO DE LECTURA
//======================================================


function scrollProgress(){



    const progress = document.querySelector(".scroll-progress");



    if(!progress) return;




    const scrollTop =

    document.documentElement.scrollTop;



    const height =

    document.documentElement.scrollHeight -

    document.documentElement.clientHeight;



    const percentage =

    (scrollTop / height) * 100;



    progress.style.width =

    percentage + "%";



}





window.addEventListener(

"scroll",

scrollProgress

);







/*======================================================
                FIN PARTE 3.2

        SIGUIENTE:
        MODO OSCURO/CLARO
        Y ANIMACIONES SCROLL
=======================================================*/
/*======================================================
                PARTE 3.3

        Modo oscuro/claro
        Animaciones scroll
=======================================================*/





//======================================================
// MODO OSCURO / CLARO
//======================================================



const themeButton = document.getElementById("themeButton");





// CARGAR TEMA GUARDADO


const savedTheme = localStorage.getItem("theme");



if(savedTheme === "light"){


    document.body.classList.add("light-mode");


}






if(themeButton){



    themeButton.addEventListener("click",()=>{


        document.body.classList.toggle("light-mode");



        if(
            document.body.classList.contains("light-mode")
        ){


            localStorage.setItem(

                "theme",

                "light"

            );



        }else{


            localStorage.setItem(

                "theme",

                "dark"

            );


        }



    });



}









//======================================================
// ANIMACIONES AL HACER SCROLL
//======================================================



const animatedElements = document.querySelectorAll(

    ".glass-card, section"

);






animatedElements.forEach(element=>{


    element.classList.add("hidden");


});








const observer = new IntersectionObserver(

(entries)=>{



    entries.forEach(entry=>{



        if(entry.isIntersecting){



            entry.target.classList.add(

                "show-animation"

            );



            observer.unobserve(

                entry.target

            );



        }



    });



},



{


    threshold:0.15


}

);








animatedElements.forEach(element=>{


    observer.observe(element);



});







//======================================================
// ANIMACIÓN DE IMÁGENES
//======================================================



const images = document.querySelectorAll(

    "img"

);





images.forEach(img=>{



    img.addEventListener(

        "load",

        ()=>{


            img.style.opacity="1";


        }


    );



});







/*======================================================
                FIN PARTE 3.3

        SIGUIENTE:
        CONTADORES,
        CARRUSEL,
        ACORDEONES
=======================================================*/
/*======================================================
                PARTE 3.4

        Contadores,
        carrusel,
        acordeones
=======================================================*/





//======================================================
// CONTADORES ANIMADOS
//======================================================



const counters = document.querySelectorAll(".counter-number");






counters.forEach(counter=>{


    counter.textContent="0";



    const updateCounter=()=>{


        const target =

        Number(counter.dataset.target);



        const current =

        Number(counter.textContent);




        const increment =

        target / 100;





        if(current < target){



            counter.textContent =

            Math.ceil(

                current + increment

            );



            setTimeout(

                updateCounter,

                30

            );



        }else{


            counter.textContent = target;


        }



    };





    const counterObserver =

    new IntersectionObserver(entries=>{



        if(entries[0].isIntersecting){



            updateCounter();



            counterObserver.disconnect();



        }



    });





    counterObserver.observe(counter);



});









//======================================================
// CARRUSEL AUTOMÁTICO
//======================================================



const slides = document.querySelectorAll(

".carousel-item"

);



let currentSlide = 0;






function showSlide(index){



    slides.forEach(slide=>{


        slide.classList.remove("active");


    });




    if(slides[index]){


        slides[index].classList.add(

            "active"

        );


    }



}







function nextSlide(){



    if(slides.length===0)

    return;




    currentSlide++;



    if(currentSlide >= slides.length){


        currentSlide = 0;


    }



    showSlide(currentSlide);



}






if(slides.length > 0){



    showSlide(0);



    setInterval(

        nextSlide,

        4000

    );



}









//======================================================
// ACORDEONES
//======================================================



const accordionButtons = document.querySelectorAll(

".accordion-button"

);






accordionButtons.forEach(button=>{



    button.addEventListener(

        "click",

        ()=>{



            const content =

            button.nextElementSibling;





            button.classList.toggle(

                "active"

            );





            if(content.style.maxHeight){



                content.style.maxHeight=null;



            }else{


                content.style.maxHeight =

                content.scrollHeight +

                "px";


            }



        }


    );



});







/*======================================================
                FIN PARTE 3.4

        SIGUIENTE:
        IMPRESIÓN,
        PDF,
        PARTÍCULAS
=======================================================*/
/*======================================================
                PARTE 3.5

        Imprimir,
        descargar resumen,
        partículas,
        cierre final
=======================================================*/





//======================================================
// BOTÓN IMPRIMIR PÁGINA
//======================================================


const printButton = document.getElementById(

    "printButton"

);




if(printButton){



    printButton.addEventListener(

        "click",

        ()=>{


            window.print();



        }

    );


}








//======================================================
// DESCARGAR RESUMEN
//======================================================



const pdfButton = document.getElementById(

    "downloadPDF"

);





if(pdfButton){



    pdfButton.addEventListener(

        "click",

        ()=>{



            const summary = `

EL GRAN TEATRO DEL MUNDO

Pedro Calderón de la Barca


Resumen:

El gran teatro del mundo es un auto sacramental
del Siglo de Oro español en el que Calderón utiliza
la metáfora del mundo como un escenario.

Los personajes representan diferentes condiciones
sociales y reciben un papel que deben interpretar
durante su vida.


Temas principales:

- La vida como teatro.
- La igualdad ante Dios.
- La responsabilidad humana.
- La importancia de las acciones.


Movimiento:

Barroco español.


Género:

Auto sacramental.


`;




            const blob = new Blob(

                [summary],

                {

                    type:"text/plain"

                }

            );





            const link = document.createElement(

                "a"

            );





            link.href = URL.createObjectURL(blob);




            link.download =

            "Resumen-El-gran-teatro-del-mundo.txt";





            link.click();



        }

    );


}








//======================================================
// PARTÍCULAS DE FONDO
//======================================================



const particleContainer = document.createElement(

    "div"

);



particleContainer.className =

"particles";





document.body.appendChild(

    particleContainer

);








function createParticle(){



    const particle = document.createElement(

        "span"

    );





    particle.className =

    "particle";





    particle.style.left =

    Math.random()*100 + "%";





    particle.style.animationDuration =

    (Math.random()*5 + 5)

    + "s";





    particle.style.opacity =

    Math.random();





    particleContainer.appendChild(

        particle

    );





    setTimeout(()=>{



        particle.remove();



    },10000);



}






setInterval(

    createParticle,

    300

);









//======================================================
// MENSAJE DE CARGA EN CONSOLA
//======================================================


console.log(

"🎭 El gran teatro del mundo cargado correctamente."

);






/*======================================================
                FIN SCRIPT.JS

        PROYECTO COMPLETADO
=======================================================*/