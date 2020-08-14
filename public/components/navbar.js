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
            </div>
        </div>
    `
};

export default component;