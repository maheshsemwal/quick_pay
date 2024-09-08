import {atom, selector} from 'recoil'
export const loggedInUser = atom({
    key : 'loggedInUser',
    default : selector({
        key : 'loggedInUserSelector',
        get : ({get}) => {
            const user = JSON.parse(localStorage.getItem('userInfo'))
            if(!user)
                return {}
            else
                return user
        }
    })
})
