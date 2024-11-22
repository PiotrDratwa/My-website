const observerFactory = (show_class) => {
    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add(show_class);
            } else {
                entry.target.classList.remove(show_class);
            }
        });
    });
};

function show_skills_tab(id){
    document.getElementById(id).style.display = "grid";
    document.getElementById(id).style.gridTemplateColumns = "auto auto auto";
}

const hiddenElements = document.querySelectorAll('.hidden');
const skill_buttons = document.querySelectorAll('.skill_category_button_hidden');

const observer_show = observerFactory("show");
const observer_skill = observerFactory("skill_category_button_show");


hiddenElements.forEach((el) => observer_show.observe(el));
skill_buttons.forEach((el) => observer_skill.observe(el));