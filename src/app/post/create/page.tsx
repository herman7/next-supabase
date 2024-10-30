'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { v4 as uuid } from 'uuid'
import { createClient } from '../../../utils/supabase/client'

const initialState = { title: '', content: '' }
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

export default function PostCreate() {

  const router = useRouter()

  const [post, setPost] = useState(initialState)
  const { title, content } = post

  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }

  async function createNewPost() {
    if (!title || !content) return
    const supabase = await createClient()
    const user = supabase.auth.user()
    const id = uuid()
    post.id = id
    const { data } = await supabase
      .from('posts')
      .insert([
          { title, content, user_id: user.id, user_email: user.email }
      ])
      .single()
    router.push(`/posts/${data.id}`)
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6">Create new post</h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
      <SimpleMDE
        value={post.content}
        onChange={value => setPost({ ...post, content: value })}
      />
      <button
        type="button"
        className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >Create Post</button>
    </div>
  )
}