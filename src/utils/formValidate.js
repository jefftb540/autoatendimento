export function showError(input, msg) {
  const nextSibiling = input.nextElementSibling;
  nextSibiling.classList.remove('hidden');
  nextSibiling.innerHTML += `${msg}<br />`;
}

export function clearErrors(messages) {
  messages.forEach((message) => {
    message.classList.add('hidden');
    // eslint-disable-next-line no-param-reassign
    message.innerHTML = '';
  });
}

export function validateEmptyFields(fields) {
  let validForm = true;
  fields.forEach((field) => {
    if (field.value === '') {
      showError(field, 'O campo não pode estar em branco');
      validForm = false;
    }
  });

  return validForm;
}
