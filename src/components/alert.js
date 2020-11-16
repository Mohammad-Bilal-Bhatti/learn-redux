import { useState } from 'react'


export default function Alert({type = 'success', content, show = true, timeout = 3000}) {

  const [_show, setShow ] = useState(show)

  let _classes = `alert alert-${type} alert-dismissible fade`
  _classes = _show? `${_classes} show`: `${_classes} d-none`

  setTimeout( ()=> setShow(false), timeout )

  return (
    <div className={_classes}>
      <i class="fa fa-exclamation mr-2"></i>
      {content}
    </div>
  )
}
