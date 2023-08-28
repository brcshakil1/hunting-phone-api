const getElement = (id) => {
    const element = document.getElementById(id);
    return element
}
// console.log()
const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    if(phones.length === 0) {
        const container = getElement('phone-container');
        container.classList.add('block')
        container.innerHTML = `
            <h3 class="text-3xl text-center text-red-400 font-semibold">Searching items aren't found. Please try again</>
        `;
        toggleLoadingSpinner(false)
    } else {
        displayPhone(phones, isShowAll);
    }
    console.log(phones.length)
} 

const displayPhone = (phones, isShowAll) => {
    const phoneCardContainer = getElement('phone-container');

    // clear phone card container filed after searching
    phoneCardContainer.textContent = '';

    const showAllBtn = document.getElementById('show-all');
    if(phones.length > 12) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')
    }
    
    if(!isShowAll) {
        phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-100 rounded-none';
        phoneCard.innerHTML = `
                    <figure class="px-10 pt-10">
                      <img src="${phone.image}" alt="Phone" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>There are many variations of passages of available, but the majority have suffered</p>
                      
                      <div class="card-actions">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>

        `;
        phoneCardContainer.appendChild(phoneCard)
    });
    toggleLoadingSpinner(false);
}



// show details
const handleShowDetails = async (id) => {
    console.log('clicked details', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(phone)
    showPhoneDetails(phone)
}

const showPhoneDetails = phone => {
    // console.log(phone)
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
        <div class="bg-white flex justify-center py-16 rounded-lg">
            <img src="${phone.image}" class="text-center">
        </div>
        <h3 class="text-2xl">${phone.name}</h3>
        <p><span class="text-xl font-semibold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
        <p><span class="text-xl font-semibold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
        <p><span class="text-xl font-semibold">Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
        <p><span class="text-xl font-semibold">Memory:</span> ${phone.mainFeatures.memory}</p>
        <p><span class="text-xl font-semibold">Slug:</span> ${phone.slug}</p>
        <p><span class="text-xl font-semibold">Released:</span> ${phone?.releaseDate || "No data found"}</p>
        <p><span class="text-xl font-semibold">GPS:</span> ${phone?.others?.GPS || 'No GPS'}</p>

    `;
    // show the modal
    show_details.showModal(phone)
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchInput = document.getElementById('search-field');
    const searchText = searchInput.value;
    // console.log(searchText);
    // searchInput.value = '';
    loadPhone(searchText, isShowAll);
}


// spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    isLoading ?  
    loadingSpinner.classList.remove('hidden') 
    : loadingSpinner.classList.add('hidden')
}

const handleShowAll = ()=>  {
    handleSearch(true);
}


loadPhone()