import { Redirect } from 'react-router'

export const getBlog = async () => {
    try {
        const res = await fetch(
            'https://blog-website-sharad.herokuapp.com/blog',
            {
                method: 'GET',
                credentials: 'include',
            }
        )

        return res
    } catch (err) {
        console.log(err)
    }
}

export const postBlog = async (data) => {
    console.log(localStorage.getItem('jwt'))
    const obj = JSON.parse(localStorage.getItem('jwt'))
    data.formData.set('userid', obj.user)
    data.formData.set('email', 'dummyemail@gmail.com')
    console.log(data)

    const res = await fetch(
        'https://blog-website-sharad.herokuapp.com/createblog',
        {
            method: 'POST',
            credentials: 'include',
            body: data.formData,
        }
    )

    return res
}

export const deleteBlog = async (id) => {
    const res = await fetch(
        `https://blog-website-sharad.herokuapp.com/deleteblog/${id}`,
        {
            method: 'DELETE',
            credentials: 'include',
        }
    )
    return res
}

export const updateBlog = async (data) => {
    const res = await fetch(
        'https://blog-website-sharad.herokuapp.com/updateblog',
        {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
    )
    return res
}

export const getBlogDetails = async (data) => {
    const res = await fetch(
        `https://blog-website-sharad.herokuapp.com/blog/${data}`,
        {
            method: 'GET',
            credentials: 'include',
        }
    )
    return res
}
