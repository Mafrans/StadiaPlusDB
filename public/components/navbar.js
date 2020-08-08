var component = {
    template: `
        <div class="navbar">
            <div class="container">
                <div class="nav-logo-container">
                    <img class="nav-logo" src="/images/logo.svg">
                    <h1 class="nav-logo-title">STADIA+</h1>
                    <h1 class="nav-logo-db">DB</h1>
                </div>

                <slot></slot>

                <!--div class="nav-user">
                    <img class="nav-avatar" :src="avatar">
                    <div class="nav-name-container">
                        <h2 class="nav-username">{{ username }}</h2>
                        <h3 class="nav-tag">#{{ tag }}</h3>
                    </div>
                    <i class="material-icons">arrow_drop_down</i>
                </div-->
            </div>
        </div>
    `,

    props: [ 'avatar', 'username', 'tag' ]
};

export default component;