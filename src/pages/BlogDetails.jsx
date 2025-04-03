import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}blogs/${id}`);
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

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}blogs/${blog._id}`);
      toast.success('Blog deleted');
      navigate('/profile');
    } catch (err) {
      toast.error('Failed to delete blog');
    }
  };

  if (!blog) return <div className="container py-8 text-center">Loading...</div>;

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
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-4">{blog.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Posted on {new Date(blog.createdAt).toLocaleDateString()}</span>
          {user?.email === blog.email && (
            <div className="space-x-4">
              <Link to={`/blogs/${blog._id}/edit`} className="text-gray-600 hover:text-indigo-600">
                Edit
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {showDeleteConfirm && (
        <DeleteConfirmation
          onConfirm={() => {
            setShowDeleteConfirm(false);
            handleDelete();
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

export default BlogDetails;