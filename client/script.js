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
    last_skill = "";
    last_cat="";

    show_skills_tab(id){
        //if there was last shown tab, then hide it so the new one can appear
        if(this.last_tab !== ""){
            document.getElementById(this.last_tab).style.display = "none";
        }
        if(this.last_tab == id){
            this.last_tab = ""
            return
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


    show_details(id, cat){
        if(this.last_skill !== ""){
            const last_button = document.getElementById(this.last_skill);
            document.getElementById(this.last_cat).appendChild(last_button);
            document.getElementById("skill_details_text").innerHTML = "";
        }

        //make it so it disappears when clicking on the shown skill again
        const child = document.querySelector(`#${cat} > #${id}`);
        if(this.last_skill == id && this.last_cat == cat){
            return
        }
        document.getElementById("skill_details").prepend(child);
        document.getElementById("skill_details_text").innerHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`;

        this.last_skill = id;
        this.last_cat = cat;
    }
}

const skill_tab = new skills_tab();