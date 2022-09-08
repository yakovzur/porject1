import { useState } from "react";
import { usePostsContext } from '../hooks/usePostsContext'

const PostForm = () => {
    const { dispatch } = usePostsContext()

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [field, setField] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const post = {title, author, field};
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('');
            setAuthor('');
            setField('');
            setError(null);
            setEmptyFields([]);
            console.log('new post added', json);
            dispatch({ type: 'CREATE_POST', payload: json })
        }
    }

  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Post</h3>

        <label>Post Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={emptyFields.includes('title') ? 'error' : ''}/>

        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className={emptyFields.includes('author') ? 'error' : ''} />

        <label>Post:</label>
        <input type="text" value={field} onChange={(e) => setField(e.target.value)} className={emptyFields.includes('field') ? 'error' : ''}/>

        <button>Add Post</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PostForm