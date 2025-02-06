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
        "Nodejs":"I learned it through my university, I've done REST API and websocket projects with it",
        "REST_API":"I know how to build REST architecture in Django, Fastapi and NodeJS. I understand it deeply and have experience with it, thanks to the projects I've done in it",
        "Git":"I know how to create and manage remote directories and I understand how branches and github actions work",
        "Databases":"I researched relational and non relational databases. I know all the theory and can put it in practice in SQL or MongoDB",
        "Websocket":"I understand and know how to build applications in websocket architecture. I've built a simple Nodejs websocket demostration app",
        "C":"I deeply understand low level and system programming and have experience putting it to practice through C language. The projects I've done with it include: integrated circuit programming, python library programming, system and concurrency programming",
        "C_plus":"I know C++ on similar level to C language, although I prefer the latter i have no quarrels with using the former",
        "Assembly_x86":"I know it because of university course that I passed along with 10% of my class. It helped me understand low level more and I've actually grown quite fond of it",
        "Arduino":"I know it because of university courses, main project was Arduino IOT measurement and speech-to-text program",
        "AWS":"I am certified on it by Amazon as AWS data engineer",
        "SQL":"I have experience with creating, editing and browsing SQL databases because of my studies. My recipy app API project uses SQL database",
        "MongoDB":"I have experience, editing and browsing MongoDB databases, tournament app API I've created uses Mongodb",
        "Linux":"I have experience with it because of university courses, I know all the fundamental commands and know how to write bash scripts",
        "Docker":"I've learned it while making Recipe app API. I know how to create and manage multiple containers",
        "Concurrency":"I've done an extensive univeristy course on it, I understand deeply the theory and possible problems to encounter while programming asynchronousely. I know how to use concurrent programing in Javascript, C, C++, Golang and Python.",
        "Agile":"I understand deeply how Agile and SCRUM methodology works through my own studies",
        "SDLC":"I know all steps of the software development life cycle and understand them deeply.",
        "testing":"I know all the theory of software development. I know all kinds of testing, be it functional or non-functional"
    }

    show_skills_tab(id){
        if(this.last_skill !== ""){
            const last_button = document.getElementById(this.last_skill);
            document.getElementById(this.last_cat).appendChild(last_button);
            document.getElementById("skill_details_text").innerHTML = "";
            this.last_skill = "";
        }
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

