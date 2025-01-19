export default function CommentsList({comments}) {
  return (
    <ul className="center flex-col">
      Comments
      { comments.map(comment => {
        return (
          <li key={comment.id} className="my-1 p-1 rounded-xl bg-stone-100 min-w-[200px]">
            <p>{comment.comment}</p>
          </li>
        )
      })}
    </ul>
    )
}