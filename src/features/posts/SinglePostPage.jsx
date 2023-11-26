import { useSelector } from "react-redux"
import { useMatch } from 'react-router-dom'


export const SinglePostPage = () => {
  //get the id from matched url from router (useMatch)
  const match = useMatch("/posts/:postId")
  const { postId } = match.params

  return (
    <div className="text-white">SinglePostPage</div>
  )
}
