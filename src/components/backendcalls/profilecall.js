export const getProfile = async () => {
    const data = JSON.parse(localStorage.getItem('jwt'))
    console.log(data)

    const res = await fetch(
        `https://blog-website-sharad.herokuapp.com/profile/${data.user}`,
        {
            method: 'GET',
            credentials: 'include',
        }
    )

    return res
}
