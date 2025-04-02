import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{new Date(blog.createdAt).toDateString()}</span>
        <Link 
          to={`/blogs/${blog._id}`} 
          className="text-indigo-600 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  )
}

export default BlogCard