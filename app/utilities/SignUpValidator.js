import { getTranslation } from '../../constants/translations/translations';
import PasswordStrengthEvaluator from './PasswordStrengthEvaluator';

export default class SignUpValidator {
  static validate(form) {
    const evaluator = new PasswordStrengthEvaluator();

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      return getTranslation('signUp.fillAllFields');
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(form.email)) {
      return getTranslation('signUp.enterValidEmail');
    }

    const passwordStrength = evaluator.validatePassword(form.password).title;
    if (passwordStrength !== "Strong Password") {
      return "weak-password";
    }

    if (!form.dateOfBirth) {
      return getTranslation('signUp.DoBNotPopulated');
    }

    const datePattern = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
    if (!datePattern.test(form.dateOfBirth)) {
      return getTranslation('signUp.correctDobFormat');
    }

    const [month, day, year] = form.dateOfBirth.split("-");
    const dobDate = new Date(year, month - 1, day);
    const ageInYears = (new Date() - dobDate) / (1000 * 60 * 60 * 24 * 365);
    if (ageInYears < 18) {
      return getTranslation('signUp.eighteenOrOlder');
    }

    if (!form.sex || form.sex === "Select your Sex") {
      return getTranslation('signUp.populateSexDropdown');
    }

    if (!form.securityQuestion || form.securityQuestion === "Select your Security Question") {
      return getTranslation('signUp.populateSecurityQuestion');
    }

    if (!form.countryRegion || form.countryRegion === "Select your Country/Region") {
      return getTranslation('signUp.populateCountry');
    }

    if (!form.securityAnswer) {
      return getTranslation('signUp.populateSecurityAnswer');
    }

    return null; // no errors
  }
}