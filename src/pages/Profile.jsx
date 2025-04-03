import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../api'
import { toast } from 'react-hot-toast'
import BlogCard from '../components/BlogCard'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user } = useAuth()
  const [userBlogs, setUserBlogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const { data } = await api.get('http://localhost:5000/api/user/blogs', {
          params: { 
            page: currentPage,
            limit: 10
          }
        })
        
        console.log('Profile API Response:', data) // Debug log
        
        if (data.success) {
          setUserBlogs(data.data || [])
          setTotalPages(Math.ceil((data.total || 0) / 10))
        }
      } catch (err) {
        console.error('Profile Error:', err)
        toast.error('Failed to load your blogs')
      } finally {
        setLoading(false)
      }
    }
    
    if (user?.email) fetchUserBlogs()
  }, [currentPage, user?.email])

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>
      
      {loading ? (
        <div className="text-center">Loading your blogs...</div>
      ) : userBlogs.length === 0 ? (
        <div className="text-center text-gray-500">
          No blogs found. Start by <Link to="/create" className="text-indigo-600">creating a new blog</Link>.
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userBlogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} showEdit={true} />
            ))}
          </div>
          
          {/* Pagination controls */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Profile