const emailInput = document.querySelector('.e-mail');
const error = document.getElementById('error');
const nameError = document.getElementById('nameError');
const messageError = document.getElementById('messageError');
const submitButton = document.querySelector('.form-btn');
const commentsList = document.querySelector('.comments-list');
const currentName = document.getElementById('name')
const currentMessage = document.getElementById('message')
const currentDate = document.getElementById('date')


currentName.onblur = function () {
  if (!currentName.value) {
    currentName.classList.add('invalid');
    nameError.style.display = 'flex';
    nameError.innerHTML = 'Пожалуйста, введите имя.'
  }
};

currentName.onfocus = function () {
  if (this.classList.contains('invalid')) {
    this.classList.remove('invalid');
    nameError.style.display = 'none';
  }
};

emailInput.onblur = function () {
  if (!emailInput.value.includes('@' && '.')) {
    emailInput.classList.add('invalid');
    error.style.display = 'flex';
    error.innerHTML = 'Пожалуйста, введите правильный email.'
  }
};

emailInput.onfocus = function () {
  if (this.classList.contains('invalid')) {
    this.classList.remove('invalid');
    error.style.display = 'none';
  }
};

currentMessage.onblur = function () {
  if (!currentMessage.value) {
    currentMessage.classList.add('invalid');
    messageError.style.display = 'flex';
    messageError.innerHTML = 'Пожалуйста, введите сообщение.'
  }
};

currentMessage.onfocus = function () {
  if (this.classList.contains('invalid')) {
    this.classList.remove('invalid');
    messageError.style.display = 'none';
  }
};

const dateCalculate = (date) => {
  let now = new Date();
  let day, month, year;
  let nowDay = now.getDate();
  let nowMonth = now.getMonth() + 1;
  let nowYear = now.getFullYear();
  day = date.value.substring(8, 10)
  month = date.value.substring(5, 7)
  year = date.value.substring(0, 4)
  nowMonth.toString().length === 1 ? nowMonth = `0${nowMonth}` : nowMonth;
  let hour = now.getHours();
  let minutes = now.getMinutes();
  minutes.toString().length === 1 ? minutes = `0${minutes}` : minutes;
  currentDate.value.toString().length === 0 ? date.textContent = Date.now().toString() : date.textContent = currentDate.value;
  if (`${nowYear}-${nowMonth}-${nowDay}` === date.value || date.value.length === 0) {
    return `сегодня, ${hour}:${minutes}`;
  } else if (nowDay - date.value.substring(8, 10) === 1) {
    return `вчера, ${hour}:${minutes}`;
  } else if (nowYear.toString() === date.value.substring(0, 4)) {
    return `${day}.${month} ${hour}:${minutes}`
  } else return `${day}.${month}.${year} ${hour}:${minutes}`
}

const toggleLike = (img) => {
  if (!img.classList.contains('active')) {
    img.classList.add('active');
    img.src = 'assets/svg/heart-png-15.png';
  } else {
    img.classList.remove('active')
    img.src = 'assets/svg/heart.svg';
  }
}

const createComment = () => {
  if (currentName.value.length > 0 && currentMessage.value.length > 0 && !(emailInput.classList.contains('invalid'))) {
    const comment = document.createElement('div');
    const dataWrapper = document.createElement('div');
    const description = document.createElement('div');
    const name = document.createElement('span');
    const date = document.createElement('span');
    const imgWrapper = document.createElement('div');
    const img = document.createElement('img');
    const btn = document.createElement('button')
    const textArea = document.createElement('textarea');
    textArea.value = currentMessage.value;
    img.src = "./assets/svg/heart.svg";
    img.height = 15;
    img.width = 15;
    name.textContent = currentName.value;
    date.textContent = dateCalculate(currentDate);
    textArea.classList.add('message')
    description.classList.add('userdata');
    imgWrapper.classList.add('img-wrapper');
    comment.classList.add('comment');
    btn.classList.add('delete-btn');
    dataWrapper.classList.add('userdata-wrapper');
    img.addEventListener('click', () => toggleLike(img))
    btn.addEventListener('click', () => {
      comment.remove()
    });
    imgWrapper.append(img, btn);
    description.append(name, date);
    dataWrapper.append(description, imgWrapper);
    comment.append(dataWrapper, textArea);
    commentsList.append(comment);
  }
}

submitButton.addEventListener('click', createComment);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    createComment()
  }
});
