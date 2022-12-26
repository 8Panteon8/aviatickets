import { getAutocompleteInstance, getDatepickersInstance } from '../plugins/materialize'

class FormUI {
  constructor(autocompleteInstance, detePickerInstance) {
    this._form = document.forms['locationControls'];
    this.origin = document.getElementById('autocomplete-origin');
    this.destination = document.getElementById('autocomplete-destination');
    this.depart = document.getElementById('datepicker-depart');
    this.return = document.getElementById('datepicker-return');

    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutoComplete = autocompleteInstance(this.destination);
    this.deparDatePicker = detePickerInstance(this.depart);
    this.returnDatePicker = detePickerInstance(this.return);
  }

  get form() {
    return this._form;
  }

  get originValue(){
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get deparDateValue(){
    return this.deparDatePicker.toString( )
  }

  get returnDateValue(){
    return this.returnDatePicker.toString( )
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutoComplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickersInstance);

export default formUI;