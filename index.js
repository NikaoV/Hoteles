import { hoteles } from "./src/api.js";

const today  =  new Date()
const countryfilter = document.getElementById("countries");
const pricefilter = document.getElementById("pricesFilter");
const sizesfilter = document.getElementById("sizes");
const departureDate = document.getElementById("dateFrom");
const returnDate = document.getElementById("dateTo");
const targetContainer = document.getElementById("targetContainer");

window.addEventListener("load", async () => {
  const answer = await hoteles();
  const data = await answer.json();
  
  const sectionone = document.createElement("section");
  sectionone.className = "hotels-section";
  targetContainer.appendChild(sectionone);

  const sectionitems = document.querySelector(".hotels-section");

  function addZero(date) {
    const convText = "" + date
    if (convText.length === 1) {
      return "0" + date
    } else {
      return date
    }
  }
  
  const day = today.getDate()
  const month = today.getMonth() +1
  const year = today.getFullYear()
  
  const fechaCheckIn = year  + "-" + addZero(month) + "-" + addZero(day);
  const fechaCheckOut = year  + "-" + addZero(month) + "-" + addZero(day + 1);
  
  departureDate.setAttribute("min", fechaCheckIn);
  returnDate.setAttribute("min", fechaCheckOut);


  const renderhotel = (hotel) => {
    hotel.forEach((hotel) => {
      const itemsHotels = document.createElement("div");
      itemsHotels.className = "items";
      sectionone.appendChild(itemsHotels);

      const image = document.createElement("img");
      image.setAttribute("src", hotel.photo);
      image.setAttribute("alt", hotel.name);
      image.className = "imagehotel";
      itemsHotels.appendChild(image);

      const hotelName = document.createElement("h2");
      hotelName.innerText = hotel.name;
      hotelName.className = "hotel-name";
      itemsHotels.appendChild(hotelName);

      const itemsinfo = document.createElement("div");
      itemsinfo.className = "info";
      itemsHotels.appendChild(itemsinfo);

      const sectionCountry = document.createElement("div");
      sectionCountry.className = "ItemsHotel__CountryNumbers";
      itemsinfo.appendChild(sectionCountry);

      const country = document.createElement("div");
      country.className = "ItemsHotel__Country";
      sectionCountry.appendChild(country);

      const flagCountry = document.createElement("img");
      flagCountry.className = "flag_country";
      if (hotel.country == "Argentina") {
        flagCountry.setAttribute("src", "imagenes/argentina.png");
      } else if (hotel.country == "Brasil") {
        flagCountry.setAttribute("src", "imagenes/brasil.png");
      } else if (hotel.country == "Chile") {
        flagCountry.setAttribute("src", "imagenes/chile.png");
      } else if (hotel.country == "Uruguay") {
        flagCountry.setAttribute("src", "imagenes/uruguay.png");
      }

      country.appendChild(flagCountry);

      const countryName = document.createElement("p");
      countryName.innerText = hotel.country;
      countryName.className = "countryname";
      country.appendChild(countryName);

      const roomofhotel = document.createElement("div");
      roomofhotel.innerText = hotel.rooms;
      roomofhotel.className = "rooms_section";
      sectionCountry.appendChild(roomofhotel);

      const room = document.createElement("p");
      room.innerHTML = " rooms";
      room.className = "rommtext";
      roomofhotel.appendChild(room);

      const roomGuion = document.createElement("p");
      roomGuion.innerHTML = "-";
      roomGuion.className = "guion";
      roomofhotel.appendChild(roomGuion);

      const price = document.createElement("p");
      price.className = "price";
      if (hotel.price == 1) {
        price.innerText = "$";
      } else if (hotel.price == 2) {
        price.innerText = "$$";
      } else if (hotel.price == 3) {
        price.innerText = "$$$";
      } else if (hotel.price == 4) {
        price.innerText = "$$$$";
      }
      roomofhotel.appendChild(price);

      const boton = document.createElement("button");
      boton.innerHTML = "Book It!";
      boton.className = "boton-Book";
      sectionCountry.appendChild(boton);
    });
  };
  //   Filtros

  renderhotel(data);
  const filterPrice = () => {
    const pricehotels = data.filter(
      (hotel) => pricefilter.value == hotel.price
    );
    sectionitems.innerHTML = "";
    renderhotel(pricehotels);
    if (pricefilter.value === "0") {
      renderhotel(data);
    }
  };
  // renderhotel(data);
  const filterCountry = () => {
  const countryhotels = data.filter(
    (hotel) => countryfilter.value == hotel.country
  );
  sectionitems.innerHTML = "";
  renderhotel(countryhotels);

  if (countryfilter.value === "All") {
    renderhotel(data)
  }
  }

  // renderhotel(data);
  const filterDate = () => {
    const from = new Date(departureDate.value);
    const formatfrom = new Date(
      from.getTime() + from.getTimezoneOffset() * 60000
    );
    // console.log(formatfrom);
    
    const to = new Date(returnDate.value);
    const formatto = new Date(
      to.getTime() + to.getTimezoneOffset() * 60000
    );
 

    const milisec = formatto - formatfrom;
    const filterDays = milisec /(1000 * 60 * 60 * 24);
    console.log(filterDays);
    const fData = data.filter((hotel) => milisec >= hotel.availableTo);
    console.log(fData);
   return fData
  };


  // const addFilters = () => {
  //   const totalFilters = filterPrice() && filterCountry() && filterDate() ;
  //   sectionitems.innerHTML = "";
  //   renderhotel(totalFilters)
  //   console.log(addFilters);
  // }

    
  // Fechas




  departureDate.addEventListener("change",  filterDate)
  returnDate.addEventListener("change",  filterDate)
  pricefilter.addEventListener("change", filterPrice);
  countryfilter.addEventListener("change", filterCountry);

});