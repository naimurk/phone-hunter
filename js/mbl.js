

const loadData = () => {
    toggle(true)
    const inputValue = document.getElementById('input-value').value
    const URL = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(URL)
        .then(res => res.json())
        .then(data => displayPhone(data.data.slice(0, 12)))
}

const displayPhone = (data) => {
    // console.log(data)
    const phoneContainer = document.getElementById('phone-container')


   
    phoneContainer.innerHTML = '';
    if (data.length <= 12) {
        document.getElementById('show-all').classList.remove('hidden')
    }

    else {
        document.getElementById('show-all').classList.add('hidden')
    }
    if (data.length === 0) {
        document.getElementById('noFound').classList.remove('hidden')
        document.getElementById('show-all').classList.add('hidden')
    }
    else {
        document.getElementById('noFound').classList.add('hidden')
        document.getElementById('show-all').classList.remove('hidden')
    }

    data.forEach(element => {
        const { brand, image, phone_name, slug } = element

        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card m-5 w-96 bg-base-100 shadow-2xl">
        <figure><img src="${image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-active btn-secondary mx-2">Buy Now</button>
            <div class="flex items-center justify-center h-full">
                <button class="btn btn-accent mx-2" onclick="phoneDetails('${slug}')">Details</button>
            </div>
          </div>
        </div>
      </div>
        `
        phoneContainer.appendChild(div)
    });
    toggle(false)
}

const toggle = (loading) => {
    if (loading == true) {
        document.getElementById('loading').classList.remove('hidden');

    }

    else {
        document.getElementById('loading').classList.add('hidden');
    }
};

const showAll = () => {
    toggle(true)
    const inputValue = document.getElementById('input-value').value
    const URL = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(URL)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

document.getElementById('input-value').addEventListener('keypress', function (event) {

    if (event.key === 'Enter') {
        loadData()
    }
})


const phoneDetails = (id) => {
    document.getElementById('modal').classList.toggle('hidden')
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch (URL)
    .then(res => res.json())
    .then(data=>displayPhoneDetails(data.data))
}

const displayPhoneDetails = (data) => {
    console.log(data)
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = '';
    const div = document.createElement('div')
    div.innerHTML = `
    <div class = "text-black">
    <h1 class= "text-3xl" >Name: ${data.name} </h1>
    <h1 class= "mb-4 text-3xl">Brand: ${data.brand}</h1>
    <Ul>
        <h3 class="text-xl">Main Feature</h3>
        <li>chipset:  ${data.mainFeatures.chipSet} </li>
        <li>display:  ${data.mainFeatures.displaySize} </li>
        <li>Storage:  ${data.mainFeatures.storage}  </li>
        
    </Ul>
    
</div>
    `;
    modalContainer.appendChild(div)
}
// function toggleModal() {
    
// }