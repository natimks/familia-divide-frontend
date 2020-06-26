function getLocalStorageCpf() {
  return localStorage.getItem('cpf');
}

function getLocalStorageUserId() {
  return parseInt(localStorage.getItem('id'));
}

export { getLocalStorageCpf, getLocalStorageUserId };
