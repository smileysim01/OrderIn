function ValidatePwd(formData, setErrors) {
    const validations = [
        {
          field: "email",
          isValid: formData.email && formData.email.length > 0,
        }, {
          field: "newPassword",
          isValid: formData.newPassword && formData.newPassword.length > 0,
        }, {
          field: "confirmPassword",
          isValid: formData.confirmPassword && formData.confirmPassword === formData.newPassword,
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

export default ValidatePwd
