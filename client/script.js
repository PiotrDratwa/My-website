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

const hiddenElements = document.querySelectorAll('.hidden');
const skill_buttons = document.querySelectorAll('.skill_category_button_hidden');

const observer_show = observerFactory("show");
const observer_skill = observerFactory("skill_category_button_show");


hiddenElements.forEach((el) => observer_show.observe(el));
skill_buttons.forEach((el) => observer_skill.observe(el));

class skills_tab{
    last_tab = "";

    show_skills_tab(id){
        //if there was last shown tab, then hide it so the new one can appear
        if(this.last_tab !== ""){
            document.getElementById(this.last_tab).style.display = "none"
        }

        document.getElementById(id).style.display = "grid";
        this.last_tab = id

        const children = document.getElementById(id).children;
        for (const child of children) {
            child.classList.remove('slide-in');
            void child.offsetWidth; // Force reflow to restart animation
            child.classList.add('slide-in');
        }
    }
}

const skill_tab = new skills_tab();