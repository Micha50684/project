(function () {
    const classButtons = document.querySelectorAll('.classes button');
    const dropdowns = document.querySelectorAll('.subjects-dropdown');

    if (classButtons.length && dropdowns.length) {
        const OPEN_DROPDOWN_KEY = 'openSubjectsDropdownIndex';

        function getDropdownIndex(dropdown) {
            // Индекс нужен, чтобы после перехода по ссылке открыть то же меню
            return Array.prototype.indexOf.call(dropdowns, dropdown);
        }

        function hideAllDropdowns() {
            dropdowns.forEach(d => {
                d.style.display = 'none';
            });
        }

        function openDropdownByIndex(index) {
            dropdowns.forEach((d, i) => {
                d.style.display = i === index ? 'block' : 'none';
            });
        }

        // Если перед переходом мы запоминали открытое меню — открываем его заново
        const savedIndexRaw = sessionStorage.getItem(OPEN_DROPDOWN_KEY);
        if (savedIndexRaw !== null) {
            const savedIndex = Number(savedIndexRaw);
            if (!Number.isNaN(savedIndex) && savedIndex >= 0 && savedIndex < dropdowns.length) {
                openDropdownByIndex(savedIndex);
            } else {
                sessionStorage.removeItem(OPEN_DROPDOWN_KEY);
            }
        }

        classButtons.forEach(button => {
            const dropdown = button.nextElementSibling;
            if (!dropdown || !dropdown.classList.contains('subjects-dropdown')) {
                return;
            }

            button.addEventListener('click', function (event) {
                event.stopPropagation();

                const isVisible = dropdown.style.display === 'block';
                const dropdownIndex = getDropdownIndex(dropdown);
                hideAllDropdowns();
                const nextVisible = !isVisible;
                dropdown.style.display = nextVisible ? 'block' : 'none';

                // Сохраняем/сбрасываем состояние для повторного открытия после перехода
                if (nextVisible) {
                    sessionStorage.setItem(OPEN_DROPDOWN_KEY, String(dropdownIndex));
                } else {
                    sessionStorage.removeItem(OPEN_DROPDOWN_KEY);
                }
            });
        });

        // Перед переходом по ссылке сохраняем, какое именно меню было открыто
        dropdowns.forEach(dropdown => {
            const index = getDropdownIndex(dropdown);
            const links = dropdown.querySelectorAll('a.subject');
            links.forEach(link => {
                link.addEventListener('click', function () {
                    sessionStorage.setItem(OPEN_DROPDOWN_KEY, String(index));
                });
            });
        });

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function (event) {
                event.stopPropagation();
            });
        });

        document.addEventListener('click', function () {
            hideAllDropdowns();
            sessionStorage.removeItem(OPEN_DROPDOWN_KEY);
        });
    }

    const urlInput = document.getElementById('urlInput');

    if (urlInput) {
        function openUrlFromInput() {
            const raw = urlInput.value.trim();
            if (!raw) {
                return;
            }

            let url = raw;

            if (!/^https?:\/\//i.test(url)) {
                url = 'https://' + url;
            }

            window.open(url, '_blank');
        }


        urlInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                openUrlFromInput();
            }
        });

        urlInput.addEventListener('dblclick', openUrlFromInput);
    }
})();