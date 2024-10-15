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
