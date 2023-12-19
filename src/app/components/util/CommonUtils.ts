export class CommonUtils {

  static getEmailPhone(phone: string, email: string): string {
    let addressStr = email;
    if (phone != null) {
      addressStr = addressStr != null ? email + ", " + phone : phone;
    }
    return addressStr != null ? addressStr : "";
  }
  static convertDate(number: Date): string {
    let dateString = "Today's date is: ";
    let newDate = new Date(number);
    dateString = (newDate.getMonth() + 1) + "/";
    dateString += newDate.getDate() + "/";
    dateString += newDate.getFullYear();
    return dateString;
  }
  static convertMonDay(number: Date): string {
    let newDate = new Date(number);
    return  (newDate.getMonth() + 1) + "-"+newDate.getDate() 
  }
  static getAddress(address: string, city: string, state: string, zip: string): string {
    let addressStr = address;
    if (city != null) {
      addressStr = addressStr != null ? addressStr + ", " + city : city;
    }
    if (state != null) {
      addressStr = addressStr != null ? addressStr + ", " + state : state;
    }
    if (zip != null) {
      addressStr = addressStr != null ? addressStr + ", " + zip : zip;
    }
    return addressStr != null ? addressStr : "";
  }
  static setYesNo(str: any): string {
    if (str == "1" || str == "Y" || str) return "Yes";
    else return "No";
  }
  static setStatus(str: string): string {
    if (str == "A") return "Active";
    else if (str == "I") return "Inactive";
    else if (str == "P") return "Pending";
    else return "";
  }
}