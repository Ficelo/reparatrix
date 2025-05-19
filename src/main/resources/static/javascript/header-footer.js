class HeaderReparatrix extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        const user = window.localStorage.getItem("user");

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../css/general.css">
            <link rel="stylesheet" href="../css/header.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
            <script src="login.js"></script>
            
            <div class="topbar-reparatrix">
                <div class="logo-tagline">
                    <a href="/"><img src="../images/logo%20reparatrix.png" alt="logo"></a>
                </div>
                <div class="button-group">
                    <a id="signup" href="/signup"><button>Inscription</button></a>
                    <a id="login" href="/login" hidden="false"><button>Connexion</button></a>
                    <a id="logout" hidden="true"><button onclick="logOut()">Log out</button></a>
                    <a href="/"><button class="gear-button"><img src="../images/gear.png" alt="Réglages"></button></a>
                </div>
            </div>
        `;

        const loginButton = this.shadowRoot.getElementById("login");
        const logoutButton = this.shadowRoot.getElementById("logout");
        const signupButton = this.shadowRoot.getElementById("signup");

        if(user !== null) {
            signupButton.hidden = true;
            loginButton.hidden = true;
            logoutButton.hidden = false;
        } else {
            signupButton.hidden = false;
            loginButton.hidden = false;
            logoutButton.hidden = true;
        }

    }

}
customElements.define("header-reparatrix", HeaderReparatrix);

class FooterReparatrix extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/general.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
            <link rel="stylesheet" href="../css/footer.css">
            
            <div class="footer-reparatrix">
                <div class="social-icons">
                    <a href="https://www.linkedin.com/school/isep-paris/posts/?feedView=all"><img src="images/linkedin.png" alt="LinkedIn" width="30" height="30"></a>
                    <a href="https://github.com/Ficelo/reparatrix.git"><img src="images/git.png" alt="GitHub" width="30" height="30"></a>
                    <a href="https://www.instagram.com/isepparis/?hl=fr"><img src="images/insta.png" alt="Instagram" width="30" height="30"></a>
                    <a href="https://www.youtube.com/@Isep75"><img src="images/ytb.png" alt="YouTube" width="30" height="30"></a>
                </div>
                <div class="footer-links">
                    <a href="/"><button>A propos</button></a>
                    <a href="/images/WebTechnologyProjet2025.pdf"><button>CGU</button></a>
                    <a href="/faq.html"><button>FAQ</button></a>
                </div>
            </div>
        `

    }

}
customElements.define("footer-reparatrix", FooterReparatrix);