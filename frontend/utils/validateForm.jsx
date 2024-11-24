function ValidateForm(formData, setErrors) {
    const validations = [
        {
          field: "name",
          isValid: formData.name !== null && formData.name.length > 0,
        }, {
          field: "email",
          isValid: formData.email && formData.email.length > 0,
        }, {
          field: "password",
          isValid: formData.password && formData.password.length > 0,
        }, {
          field: "confirmPassword",
          isValid: formData.confirmPassword && formData.confirmPassword === formData.password,
        }
    ]

    let isFormValid = true;
    validations.forEach(({field, isValid}) => {
      if (!isValid) {
          isFormValid = false;
          setErrors((error) => ({ ...error, [field]: true }));
      }
    });
    return isFormValid;
}

export default ValidateForm
