

function showUsers() {

    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.createElement('ul');
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.username}, ${user.email}, ${user.password}, ${user.role}`;
                userList.appendChild(li);
            });
            document.body.appendChild(userList);
        })
        .catch(error => console.error('Error fetching users:', error));
}