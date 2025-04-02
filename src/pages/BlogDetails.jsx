import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'



const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        if (!data.success) {
          toast.error(data.message || 'Blog not found');
          navigate('/');
          return;
        }
        setBlog(data.data);
      } catch (err) {
        console.error('API Error:', err);
        toast.error(err.response?.data?.message || 'Failed to load blog');
        navigate('/');
      }
    };
    fetchBlog();
  }, [id, navigate]);

  if (!blog) return <div className="container py-8 text-center">Loading...</div>

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-4">{blog.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Posted on {new Date(blog.createdAt).toLocaleDateString()}</span>
          {user?.email === blog.email && (
            <div className="space-x-4">
              <Link 
                to={`/blogs/${blog._id}/edit`}
                className="text-indigo-600 hover:underline"
              >
                Edit
              </Link>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogDetails