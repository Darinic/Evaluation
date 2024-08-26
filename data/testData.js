export const testData = {
    standardUser: {
        name: "daniil.arinic@sft.com",
        password: "student829",
    },
    adminUser: {
        name: "admin5@sft.com",
        password: "admin034",
    },
    invalidUser: {
        name: "invalid.user@gmail.com",
        password: "admin123",
    },
    loggedInStandardUser: "Daniil Arinic",
    loggedInAdminUser: "Admin 5",
    emptyPassword: {
        name: "standard_user",
        password: "",
    },
    emptyUsername: {
        name: "",
        password: "invalidPassword123",
    },
    emptyUsernameAndPassword: {
        name: "",
        password: "",
    },
    errorMessages: {
        loginErrorMessage: "Epic sadface: Username and password do not match any user in this service",
    },
};