import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import BlogCard from '../components/BlogCard'

const Profile = () => {
  const [userBlogs, setUserBlogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/user/blogs', {
          params: { page: currentPage }
        })
        setUserBlogs(data.data || [])
        setTotalPages(Math.ceil((data.total || 0) / 10))
      } catch (err) {
        toast.error('Failed to load your blogs')
      } finally {
        setLoading(false)
      }
    }
    fetchUserBlogs()
  }, [currentPage])

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : userBlogs.length === 0 ? (
          <div className="text-center text-gray-500">
            You haven't written any blogs yet
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userBlogs.map(blog => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
            
            {/* Pagination Controls */}
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
    </div>
  )
}

export default Profile