<template>
    <div class="main">
            <b-container class="cards" fluid="lg">
        <b-card>
            <b-card-title>About</b-card-title>
            <b-card-text>
                <p>I (<a href="https://www.dillonestrada.com">Dillon Estrada</a>) created Drumset Builder because any similar tools I've seen in the past are no longer available, and I find being able to map out a set up before actually physically putting it together to be very useful.</p>
                <p>This is a very early version of the app, so there are bound to be bugs. There are also many features that I have planned to be added in the near future, such as:</p> 
                <ul>
                    <li>updated graphics for the instruments and user uploaded finishes</li>
                    <li>adding kick pedals and hi hat stands</li>
                    <li>the ability to add your instrument information in each canvas to screenshots</li>
                    <li>and more...</li>
                </ul>
                <p>If you would like to contribute to the further development and maintenance of this app, then buy me a coffee with the button in the bottom right-hand corner.</p>
            </b-card-text>
        </b-card>
        <b-card>
            <b-card-title>Bug Reports & Feature Requests</b-card-title>
             <form name="bugs-and-features" id="bugs-and-features" method="POST" data-netlify="true">
                            <input type="hidden" name="bugs-and-features" value="bugs-and-features">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input required type="text" class="form-control" id="sender" name="sender" value=""
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input required type="email" class="form-control" id="email" name="email" value="">
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="message">Message</label>
                                <textarea required class="form-control" id="message" rows="3" name="message"></textarea>
                            </div>
                            <button id="contact-submit" type="submit" class="btn btn-primary">Submit</button>
                        </form>
        </b-card>
    </b-container>
    </div>
</template>

<script>
    export default {
        name: "About",
        head: {
            title: {
                inner: 'Drumset Builder',
                complement: 'About'
            },
            meta: [
                {name: 'description', content: "I (Dillon Estrada) created Drumset Builder because any similar tools I've seen in the past are no longer available, and I find being able to map out a set up before actually physically putting it together to be very useful."}
            ]
        },
    }
</script>

<style scoped>
.main {
    text-align: left;
}
.cards {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
</style>