import locations from "./store/locations";
import '../css/style.css';
import './plugins';
import formUI from "./views/form";
import ticketUI from "./views/tickets";
import currencyUI from "./views/currency";



document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form
  
  //Events
  form.addEventListener('sumbit', (e) => {
    e.preventDefault();
    onFormSubmit();
  })

  //Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiestList);
  }

  async function onFormSubmit() {
    // take data from input 

    const origin = locations.getCityCodeBykey(formUI.originValue);
    const destination = locations.getCityCodeBykey(formUI.destinationValue);
    const depart_date = formUI.deparDatePicker;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;


    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    })

    console.log(locations.lastSearch);
    ticketUI.renderTickets(locations.lastSearch);
  }
})

