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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blog._id}`);
      toast.success('Blog deleted');
      navigate('/profile');
    } catch (err) {
      toast.error('Failed to delete blog');
    }
  };

  if (!blog) return <div className="container py-8 text-center">Loading...</div>;

  return (
    <div className="container py-8">
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