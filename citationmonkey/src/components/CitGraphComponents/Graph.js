import { ForceGraph2D } from 'react-force-graph';
import {useEffect, useRef, useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';

export const Graph = ( props ) => {
  const [windowWidth, windowHeight] = useWindowSize({ wait: 1 })
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight })
  const ref = useRef(null)
  const graphRef = useRef(null) // use this to access forceGraph methods, move this from any to proper type eventually
  useEffect(() => {
    if (ref.current) {
      let { height, width } = ref.current.getBoundingClientRect()
      setDimensions({ height, width })
    }
  }, [windowWidth, windowHeight])
  if (!props.data) {
    return (
      <div>
        No Data!
      </div>
    )
  }
  console.log(props.data)
  return (
    <div ref={ref} style={{height: "100vh", weight: "100wh"}}>
      <ForceGraph2D 
      ref={graphRef}
      graphData={props.data} 
      nodeAutoColorBy="group"
      nodeCanvasObject={(node, ctx, globalScale) => {
        const transformStr = (string) => {
          if (string.length > 24) {
            return string.substring(0, 24) + '...'
          } else {
            return string
          }

        }
        const label = transformStr(node.title)
        const fontSize = 12/globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = node.color;
        ctx.fillText(label, node.x, node.y);

        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
      }}
      width={dimensions.width} 
      height={dimensions.height}     
      showNavInfo={false} 
      controlType={"orbit"}
      onNodeClick={(e) => {props.nodeHover(e)}}
      nodeOpacity={1}
      nodeRelSize={6}
      linkOpacity={0.75}
      linkWidth={1}
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      />
    </div>
  )    
}
