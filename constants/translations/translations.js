const translations = {
    en: {
      name: { 
        name: "Qssense",
        email: "support@qssense.com"
      },
      auth: {
        chooseAuthMethod: "Please choose your auth method. This can be reconfigured in your settings",
        basic: "Use Standard as Default Login",
        pin: "Use PIN as Default Login",
        biometric: "Use Biometric as Default Login",
        cancel: "Cancel"
      },
      contract: {
        participants: "Participants",
        details: "Contract Details",
        contractNumber: "Contract #:",
        duration: "Duration:",
        status: "Status",
        startTime: "Start Time:",
        endTime: "End Time:",
        contractSummary: "Contract Summary",
        wasContractCancelled: "Was Contract Cancelled",
        revoke: "revoke:",
        loading: "Loading ...",
        sureYouWantToRevokeContract: "Are you sure you want to revoke this contract?",
        whatIsTheReasonForRevoke: "What is the reason for revoking? (This is Optional)?",
        submitReason: "Submit Reason",
        skipReason: "Skip Reason",
        started: "Started:",
        ended: "Ended:",
        cancelledByParticipant: "Cancel Reason: By A Participant"
      },
      buttons: { 
        logout: "Logout",
        login: "Log In",
        continue: "Continue",
        scanQrCode: "Scan QR Code",
        flip: "Flip"
       },
       signUp: {
        fillAllFields: "Please fill in all the fields",
        enterValidEmail: "Please enter a valid email address",
        DoBNotPopulated: "Date of Birth Field is not populated",
        correctDobFormat: "The correct format is MM-DD-YYYY",
        eighteenOrOlder: "You have to be 18+",
        allDropdownsPopulated: "All DropDowns need to be Populated",
        populateSexDropdown: "Please populate the Sex Dropdown",
        populateSecurityQuestion: "Please populate the Security Question Dropdown",
        populateCountry: "Please populate the Country/Region Dropdown",
        populateSecurityAnswer: "Please answer the Security Answer"
       },
      errors: { network: "Network error. Please try again" },
      password: {
        text: {
            forgotPassword: "Forgot Password?",
            resetPassword: "Reset Password",
            dontHaveAnAccount: "Don't have an account?",
            alreadyHaveAnAccount: "Already Have an Account?",
            signUp: "Sign Up",
            loginInWithBasic: "Log in with Email and Password"
        },
        status: {
            weak: "Weak Password",
            meetStrength: "Password needs to meet strength requirement",
            atLeastSixCharacters: "have at least 6 characters",
            upperAndLowerCase: "Upper & lower case letters",
            aSymbol: "A Symbol (#$&)",
            atLeastOneNumber: "At least one number"
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
        hey: "Hey",
        create: "Create",
        profile: "Profile",
        settings: "Settings",
        createConsentDocument: "Create Consent Document",
        logInText: "Log in to Qssense",
        email: "Email",
        password: "Password",
        showQrCode: "Show Personal Qr-Code",
        TermsandCondition: "Terms and Condition",
        termsAndConditionPopUp: "You must accept the Terms and Conditions to proceed. Please review the terms and accept them to complete the registration",
        signIntoQsense: "Sign Up to Qssense",
        userAlreadyExists: "User already exists",
        onlyConsentNumbers: "Consent Number Should Only Contain Numbers",
        authorizeIntoConsent: ' Authorize into Consent',
        issueWhileConsenting: "Issue occurred while trying to connect to consent number",
        cameraPermission: "We need your permission to show the camera",
        revokedWithNoReason: "Revoked without a reason",
        contractStillInProgress: "Contract Still Progress",
        yes: "Yes",
        no: "No",
        allSetOnYourEnd: "All Set from Your End!",
        sucessfulRateSubmittion: "Thanks for submitting feedback",
        howToUseQssense: "How to use Qssense",
        tutorial: "Tutorial"
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
      },
      longText: {
        ProfileQrVerbage: "This mobile application offers users a personalized QR code for identity verification. Users are cautioned against scanning codes of individuals they aren't consenting to engage with in a contractual agreement. When scanning, users must authenticate their identity with a password, ensuring informed and deliberate consent in the contract process.",
        createConsentVerbage: {
          paragraphOne: "This mobile application facilitates the process of entering into consent contracts with other individuals. Users can initiate these contracts, ensuring mutual agreement and understanding between all parties involved. To commence the consent contract, both parties are required to input the same contract number along with their respective passwords, prioritizing everyone's safety and security.",
          paragraphTwo: "Once the consent contract is established, every action or update made to the active contract is meticulously documented within the application. This comprehensive documentation ensures transparency and accountability, allowing all parties to view and track the progress and history of the contract.",
          paragraphThree: "By default, the consent contract has a duration of 60 minutes.Later Updates will enable users to customize their time",
        },
        termsAndConditions: {
          consentToMessages: "Consent to Messages. When you use the Qssense, you may be given the opportunity to consent to receive communications from us through email, text, and/or mobile push notifications. Standard text and calling rates will apply. You agree that texts, calls or prerecorded messages may be generated by automatic telephone dialing systems. You can opt out of promotional communications by following the 'Unsubscribe' directions for emails, through the settings of the Qssense Product, or, if via text message, by responding STOP.",
          appPermissions: "App Permissions. When you use the Qssense Products, you may grant certain permissions to us for your device and/or accounts. Most mobile device platforms provide additional information regarding these permissions and how, if possible, to change your permission settings. By downloading, installing or using the Qssense Products, you agree to receive automatic software updates (as applicable).",
          commercialUseProhibited: "Commercial, Marketing, or Branding Use Prohibited. Except as expressly licensed, we do not allow uses of the Qssense Products, or other Qssense intellectual property, that are commercial or business-related, including uses in marketing or branding, or that advertise or offer to sell or promote products or services (whether or not for profit), or that solicit others (including solicitations for contributions or donations).",
          orderProcess: "The Order Process. You will have the opportunity to review and confirm your order, including delivery address (if applicable), payment method and product details. We will send you a notice when we accept your order, and our acceptance will be deemed complete and binding on both you and us at the time we send the notice. At such time, the contract for sale will be made and become binding on both you and us. The risk of loss in any goods you purchase and the responsibility to insure them passes to you when the relevant goods are delivered.",
          orderCancellations: "We reserve the right to refuse or cancel any order prior to delivery. Some situations that may result in your order being cancelled include system or typographical errors, inaccuracies in product or pricing information, product availability, fairness among customers where supplies are limited, or problems identified by our credit or fraud departments. We may require additional verification or information before accepting an order. We will contact you if any portion of your order is cancelled or if additional information is required to accept your order. If your order is cancelled after we have processed your payment but prior to delivery, we will refund your payment.",
          paymentsAndBilling: "Payments and Billing. When you provide payment information, you represent and warrant that the information is accurate, that you are authorized to use the payment method provided, and that you will notify us of changes to the payment information. We reserve the right to utilize third-party payment card updating services to obtain current expiration dates on credit and debit cards.",
          disclaimersAndLiability: "Disclaimers and Limitation on Liability. THE Qssense PRODUCTS ARE PROVIDED 'AS IS' AND 'AS AVAILABLE.' WE DISCLAIM ALL CONDITIONS, REPRESENTATIONS AND WARRANTIES NOT EXPRESSLY SET OUT IN THESE TERMS TO THE FULLEST EXTENT PERMITTED BY LAW.",
          liabilityLimitations: "WE SHALL NOT BE LIABLE TO YOU FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS AND PROPERTY DAMAGE, EVEN IF WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, NOR SHALL WE BE HELD LIABLE FOR DELAY OR FAILURE IN PERFORMANCE RESULTING FROM CAUSES BEYOND OUR REASONABLE CONTROL.",
          userGeneratedContent: "User Generated Content. The Qssense Products may ask for or allow you to communicate, submit, upload or otherwise make available text, chats, images, audio, video, contest entries or other content ('User Generated Content'), which may be accessible and viewable by the public. Access to these features may be subject to age restrictions.",
          ugcGuidelines: "Whether a Qssense Product appears on a Qssense website, service, and/or platform or is integrated with a third-party website, service, application, and/or platform, you may not submit or upload User Generated Content that is defamatory, harassing, threatening, bigoted, hateful, violent, vulgar, obscene, pornographic, or otherwise offensive or that harms or can reasonably be expected to harm any person or entity, whether or not such material is protected by law.",
          ugcLicense: "In most instances, we do not claim ownership of your User Generated Content; however, you grant us a non-exclusive, sublicensable, irrevocable, and royalty-free worldwide license under all copyrights, trademarks, patents, trade secrets, privacy and publicity rights, and other intellectual property rights for the full duration of those rights to use, reproduce, transmit, print, publish, publicly display, exhibit, distribute, redistribute, copy, index, comment on, modify, transform, adapt, translate, create derivative works based upon, publicly perform, publicly communicate, make available, and otherwise exploit such User Generated Content, in whole or in part, in all media formats and channels now known or hereafter devised (including in connection with the Qssense Products and on third-party websites, services, applications, and/or platforms), in any number of copies and without limit as to time, manner, and frequency of use, without further notice to you, without attribution (to the extent this is not contrary to mandatory provisions of applicable law), and without the requirement of permission from or payment to you or any other person or entity.",
          ugcResponsibilities: "You represent and warrant that your User Generated Content conforms to this Agreement and that you own or have the necessary rights and permissions, including, without limitation, all copyrights, music rights, and likeness rights (with respect to any person) contained in the User Generated Content, without the need for payment to any other person or entity, to use and exploit, and to authorize us to use and exploit, your User Generated Content in all manners contemplated by this Agreement. You agree to indemnify and hold us harmless from any claims or expenses (including attorneys’ fees) by any third party arising out of or in connection with our use and exploitation of your User Generated Content resulting from your breach of this Agreement.",
          additionalProvisions: "Additional Provisions",
          choiceOfForum: "Choice of Forum. You agree that any action at law or in equity arising out of or relating to this Agreement that is not subject to arbitration shall be filed, and that venue properly lies, only in the state or federal courts located in either Los Angeles, California or the borough of Manhattan, New York, New York, United States of America, and you consent and submit to the personal jurisdiction of such courts for the purposes of litigating such action.",
          choiceOfLaw: "Choice of Law. This Agreement is governed by and construed in accordance with the laws of the State of New York and the laws of the United States, without giving effect to any conflict of law principles.",
          severability: "Severability. If any provision of this Agreement shall be unlawful, void, or for any reason unenforceable, then that provision shall be deemed severable from this Agreement and shall not affect the validity and enforceability of any remaining provisions.",
          survival: "Survival. The provisions of this Agreement which by their nature should survive the termination of this Agreement shall survive such termination, including but not limited to the restrictions, disclaimers, limitations, our rights to use submitted content, and rules regarding dispute resolution.",
          waiver: "Waiver. No waiver of any provision of this Agreement by us shall be deemed a further or continuing waiver of such provision or any other provision, and our failure to assert any right or provision under this Agreement shall not constitute a waiver of such right or provision.",
        },
        postScan: {
          letOtherUserScan: "If you initiated the scan, let the participant scan your QR code. If you've just scanned your participant after being scanned, congratulations, you've entered a consentual contract!"
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