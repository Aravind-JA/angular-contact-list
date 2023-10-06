function validateName(name: string) {
    const nameRegex = /^[a-zA-Z]+$/;
    if (name.trim() !== '' || nameRegex.test(name)) {
        return true;
    } else {
        return false;
    }
}


function validatePhone(num: Number) {
    const phoneRegex = /^[1-9]\d{9}$/;
    if (phoneRegex.test(num.toString())) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(mail: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(mail)) {
        return true;
    } else {
        return false;
    }
}

module.exports = { validateName, validatePhone, validateEmail };