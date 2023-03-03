import React from 'react'
import { formatDistanceToNow } from 'date-fns'


const Post = React.forwardRef(({ post }, ref) => {

    const postBody = (
        <div id={post.id}>
        <div className="p-2">
        <h2 className="text-xl font-bold">{ post.title }</h2>
    

        <p className="text-gray-700 mb-2" style={{ lineHeight: '90%' }}>
                    <b>{post.user.username}</b> {formatDistanceToNow(new Date(post.creationDate))} ago
                </p>

        <div className="img-div" style={{ backgroundImage: `url(${post.imgUrl})` }}>
        </div>

        <hr className="my-2"/>
        </div>
        </div>
    )

    const content = ref
        ? <div ref={ref}>{postBody}</div>
        : <div>{postBody}</div>

    return content
})

export default Post