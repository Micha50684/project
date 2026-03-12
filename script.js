(function () {
    const classButtons = document.querySelectorAll('.classes button');
    const dropdowns = document.querySelectorAll('.subjects-dropdown');

    if (!classButtons.length || !dropdowns.length) return;

    function hideAllDropdowns() {
        dropdowns.forEach(d => {
            d.style.display = 'none';
        });
    }

    classButtons.forEach(button => {
        const dropdown = button.nextElementSibling;
        if (!dropdown || !dropdown.classList.contains('subjects-dropdown')) {
            return;
        }

        button.addEventListener('click', function (event) {
            event.stopPropagation();

            const isVisible = dropdown.style.display === 'block';
            hideAllDropdowns();
            dropdown.style.display = isVisible ? 'none' : 'block';
        });
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });

    document.addEventListener('click', function () {
        hideAllDropdowns();
    });
})();