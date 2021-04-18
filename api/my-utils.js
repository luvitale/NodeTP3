const getRandomColor = () => "#" + ((1 << 24) * Math.random() | 0).toString(16)

const getBackgroundColor = color => (
  parseInt(color.slice(1, 3), 16) * 0.299 +
  parseInt(color.slice(3, 5), 16) * 0.587 +
  parseInt(color.slice(5), 16) * 0.114
) > 186 ? "#000000" : "#ffffff"

export default {
  getRandomColor,
  getBackgroundColor
}