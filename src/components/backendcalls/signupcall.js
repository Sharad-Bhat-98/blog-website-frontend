export const signupcall = (user) => {
    console.log(user)
    return fetch('https://blog-website-sharad.herokuapp.com/signup', {
        method: 'POST',
        credentials: 'include',
        body: user.formData,
    })
        .then((res) => {
            console.log(res.headers)
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}

export const LogoutCall = () => {
    fetch('https://blog-website-sharad.herokuapp.com/logout', {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('jwt')
            }
            console.log(res)
            window.location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
}

export const SigninCall = (user) => {
    return fetch('https://blog-website-sharad.herokuapp.com/signin', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((res) => {
            return res.json()
        })
        .catch((err) => {
            console.log(err)
        })
}

export const Authenticate = (data) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
    }
}

export const isAuthenticated = () => {
    // const result = await fetch('http://localhost:4000/isauthenticated', {
    //     method: 'GET',
    //     credentials: 'include',
    // })
    // return await result.json()

    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return true
    } else {
        return false
    }
}
