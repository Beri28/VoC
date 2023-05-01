fetch('https://voice-of-customer1.onrender.com/allProducts')
.then(res=>res.json())
.then(data=>{
    const html=data.map(item=>{
        return `
        <div class=" col-12 col-lg-4 beri">
        <div class="card">
        <img class="card-img-top" src="../images/logo1.png">
        <div class="card-header bg-dark1 text-light " >
         <span>Name: </span><span class="name1">${item.name}</span>
        </div>   
        <div class="card-body card-info1">
        <span class="type1">${item.type}</span>
         <span>Rating:  </span>${item.rating}
        </div> 
        <div class="card-footer card-info1">
        Contact info :- +237 ${item.contact}
        </div>
        <div class="container1">
            <button type="button" class=" btn btn-primary button" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
            Rate
            </button>
            <button class="btn  btn-outline-secondary  "><a href="/${item.name}/${item.type}">More</a></button>
        </div>
        </div>
        </div>
        
        `;
    }).join('');
    document.querySelector('#row1').insertAdjacentHTML('afterbegin',html)
    $(document).ready(function(){
        let sty=document.querySelector('.tochange1')
        sty.classList.remove('active1')
        let tochange2=document.querySelector('.tochange3')
        tochange2.classList.add('active1')
        let collectibles=$(".button")
        let mName=$(".name1")
        let type1=$(".type1")
        let num=mName.length;
        const names=[];
        const options=[];
        for(let i=0;i<num;i++){
            names.push(mName[i].innerHTML)
            options.push(type1[i].innerHTML)
        }
        for(let i=0;i<collectibles.length;i++){
            $(collectibles[i]).click(function(){
                console.log(names[i])
                document.querySelector(".modal-title").textContent=names[i]
                document.querySelector(".type").value=options[i]
                document.querySelector(".name").value=names[i]
            })
        }
    })
})
