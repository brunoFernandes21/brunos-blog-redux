import { useSelector } from "react-redux"
import { useMatch } from 'react-router-dom'
import { Link } from "react-router-dom"
import { allPosts } from "./postsSlice"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons"

export const SinglePostPage = () => {
  //get the id from matched url from router (useMatch)
  const match = useMatch("/posts/:postId")
  const { postId } = match.params

  //find the post in state with the same id as the parameter
  const post = useSelector(allPosts).find(post => post.id === postId)

  if(!post){
    return (
      <section className="flex justify-center items-center flex-col gap-4">
        <h2 className="text-white font-bold text-4xl">Post not found</h2>
        <Link to="/" className="text-blue-800 bg-white p-2 rounded font-bold">Go back to home</Link>
      </section>
    )
  }

  return (
    <section className="text-white post__section">
      <article className="single__post mb-8">
        <h2 className="font-bold">{post.title}</h2>
        <p>{post.content}</p>
        <span>Created: <TimeAgo timestamp={post.date}/></span>
        <p>Author: <PostAuthor userId={post.user}/></p>
        <Link to={`/editPost/${post.id}`} className="font-bold underline">Edit Post</Link>
        <ReactionButtons post={post}/>
      </article>
      <Link to="/" className="text-white border border-white p-2 rounded font-bold">Go back to home</Link>
    </section>
  )
}
