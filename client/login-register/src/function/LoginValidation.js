function validation(values) {
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if (values.email === ""){error.email = "Email should not empty"}
    else if (!email_pattern.test(values.email)){
        error.email = "Email didn't match"
    }else {
        error.email=""
    }

    if (values.password === ""){error.password = "password should not empty"}
    else if (!password_pattern.test(values.password)){
        error.password = "password didn't match"
    }else {
        error.password=""
    } 
    return error;
}
export default validation;