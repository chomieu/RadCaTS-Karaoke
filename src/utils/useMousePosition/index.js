import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators'

function useMousePosition() {
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)

  useEffect( () => {
    // Add event listener to any component using this hook that updates x and y.
    const sub = fromEvent( document, 'mousemove' ).pipe( 
        throttleTime( 15 ),
        map( event => [ event.clientX, event.clientY ])
    ).subscribe(([ newX, newY ]) => {
        setX( newX );
        setY( newY );
    })

    // Removes event listener when component unmounts.
    // Not necessary for Kitty because he's always there, but may be useful in the future.
    return () => {
        sub.unsubscribe()
    }
  }, []) // [] means event fires exactly once, after first render.

  // No way to update state outside the component. This is handled inside useEffect.
  return { mouseX: x, mouseY: y }
}

export default useMousePosition;