export default function Button({children, colorClass, addClass, ...props}) {
  let btnClass = `p-2 m-1 rounded text-white inline-block font-bold ${colorClass} ${addClass}`;
  
  return (
    <button {...props} className={btnClass}>
      {children}
    </button>
    )
}