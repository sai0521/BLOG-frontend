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
                // Temporarily add a console.log in fetchBlogs:
                const { data } = await axios.get('http://localhost:5000/api/blogs', { params: { page: currentPage } })
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
        <div className="container py-8">
            <h1 className="text-2xl font-bold mb-6">Latest Blog Posts</h1>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    {blogs.length === 0 ? (
                        <div className="text-center text-gray-500">
                            No blogs found
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 ">
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {blogs.map(blog => (
                                        <BlogCard key={blog._id} blog={blog} />
                                    ))}
                                </div>

                                {/* Updated pagination container */}
                                <div className="w-full mt-8">
                                    <div className="flex justify-center gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`px-4 py-2 rounded ${currentPage === i + 1
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-gray-200 hover:bg-gray-300'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Home