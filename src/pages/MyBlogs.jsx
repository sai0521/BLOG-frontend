import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import BlogCard from '../components/BlogCard'
import { useNavigate } from 'react-router-dom'

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}user/blogs`, {
          params: { page: currentPage, limit: 9 }
        })
        setBlogs(data?.data || [])
        setTotalPages(Math.ceil((data?.total || 0) / 9))
      } catch (err) {
        toast.error('Failed to load your blogs')
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [currentPage])

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
      <h1 className="text-2xl font-bold mb-6">My Blogs</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-3 mb-8">
            {blogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <nav className="inline-flex items-center bg-white rounded-full shadow-sm border border-gray-100 p-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Previous page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="hidden sm:flex items-center px-2">
                  {Array.from({ length: totalPages }, (_, i) => {
                    if (
                      i + 1 === 1 ||
                      i + 1 === totalPages ||
                      (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-8 h-8 mx-1 flex items-center justify-center rounded-full font-medium transition-all duration-200 ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
                        >
                          {i + 1}
                        </button>
                      )
                    } else if (i + 1 === currentPage - 2 || i + 1 === currentPage + 2) {
                      return <span key={i} className="px-1 text-gray-400">...</span>
                    }
                    return null
                  })}
                </div>
                
                <div className="sm:hidden px-2 font-medium text-gray-600">
                  {currentPage} / {totalPages}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Next page"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19l7-7-7-7" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MyBlogs