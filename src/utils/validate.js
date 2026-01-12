export const checkValidData = (email, password) => {

    // 1. Proper Email Regex (RFC 5322 compliant-ish)
    // Checks for standard username characters, a proper @, domain, and a top-level domain (like .com)
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

    // 2. Strong Password Regex
    // Requires: 1 digit, 1 lowercase, 1 uppercase, 1 special char, 6+ total length
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,}$/.test(password);

    if (!isEmailValid) return "Email ID isn't valid";
    if (!isPasswordValid) return "Password must be 6+ chars, with at least 1 number, 1 uppercase, 1 lowercase, and 1 special character.";

    return null;
};