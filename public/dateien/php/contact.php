
<?php

?>

<body>
    <section id="homepage_section1">

        <nav class="homepage_navbar">
            <h4 id="homepage_navbar_portfolio" style="font-size: 1.5em;">Portfolio</h4>
            <div id="homepage_navbar_oben">
                <a class="homepage_navbar_link" href="../../index.html"><p>Home</p></a>
                <a class="homepage_navbar_link" href="./dateien/html/projects.html">Projects</a>
                <a class="homepage_navbar_link" href="./dateien/html/aboutMe.html" >About Me</a>
                <a style="color: #8597ff; " class="homepage_navbar_link" href="./dateien/html/contact.html" ><p style="border-bottom: #8597ff    solid 2px; padding-bottom: 0.2vw;">Contact</p></a>
            </div>
        </nav>

        <form 
                action="https://formspree.io/f/xnnaepal"
                method="POST">
            <h3 style="padding: 0; margin: 0;color: white;">Contact me here</h3>
            <input type="text" name="name" placeholder="Firstname">
            <input type="text" name="name" placeholder="Last name">
            <input type="email" name="email" placeholder="E-Mail">
            <textarea name="message" id="" placeholder="Tell me..."></textarea>
            
            <!-- add hidden Honeypot input to prevent spams -->
            <input type="hidden" name="_gotcha" style="display:none !important">
            
            <button type="submit">Send</button>
        </form>
    </section>
</body>