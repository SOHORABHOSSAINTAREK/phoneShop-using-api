const loadPhone = async (brand, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);

}
const displayPhone = (phones, isShowAll) => {
    // 1.Where to add 
    const PhoneContainer = document.getElementById('phone-container')
    PhoneContainer.textContent = '';

    // show more button 
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // show 12 result
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }
    toggleSpinnerLoader(false);
    phones.forEach(phone => {
        // console.log(phone);
        // 2. creat element 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-base-100 p-4 shadow-xl`;
        // 3. set innerText or innerHtml 
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Brand: ${phone.brand}</p>
            <div class="card-actions justify-end">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        // 4. append child 
        PhoneContainer.appendChild(phoneCard);

    });

}

const handleSearch = (isShowAll) => {
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    toggleSpinnerLoader(true);
    loadPhone(searchText, isShowAll);
    // searchFiled.value = ''; 
}
// loadPhone();
const toggleSpinnerLoader = (isLoading) => {
    const spinnerContainer = document.getElementById('spinner-container');
    if (isLoading) {
        spinnerContainer.classList.remove('hidden');
    }
    else if (!isLoading) {
        spinnerContainer.classList.add('hidden');
    }
}
const handleShowAll = () => {
    handleSearch(true)
}
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const ShowDetailsContainer = document.getElementById('show-details-container');
    ShowDetailsContainer.innerHTML = `
    
    <img class=" mx-auto" src="${phone?.image}" alt="">
    <h2 class="text-xl font-bold my-5">${phone?.name}</h2>
    <h3><span class="text-xl font-bold my-5">Storage: </span>${phone?.mainFeatures.storage}</h3>
    <h3><span class="text-xl font-bold my-5">Display Size: </span>${phone?.mainFeatures.displaySize}</h3>
    <h3><span class="text-xl font-bold my-5">ChipSet: </span>${phone?.mainFeatures.chipSet}</h3>
    <h3><span class="text-xl font-bold my-5">Memory: </span>${phone?.mainFeatures.memory}</h3>
    <h3><span class="text-xl font-bold my-5">Slug: </span>${phone?.slug}</h3>
    <h3><span class="text-xl font-bold my-5">ReleaseDate: </span>${phone?.releaseDate}</h3>
    <h3><span class="text-xl font-bold my-5">Brand: </span>${phone?.brand}</h3>
    <h3><span class="text-xl font-bold my-5">GPS: </span>${phone?.others.GPS}</h3>
   

    `;
    show_all_details.showModal()

}