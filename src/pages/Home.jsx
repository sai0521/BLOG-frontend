import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import BlogCard from '../components/BlogCard'

const Home = () => {
    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}blogs`, { 
                    params: { page: currentPage } 
                })
                setBlogs(data?.data || [])
                setTotalPages(Math.ceil((data?.total || 0) / 10))
            } catch (err) {
                toast.error('Failed to load blogs')
                setBlogs([]) // Ensure blogs is always an array
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [currentPage])
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
            <div className="container">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 heading-gradient">Latest Posts</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Discover interesting stories and insights from our community</p>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <div className="mt-4 text-gray-500">Loading posts...</div>
                        </div>
                    </div>
                ) : (
                    <>
                        {blogs.length === 0 ? (
                            <div className="card p-12 text-center max-w-lg mx-auto">
                                <div className="bg-indigo-50 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h2>
                                <p className="text-gray-600">Be the first one to share your thoughts!</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-8">
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
                    </>
                )}
            </div>
        </div>
    )
}

export default Home