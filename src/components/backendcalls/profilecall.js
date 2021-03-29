export const getProfile = async () => {
    const data = JSON.parse(localStorage.getItem('jwt'))

    const res = await fetch(
        `https://blog-website-sharad.herokuapp.com/profile/${data.user}`,
        {
            method: 'GET',
            credentials: 'include',
        }
    )

    return res
}

export const updateProfile = async (image) => {
    const data = JSON.parse(localStorage.getItem('jwt'))

    const res = fetch(
        `https://blog-website-sharad.herokuapp.com/profile/img/${data.user}`,
        {
            method: 'PATCH',
            credentials: 'include',
            body: image,
        }
    )

    return await res.json()
}
