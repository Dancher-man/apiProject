async function buttonClickQuote(event) {
    event.preventDefault()
    let target = event.target
    // console.log('sssss')
    // console.log(target.id)
    let url = target.href;
    // console.log(url)
    let response = await fetch(url);
    let quote_json = await response.json();
    // console.log(quote_json)
    let main_div = document.getElementById('container')
    main_div.innerHTML = ''
    let h1 = document.createElement('h1')
    main_div.appendChild(h1)
    // console.log(quote_json)
    let div_quotes = document.createElement('div')
    let p_text = document.createElement('p')
    h1.innerText = 'Все цитаты'
    let p_date = document.createElement('p')
    let link_quot = document.createElement('a')
    let rating_p = document.createElement('p')
    let button_rating_plus = document.createElement('button')
    let button_rating_minus = document.createElement('button')
    p_text.innerText = `${quote_json.description}`
    p_date.innerText = `${quote_json.created_at}`
    link_quot.href = `#`
    // link_quot.id = `link_quot-${i}`
    link_quot.className = `link_quotes`
    link_quot.innerText = `Цитата: ${quote_json.id}`
    rating_p.innerText = `Рейтинг: ${quote_json.rating}`
    button_rating_plus.innerText = 'Поднять рейтинг'
    button_rating_plus.className = 'rating_plus'
    button_rating_minus.className = 'rating_minus'
    button_rating_minus.innerText = 'уменьшить рейтинг'
    div_quotes.appendChild(p_text)
    div_quotes.appendChild(p_date)
    div_quotes.appendChild(link_quot)
    div_quotes.appendChild(rating_p)
    div_quotes.appendChild(button_rating_plus)
    div_quotes.appendChild(button_rating_minus)
    main_div.appendChild(div_quotes)
    div_quotes.style.border = "1px solid #000"
    div_quotes.style.padding = "10px"
}



async function buttonClickQuotesAll(event) {
    event.preventDefault()
    let target_quotes = event.target
    // console.log(target_quotes.id)
    let url = target_quotes.href;
    // console.log(url)
    let response = await fetch(url);
    let quotes_json = await response.json();
    // console.log(quotes_json)
    let main_div = document.getElementById('container')
    main_div.innerHTML = ''
    let h1 = document.createElement('h1')
    main_div.appendChild(h1)
    // let button = document.getElementById(`${target_album.id}`)
    // if (album_json.button_name === 'Добавить в избранное') {
    //     button.innerText = `Добавить в избранное`
    // }
    // else {
    //     button.innerText = `Удалить из избранного`
    // }
    let i = 1
    for (quote_json of quotes_json) {
        // console.log(quote_json)
        let div_quotes = document.createElement('div')
        let p_text = document.createElement('p')
        h1.innerText = 'Все цитаты'
        let p_date = document.createElement('p')
        let link_quot = document.createElement('a')
        let rating_p = document.createElement('p')
        let button_rating_plus = document.createElement('button')
        let button_rating_minus = document.createElement('button')
        p_text.innerText = `${quote_json.description}`
        p_date.innerText = `${quote_json.created_at}`
        link_quot.href = `${url}${quote_json.id}`
        link_quot.className = `link_quotes`
        link_quot.innerText = `Цитата: ${quote_json.id}`
        rating_p.innerText = `Рейтинг: ${quote_json.rating}`
        rating_p.className = 'rating'
        rating_p.id = `rating-${i}`
        button_rating_plus.innerText = 'Поднять рейтинг'
        button_rating_minus.innerText = 'уменьшить рейтинг'
        button_rating_plus.className = 'rating_plus'
        button_rating_minus.className = 'rating_minus'
        button_rating_plus.dataset.ratingPlus = `http://localhost:8000/api/v1/rating_plus/${quote_json.id}`
        button_rating_minus.dataset.ratingMinus = `http://localhost:8000/api/v1/rating_minus/${quote_json.id}`
        div_quotes.appendChild(p_text)
        div_quotes.appendChild(p_date)
        div_quotes.appendChild(link_quot)
        div_quotes.appendChild(rating_p)
        div_quotes.appendChild(button_rating_plus)
        div_quotes.appendChild(button_rating_minus)
        main_div.appendChild(div_quotes)
        div_quotes.style.border = "1px solid #000"
        div_quotes.style.padding = "10px"
        i++
    }
    let buttons = document.getElementsByClassName('link_quotes');
    let b = 1
    for (let button of buttons) {
        button.id = `button-click-${b}`
        b++
        button.addEventListener('click', buttonClickQuote)
    }

    let button_plus = document.getElementsByClassName('rating_plus');
    let buttons_minus = document.getElementsByClassName('rating_minus');
    let g = 1
    let j = 1
    for (let button of button_plus) {
        button.id = `button-plus-${g}`
        g++
        button.addEventListener('click', buttonClickRatingPlus)
    }
    for (let button_minus of buttons_minus) {
        button_minus.id = `button-minus-${j}`
        j++
        button_minus.addEventListener('click', buttonClickRatingMinus)
    }
}

async function buttonClickRatingPlus(event) {
    event.preventDefault()
    let target_rating_quotes = event.target
    // console.log(target_rating_quotes.id)
    let url = target_rating_quotes.dataset.ratingPlus;
    // console.log(url)
    let response = await fetch(url);
    let rating_plus_json = await response.json();
    // console.log(rating_plus_json)
    let rating_plus = document.getElementById(`rating-${rating_plus_json.id}`)
    // console.log(rating_plus)
    rating_plus.innerText = `Рейтинг: ${rating_plus_json.rating}`
}

async function buttonClickRatingMinus(event) {
    event.preventDefault()
    let target_rating_quotes = event.target
    // console.log(target_rating_quotes.id)
    let url = target_rating_quotes.dataset.ratingMinus;
    // console.log(url)
    let response = await fetch(url);
    let rating_minus_json = await response.json();
    // console.log(rating_minus_json)
    let rating_minus = document.getElementById(`rating-${rating_minus_json.id}`)
    // console.log(rating_minus)
    rating_minus.innerText = `Рейтинг: ${rating_minus_json.rating}`
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

async function buttonCreateQuote(event) {
    event.preventDefault()
    let target_create_quotes = event.target
    // console.log(target_create_quotes.id)
    let buttonId = document.getElementById('form_button_id')
    let url = buttonId.dataset.createQuote;
    // console.log(url)
    // console.log('adsfadsf')
    let input1 = target_create_quotes.querySelector('[name="description"]')
    let input2 = target_create_quotes.querySelector('[name="username"]')
    let input3 = target_create_quotes.querySelector('[name="email"]')
    let data = {'description': input1.value, 'username': input2.value, 'email': input3.value}
    // console.log(data)
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${url}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data),
        });
    await response.json();
    // console.log(quotes_json)

    let divAnswer = document.getElementById('container')
    let h3 = document.createElement('h2')
    if(response.ok) {
        h3.style.color = 'green'
        h3.innerText = `Цитата успешно создано`
    }
    else {
        h3.style.color = 'red'
        h3.innerText = `Ошибка ${response.error}`
    }
    divAnswer.appendChild(h3)
}

async function buttonClickCreateQuote(event) {
    event.preventDefault()
    let target_create_quotes = event.target
    // console.log(target_create_quotes.id)
    let url = target_create_quotes.href;
    // console.log(url)
    let main_div = document.getElementById('container')
    main_div.innerHTML = ''
    let h1 = document.createElement('h1')
    h1.innerText = 'Создание Цитаты'
    let div_quotes = document.createElement('div')
    let form = document.createElement('form')
    form.id = 'form_id'
    form.className = 'form-control'
    let input_desc = document.createElement('textarea')
    input_desc.name = 'description'
    input_desc.className = 'form-control my-2'
    input_desc.placeholder = 'Напишите текст'
    let input_name = document.createElement('input')
    input_name.name = 'username'
    input_name.type = 'text'
    input_name.placeholder = 'Имя владельца цитаты'
    input_name.className = 'form-control my-2'
    let input_email = document.createElement('input')
    input_email.name = 'email'
    input_email.type = 'email'
    input_email.className = 'form-control my-2'
    input_email.placeholder = 'Ваш email'
    let form_button = document.createElement('button')
    form_button.className = 'btn btn-primary my-2'
    form_button.type = 'submit'
    form_button.innerText = 'Создать'
    form_button.id = 'form_button_id'
    form_button.dataset.createQuote = `${url}`
    form.appendChild(input_desc)
    form.appendChild(input_name)
    form.appendChild(input_email)
    form.appendChild(form_button)
    div_quotes.appendChild(form)
    main_div.appendChild(h1)
    main_div.appendChild(div_quotes)
    let form_create = document.getElementById('form_id')
    form_create.addEventListener('submit', buttonCreateQuote);

}


function getQuotesAll() {
    let button = document.getElementById('list_view');
    button.addEventListener('click', buttonClickQuotesAll)
}

function createQuote() {
    let button = document.getElementById('create_quote');
    button.addEventListener('click', buttonClickCreateQuote)
}

window.addEventListener('load', createQuote);
window.addEventListener('load', getQuotesAll);