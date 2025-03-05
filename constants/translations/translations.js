const translations = {
    en: {
      name: { name: "Qssense" },
      buttons: { 
        logout: "Logout",
        login: "Log In",
        continue: "Continue",
        scanQrCode: "Scan QR Code"
       },
      errors: { network: "Network error. Please try again" },
      password: {
        text: {
            forgotPassword: "Forgot Password?",
            resetPassword: "Reset Password",
            dontHaveAnAccount: "Don't have an account?",
            signUp: "Sign Up"
        },
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
      },
      text: {
        home: "Home",
        create: "Create",
        profile: "Profile",
        settings: "Settings",
        createConsentDocument: "Create Consent Document",
        logInText: "Log in to Qssense",
        email: "Email",
        password: "Password"
      },
      consent: {
        activeConsent: "Active Consent",
        noActiveContracts: "No Active Contracts",
        nothingToShow: "Nothing to Show",
        inProgressContracts: "In Progress Contracts",
        consentHistory: "Consent History",
        searchFilterText: "Enter user of other participants",
        button: {
          createConsentContract: "Create Consent Contract"
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

  export { translations, getTranslation };