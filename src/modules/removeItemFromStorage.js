const removeItemFromStorage = (index) => {
  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  if (allTodos) {
    const filteredTodos = allTodos.filter((val) => val.index !== index);
    filteredTodos.forEach((val, i) => {
      val.index = i + 1;
    });
    if (filteredTodos.length > 0) {
      window.location.reload();
    }
    localStorage.setItem('allTodos', JSON.stringify(filteredTodos));
    window.location.reload();
  }
};

export default removeItemFromStorage;