import profileReducer from "./profile-reducer";

let initialState = {
    myProfile: {
        aboutMe: "I lern React!",
        contacts: {
            facebook: 'facebook.com',
            website: null,
            vk: null,
            twitter: null,
            instagram: 'instagram.com',
            youtube: 'youtube.com',
            github: 'github.com',
            mainLink: null
        },
        lookingForAJob: true,
        LookingForAJobDescription: "Looking for a cool job!",
        fullName: 'John Smith',
        userId: 5555,
        photos: {
            small: 'https://s23527.pcdn.co/wp-content/uploads/2017/01/85.png',
            large: 'https://s23527.pcdn.co/wp-content/uploads/2017/01/85.png'
        },
        status: 'Hello friends!!!'
    }
};

const settingsReducer = (state = initialState, action) => {


            return state;


}



export default settingsReducer