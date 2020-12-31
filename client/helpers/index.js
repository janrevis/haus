export const positionElement = el => {
  const bounds = el.getBoundingClientRect();
  el.style.left = `${window.innerWidth /2 - bounds.width/2}`;
  el.style.top = `${window.innerHeight /2 - bounds.height/2}`;
}

export const formatComment = comment => {
  return comment.replace("\n", "<br />")
}
