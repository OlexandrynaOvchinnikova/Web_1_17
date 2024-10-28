
function expandContract(button) {
    const container = button.closest('.col-xl-3').querySelector('.expand-container');

    if (container.classList.contains('collapsed')) {
        container.classList.remove('collapsed');
        container.classList.add('expanded');
    } else {
        container.classList.remove('expanded');
        container.classList.add('collapsed');
    }
}

function expandContract_1(button) {
    const container = button.closest('.row').nextElementSibling;

    if (container.classList.contains('expanded')) {
        container.classList.remove('expanded');
    } else {
        container.classList.add('expanded');
    }
}
// !!!!!


// Функція для згортання/розгортання контенту
function toggleCollapse(element) {
    // Знаходимо найближчий батьківський ul
    const parentUl = element.closest('ul');

    // Перемикаємо клас collapsed на елементі li
    const isCollapsed = element.parentElement.classList.toggle('collapsed');

    // Знаходимо всі дочірні елементи ul до закриваючого тега
    const content = Array.from(parentUl.children);
    const startIndex = content.indexOf(element.parentElement);

    for (let i = startIndex + 1; i < content.length; i++) {
        if (isCollapsed) {
            content[i].style.display = 'none'; // Ховаємо елементи
        } else {
            content[i].style.display = 'list-item'; // Показуємо елементи
        }
    }
}

// Додаємо подію натискання для елементів з класом `header-toggle`
document.querySelectorAll('.header-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        toggleCollapse(this); // Викликаємо функцію на самій кнопці
    });
});



// !!!!

const sliders = document.getElementsByClassName("my_input");

for (let slider of sliders) {
    const min = slider.min;
    const max = slider.max;
    const value = slider.value;

    slider.style.background = `linear-gradient(to right, #FE4A01FF 0%, #FE4A01FF ${(value - min) / (max - min) * 100}%, #DEE2E6 ${(value - min) / (max - min) * 100}%, #DEE2E6 100%)`;

    slider.oninput = function () {
        this.style.background = `linear-gradient(to right, #FE4A01FF 0%, #FE4A01FF ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 ${(this.value - this.min) / (this.max - this.min) * 100}%, #DEE2E6 100%)`;
    };
}

