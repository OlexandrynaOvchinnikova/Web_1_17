
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

function toggleCollapse(element) {
    const parentUl = element.closest('ul');

    const isCollapsed = element.parentElement.classList.toggle('collapsed');

    const content = Array.from(parentUl.children);
    const startIndex = content.indexOf(element.parentElement);

    for (let i = startIndex + 1; i < content.length; i++) {
        if (isCollapsed) {
            content[i].style.display = 'none';
        } else {
            content[i].style.display = 'list-item';
        }
    }
}

document.querySelectorAll('.header-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        toggleCollapse(this);
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


fetch('/data/data.json')
    .then(response => response.json())
    .then(data => {
        const jobList = document.getElementById('job-list');
        const awardList = document.getElementById('award-list');

        // ворк-досвід
        data.jobs.forEach(job => {
            const li = document.createElement('li');
            li.innerHTML = `
                        <b>${job.position}</b> ${job.years}
                        <h3><span class="not_bold">${job.company}</span></h3>
                        <p>${job.description}</p>
                    `;
            jobList.appendChild(li);
        });

        // нагороди
        data.awards.forEach(award => {
            const li = document.createElement('li');
            li.innerHTML = `
                        <b>${award.title}</b>
                        <h3><span class="not_bold">${award.company}</span> <b class="sec_bold">${award.years}</b></h3>
                        <p>${award.description}</p>
                    `;
            awardList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });

