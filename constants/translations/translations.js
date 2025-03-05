const translations = {
    en: {
      header: { welcome: "Welcome to our website!" },
      buttons: { logout: "Logout" },
      errors: { network: "Network error. Please try again" },
      password: {
        status: {
            weak: "Weak Password",
            meetStrength: "Password needs to meet strength requirement"
        },
        reset: {
            OldAndNewPasswordDoesNotMatch: "Both new password and confirming new password does not match",
            invalidCredentials: "Invalid credentials",
            incorrectQuestion: "Security Question is incorrect",
            incorrectAnswer: "Security Answer is incorrect",
            couldNotBeReset: "Password could not be reset"
        },
        successful: {
            successfulReset: "Successfully reset password"
        }
      }
    },
    fr: {
      header: { welcome: "Bienvenue sur notre site!" },
      buttons: { logout: "Se déconnecter" },
      errors: { network: "Erreur réseau. Veuillez réessayer." }
    }
  };
  
  const getTranslation = (key, lang = "en") => {
    return key.split(".").reduce((obj, k) => (obj && obj[k] ? obj[k] : key), translations[lang]);
  };
  
  // Usage
  console.log(getTranslation("buttons.logout", "fr")); // Output: Se déconnecter

  export { translations, getTranslation };