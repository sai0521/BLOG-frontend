import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import BlogCard from '../components/BlogCard'

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/user/blogs')
        setBlogs(data)
      } catch (err) {
        toast.error('Failed to load your blogs')
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">My Blogs</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBlogs