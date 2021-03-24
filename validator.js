class Validator{
    constructor(form) {
        this.patterns = {   //правила
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors ={ //свойство: сообщения об ошибках
            name: 'Имя содержит только буквы',
            phone: 'Телефон подчиняется шаблону +7(000)000-0000',
            email: 'E-mail выглядит как test@mail.ru, или my.test@mail.ru'
        };
        this.errorClass = 'error-msg'; 
        this.form = form;
        this.valid = false;
        this._validateForm();
    }
    validate(regexp, value){
        regexp.test(value)
    }

    _validateForm(){
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)]; //все элементы в которых есть ошибка
        for(let error of errors) { 
            error.remove(); //удаляем все элементы из этого массива
        }
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')]; //берем все инпуты
        for(let field of formFields){ //проходим их в цикле
            this._validate(field); // передаем каждый инпут в качестве параметра в метод _validate
        }
        if(![...document.getElementById(this.form).querySelectorAll('.invalid')].length) {
            this.valid = true;
        }
    }
    _validate(field){  //проверка каждого инпута на ошибку
        if(this.patterns[field.name]){ //есть правило к этому инпуту то делаем проверку
            if(!this.patterns[field.name].test(field.value)){ //если тест не проходит
                field.classList.add('invalid'); //добавляем класс инвэлид
                this._addErrorMsg(field); //затем вызываем метод эрормсж
                this._watchField(field);
            }
        }
    }
    _addErrorMsg(field){ //строит сообщение об ошибке
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div>`;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }

    _watchField(field){
        field.addEventListener('input', () => {   //добавляем событие инпут  
            if(this.patterns[field.name].test(field.value)){ //проверяем на соответствие правил, если верно то
                field.classList.remove('invalid');  // убираем класс инвэлид (красная рамка)
                field.classList.add('valid'); // добавляем класс вэлид (зеленая рамка)
                let error = field.parentNode.querySelector(`.${this.errorClass}`); //находим ошибку
                if(error){ // если была
                    error.remove(); //удаляем ошибку
                }
            }else {  // если после повторного введения ошибка остается
                field.classList.remove('valid'); //удаляем класс вэлид
                field.classList.add('invalid');  //добавляем класс инвэлид
                if(!error){ //если не было текста с ошибкой то 
                    this._addErrorMsg(field); //запускаем метод и текст с ошибкой появляется
                }
            }
        })
    }
}