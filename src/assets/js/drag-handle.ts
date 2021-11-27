const removeSelecteion = window.getSelection
  ? function () {
      const selections = window.getSelection();
      selections && selections.removeAllRanges();
    }
  : function () {};

type dragOptions = {
  stableStart: (startX: number, startY: number) => void;
  move: (a: dragParams) => void;
  end: (a: dragParams) => void;
  stableDistance: number;
};
type dragParams = {
  clientX: number;
  clientY: number;
  xOffset: number;
  yOffset: number;
};
function getParam(e: MouseEvent, startX: number, startY: number) {
  let clientX = e.clientX;
  let clientY = e.clientY;
  let xOffset = clientX - startX;
  let yOffset = clientY - startY;

  const returns: dragParams = {
    clientX,
    clientY,
    xOffset,
    yOffset,
  };
  return returns;
}
export default function (event: MouseEvent, options?: dragOptions) {
  const { stableStart, move, end, stableDistance } = options || {};
  const startX = event.clientX;
  const startY = event.clientY;
  let isTriggeredEvent = false;
  let _stableDistance = stableDistance || 0;
  if (!_stableDistance) {
    event.preventDefault && event.preventDefault();
    event.stopPropagation && event.stopPropagation();
  }

  function mousemove(e: MouseEvent) {
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    removeSelecteion();
    let param = getParam(e, startX, startY);
    if (isTriggeredEvent) {
      move && move(param);
    } else if (
      Math.sqrt(param.xOffset * param.xOffset + param.yOffset * param.yOffset) >
      _stableDistance
    ) {
      isTriggeredEvent = true;
      stableStart && stableStart(startX, startY);
      move && move(param);
    }
  }
  function up(e: MouseEvent) {
    document.removeEventListener('mousemove', mousemove, false);
    document.removeEventListener('mouseup', up, false);
    if (isTriggeredEvent && end) {
      end(getParam(e, startX, startY));
    }
  }
  document.addEventListener('mousemove', mousemove, false);
  document.addEventListener('mouseup', up, false);
}