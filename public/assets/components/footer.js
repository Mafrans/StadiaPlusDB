var component = {
    template: `
       <div class="footer bg-light-gray uk-margin-xlarge-top uk-padding uk-width-1-1">
            <div class="uk-container uk-container-large">
                <div class="uk-grid-medium" uk-grid>
                    <a @click="goToHome()" class="c-gradient uk-text-bold uk-margin-medium-right">STADIA+</a>
                    <a class="c-dark-gray uk-text-medium">Discord</a>
                    <a class="c-dark-gray uk-text-medium">GitHub</a>
                    <a class="c-dark-gray uk-text-medium">Help & docs</a>
                </div>
                <div class="uk-margin-medium-top">
                    <p>
                        Developed and maintained by
                        <a class="c-tomato" href="https://github.com/Mafrans" target="_blank">Malte "Mafrans" Klüft</a>. UI design
                        by <a class="c-tomato" href="https://github.com/marcusbillman" target="_blank">Marcus Billman</a>.
                    </p>
                    <p>Stadia is a trademark of Google LLC. Stadia+ is not affiliated with Stadia or Google.</p>
                </div>
            </div>
        </div>
    `,
    
    methods: {
        goToHome() {
            location.href = location.origin;
        }
    }
};

export default component;