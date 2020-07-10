document.addEventListener('DOMContentLoaded', () =>{
    const divDogBar = document.querySelector("div#dog-bar")
    const divDogInfo = document.querySelector("div#dog-info")
    const filterBtn = document.querySelector("button#good-dog-filter")
    

    // fetch('http://localhost:3000/pups')
    // .then(res => res.json())
    // .then(pups => allPups(pups))

    if (filterBtn.innerText == 'Filter good dogs: OFF'){
        spanAlDogs()
    }
    else {
        spanGoodDogs
    }

    function spanAlDogs(){
        while (divDogBar.children[0]){
            divDogBar.children[0].remove()
        }
        fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(pups => allPups(pups))
    }

    function spanGoodDogs(){
        while (divDogBar.children[0]){
            divDogBar.children[0].remove()
        }
        fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(pups => goodPups(pups))
    }

    function allPups(pups){
        pups.forEach(pup => addPup(pup)) 
    }

    function goodPups(pups){
        pups.filter(pup => pup.isGoodDog).forEach(goodPup => addPup(goodPup))
    }

    function addPup(pup){
        const span = document.createElement('span')
        span.innerText = pup.name
        divDogBar.append(span)

        span.addEventListener('click', () => {
           
            while (divDogInfo.children[0]){
                divDogInfo.children[0].remove()
            }

            const img = document.createElement('img')
            img.src = pup.image

            const h2 = document.createElement('h2')
            h2.innerText = pup.name

            const btn = document.createElement('button')
            function btnString(pup){
                if (pup.isGoodDog){
                    btn.innerHTML = 'Good Dog!'
                }
                else {
                    btn.innerHTML = 'Bad Dog!'
                }
            }
            btnString(pup)
            
            btn.addEventListener('click', () => {
                const configObj = {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                      },
                    body: JSON.stringify({
                        isGoodDog: !pup.isGoodDog
                    })   
                }

                fetch (`http://localhost:3000/pups/${pup.id}`, configObj)
                .then(res => res.json())
                .then(updatedPup => {
                    pup = updatedPup
                    btnString(updatedPup)
                    if (filterBtn.innerText == 'Filter good dogs: ON'){
                        spanGoodDogs()
                    }
                })
            })

            divDogInfo.append(img, h2, btn)
        })
    }

    filterBtn.addEventListener('click', () => {
        if (filterBtn.innerText == 'Filter good dogs: OFF'){
            filterBtn.innerText = 'Filter good dogs: ON'
            spanGoodDogs()
        }
        else {
            filterBtn.innerText = 'Filter good dogs: OFF'   
            spanAlDogs()
        }
    })
})