import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}blogs`, { 
        title, 
        content,
      })
      toast.success('Blog created successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create blog')
    }
  }

  return (
    <div className="container py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-gray-600 hover:text-indigo-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            required
          />
          <textarea
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field h-64"
            required
          />
          <button type="submit" className="btn-primary">Publish Blog</button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog