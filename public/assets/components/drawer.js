var component = {
    template: `
        <div id="drawer" uk-offcanvas="overlay: false, mode: push">
            <div class="bg-white uk-offcanvas-bar">
                <div class="uk-flex uk-flex-middle">
                    <img class="logo uk-margin-small-right" style="height: 24px" src="/images/logo.svg">
                    <h2 class="logo-title uk-text-bold c-gradient" style="letter-spacing: 2px">STADIA+</h2>
                </div>
                <button class="c-gray uk-offcanvas-close" style="padding: 10px" type="button" uk-close></button>
                <template v-for="page in pages">
                    <hr style="border-top: 1px solid #e5e5e5;">
                    <a :href="page.href">
                        <h3 class="c-gray uk-flex uk-flex-middle">
                            <i class="material-icons c-gray" style="margin-left: -2px" v-if="page.icon != null">{{ page.icon }}</i>    
                            {{ page.title }}
                        </h3>
                    </a>
                </template>
            </div>
        </div>
    `,

    data() {
        return {
            pages: [
                {
                    title: "Home",
                    icon: null,
                    href: `${location.origin}`
                },
                {
                    title: "Stadia+ DB",
                    icon: "search",
                    href: `${location.origin}/search`
                },
                {
                    title: "Help & FAQ",
                    icon: "notes",
                    href: `https://github.com/Mafrans/StadiaPlus/wiki`
                }
            ]
        }
    },
    
    mounted() {
    }
};

export default component;