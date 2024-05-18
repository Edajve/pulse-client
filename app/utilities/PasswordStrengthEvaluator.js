class PasswordStrengthEvaluator {
    StatusEnum = {
        WEAK: {
            title: "Weak Password",
            statusbar: "weak",
            insufficientRequirements: []
        },
        AVERAGE: {
            title: "Average Password",
            statusbar: "average",
            insufficientRequirements: []
        },
        GOOD: {
            title: "Good Password",
            statusbar: "good",
            insufficientRequirements: []
        },
        STRONG: {
            title: "Strong Password",
            statusbar: "strong",
            insufficientRequirements: []
        }
    };

    symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    upperCaseRegex = /[A-Z]/;
    numberRegex = /\d/;

    ReasonsOfInsufficiencyEnum = {
        MIN_LENGTH: "Must have at least 6 characters",
        UPPER_LOWER_CASE: "Upper & lower case letters required",
        SYMBOL_REQUIRED: "At least one symbol required",
        NUMBER_REQUIRED: "At least one number required"
    };

    validatePassword(password) {
        const listOfReasons = [];

        if (password.length <= 5) listOfReasons.push(this.ReasonsOfInsufficiencyEnum.MIN_LENGTH);
        if (!this.upperCaseRegex.test(password)) listOfReasons.push(this.ReasonsOfInsufficiencyEnum.UPPER_LOWER_CASE);
        if (!this.symbolRegex.test(password)) listOfReasons.push(this.ReasonsOfInsufficiencyEnum.SYMBOL_REQUIRED);
        if (!this.numberRegex.test(password)) listOfReasons.push(this.ReasonsOfInsufficiencyEnum.NUMBER_REQUIRED);

        let returnObj;

        switch (listOfReasons.length) {
            case 4:
                returnObj = {...this.StatusEnum.WEAK, insufficientRequirements: listOfReasons};
                break;
            case 3:
                returnObj = {...this.StatusEnum.AVERAGE, insufficientRequirements: listOfReasons};
                break;
            case 2:
                returnObj = {...this.StatusEnum.GOOD, insufficientRequirements: listOfReasons};
                break;
            case 1:
                returnObj = {...this.StatusEnum.GOOD, insufficientRequirements: listOfReasons};
                break;
            default:
                returnObj = {...this.StatusEnum.STRONG, insufficientRequirements: listOfReasons};
        }

        return returnObj;
    }
}

export default PasswordStrengthEvaluator;
