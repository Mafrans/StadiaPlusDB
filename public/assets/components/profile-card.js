var component = {
    template: `
        <div @click="$emit('click')" class="profile-card uk-width-1-1@xs uk-width-1-2@s uk-width-1-3@m uk-width-1-4@xl uk-inline">
            <div class="content border-light-gray uk-flex-inline uk-flex-middle uk-width-1-1">
                <img class="avatar" alt="user.username + '\'s profile'" :src="user.avatar">
                <div class="uk-margin-left">
                    <p 
                        class="c-dark-gray uk-text-bold" 
                        v-text="user.username"
                    ></p>
                    
                    <p 
                        class="c-gray uk-text-regular"
                        v-if="user.tag != '0000'"
                        v-text="'#' + user.tag"
                    ></p>
                    
                    <p 
                        class="c-gradient uk-text-medium"
                        v-else
                    >
                        <img src="/images/founder.svg" style="height: 18px; margin-bottom: 3px">
                        Founder
                    </p>
                </div>
                <div class="click-icon uk-margin-expand-left">
                    <i class="material-icons">arrow-forward</i>
                </div>
            </div>
        </div>
    `,

    props: [ 'user' ]
};

export default component;