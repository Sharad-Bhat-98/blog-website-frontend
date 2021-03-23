export const getProfile = async () => {
    const data = JSON.parse(localStorage.getItem('jwt'))
    console.log(data)

    const res = await fetch(`http://localhost:4000/profile/${data.user}`, {
        method: 'GET',
        credentials: 'include',
    })

    return res
}
