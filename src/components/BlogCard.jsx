import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 hover:text-indigo-600 transition-colors">{blog.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{blog.content}</p>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(blog.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <Link 
            to={`/blogs/${blog._id}`} 
            className="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-800 transition-colors"
          >
            Read More
            <svg className="w-4 h-4 ml-1 transition-transform transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard