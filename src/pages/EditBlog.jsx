import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const EditBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/blogs/${id}`)
        if (data.data.email !== user?.email) {
          toast.error('You can only edit your own blogs')
          navigate('/')
          return
        }
        setTitle(data.data.title)
        setContent(data.data.content)
      } catch (err) {
        toast.error('Failed to load blog')
        navigate('/')
      }
    }
    fetchBlog()
  }, [id, user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, { title, content })
      toast.success('Blog updated successfully')
      navigate(`/blogs/${id}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update blog')
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
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
          <div className="flex gap-4">
            <button type="submit" className="btn-primary">
              Update Blog
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBlog