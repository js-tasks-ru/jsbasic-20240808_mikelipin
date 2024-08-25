function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  for (let i = 0; i < friends.length; i++) {
    const li = document.createElement('li');
    li.textContent = `${friends[i].firstName} ${friends[i].lastName}`;
    ul.appendChild(li);
  }

  return ul;
}
