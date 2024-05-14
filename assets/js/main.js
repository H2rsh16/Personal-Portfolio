
    
    // navbar toggle
    
    let nav_toggle = document.getElementById('nav-toggle');
    let nav = document.querySelector('.nav');
    let navlinks = document.querySelectorAll('.item')
    
    
    nav_toggle.addEventListener('click', ()=>{
        nav_toggle.classList.toggle('is-active')
        nav.classList.toggle('show');
        
        navlinks.forEach(
            (e)=>{
                e.addEventListener('click', ()=>{
                    nav_toggle.classList.remove('is-active')
                    nav.classList.remove('show');
                })
            }
        )
    })
    