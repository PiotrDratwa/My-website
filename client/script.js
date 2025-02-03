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
    last_cat = "";
    // this variable is to determine if a detail button was clicked 2 times already, prevents a bug where it duplicates
    last_detail = 0;

    details = {
        "Javascript":"I learned it through my own studies and university. I also know React and Nodejs frameworks.Projects I've done with js include:<br>- this website<br>- React project<br>- tournament app REST",
        "HTML":"I learned it mainly through my own studies. All my web projects include html in some form, like this website, or React project",
        "CSS":"I learned it mainly through my own studies. Main project with it is definitely this portfolio website, although it's sprinkled in among other projects of mine",
        "Python":"I learned it on my own through online courses, later cemented it in university. I know popular libraries like Fastapi, Django, Pandas, Scikit-learn. Projects I've done with it include:<br>- Writing quality projections AI<br>- BlackJack AI<br>- Recipy app REST API",
        "Nodejs":"",
        "REST API":"",
        "Git":"",
        "Databases":"",
        "Websocket":"",
        "C":"",
        "C++":"",
        "Assembly x86":"",
        "Arduino":"",
        "AWS":"",
        "SQL":"",
        "Mongodb":"",
        "Linux":"",
        "Docker":"",
        "Concurrency":"",
        "Agile":"",
        "SDLC":"",
        "testing":""
    }

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
        document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        this.last_tab = id

        const children = document.getElementById(id).children;
        for (const child of children) {
            child.classList.remove('slide-in');
            void child.offsetWidth; // Force reflow to restart animation
            child.classList.add('slide-in');
        }
    }


    show_details(id, cat){
        if(this.last_skill !== "" && this.last_detail == 0){
            const last_button = document.getElementById(this.last_skill);
            document.getElementById(this.last_cat).appendChild(last_button);
            document.getElementById("skill_details_text").innerHTML = "";
        }

        //make it so it disappears when clicking on the shown skill again
        const child = document.querySelector(`#${cat} > #${id}`);
        console.log(this.last_detail)
        if(this.last_skill == id && this.last_cat == cat && this.last_detail == 0){
            this.last_detail = 1;
            return
        }
        document.getElementById("skill_details").prepend(child);
        document.getElementById("skill_details_text").innerHTML = this.details[id]

        this.last_skill = id;
        this.last_cat = cat;
        this.last_detail = 0;
    }
}

const skill_tab = new skills_tab();

